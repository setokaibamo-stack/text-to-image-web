import { redis } from "@/lib/redis";
import {
  POOL_PER_KEY_DAILY_LIMIT,
  USER_DAILY_LIMIT,
  dayBucket,
  getPoolKeys,
  poolCounterKey,
  userCounterKey,
} from "@/lib/pool";
import { isValidDeviceId } from "@/lib/device-id";

export const runtime = "nodejs";
// `dynamic = "force-dynamic"` keeps Next from trying to cache this route at
// build time. Image generation responses must never be cached.
export const dynamic = "force-dynamic";

const POLLINATIONS_TIMEOUT_MS = 60_000;
const PROMPT_MAX_LENGTH = 1000;

const ALLOWED_RATIOS: Record<string, [number, number]> = {
  "1:1": [1024, 1024],
  "3:2": [1216, 832],
  "2:3": [832, 1216],
  "16:9": [1280, 720],
};

type GenerateBody = {
  prompt?: unknown;
  ratio?: unknown;
  deviceId?: unknown;
};

function jsonError(error: string, status: number, extra?: Record<string, unknown>) {
  return Response.json({ error, ...extra }, { status });
}

export async function POST(req: Request) {
  let body: GenerateBody;
  try {
    body = (await req.json()) as GenerateBody;
  } catch {
    return jsonError("invalid_body", 400);
  }

  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt) return jsonError("missing_prompt", 400);
  if (prompt.length > PROMPT_MAX_LENGTH) return jsonError("prompt_too_long", 400);

  const ratioKey = typeof body.ratio === "string" ? body.ratio : "1:1";
  const dims = ALLOWED_RATIOS[ratioKey] ?? ALLOWED_RATIOS["1:1"];
  const [width, height] = dims;

  if (!isValidDeviceId(body.deviceId)) {
    return jsonError("missing_device_id", 400);
  }
  const deviceId = body.deviceId;

  const day = dayBucket();
  const userKey = userCounterKey(deviceId, day);

  // Per-user quota: increment first, roll back if we end up not generating.
  const userUsed = await redis.incr(userKey);
  if (userUsed > USER_DAILY_LIMIT) {
    await redis.decr(userKey).catch(() => {});
    return jsonError("user_quota_exceeded", 429, {
      limit: USER_DAILY_LIMIT,
      used: USER_DAILY_LIMIT,
      remaining: 0,
    });
  }

  const pool = getPoolKeys();
  if (pool.length === 0) {
    await redis.decr(userKey).catch(() => {});
    return jsonError("pool_unconfigured", 503);
  }

  // Try each key in order. Skip keys whose counter is already at the limit.
  // On 401/402/403/429 from Pollinations, mark the key exhausted (set its
  // counter to the daily limit) and try the next one.
  let lastUpstreamStatus: number | null = null;
  for (const key of pool) {
    const ckey = poolCounterKey(key.id, day);
    const used = parseInt((await redis.get(ckey)) ?? "0", 10) || 0;
    if (used >= POOL_PER_KEY_DAILY_LIMIT) continue;

    const seed = Math.floor(Math.random() * 1_000_000_000);
    // gen.pollinations.ai is the current gateway (replaces image.pollinations.ai
    // for authenticated requests). Tokens issued from enter.pollinations.ai are
    // recognized here. Auth via Bearer header instead of `?token=` query param.
    const url =
      "https://gen.pollinations.ai/image/" +
      encodeURIComponent(prompt) +
      `?width=${width}&height=${height}&seed=${seed}&nologo=true`;

    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      POLLINATIONS_TIMEOUT_MS,
    );
    let upstream: Response;
    try {
      upstream = await fetch(url, {
        method: "GET",
        signal: controller.signal,
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${key.value}`,
        },
      });
    } catch (err) {
      clearTimeout(timeout);
      if (err instanceof DOMException && err.name === "AbortError") {
        // Treat upstream timeout as transient — don't burn this key, just bail.
        await redis.decr(userKey).catch(() => {});
        return jsonError("upstream_timeout", 504);
      }
      // Network error — try next key (could be DNS hiccup specific to one node).
      continue;
    }
    clearTimeout(timeout);

    if (upstream.ok) {
      // Charge this key, return image bytes to the browser. Swallow Redis
      // errors here so a counter blip never costs the user the image they
      // just successfully generated.
      await redis.incr(ckey).catch(() => {});
      const contentType =
        upstream.headers.get("content-type") ?? "image/jpeg";
      const remaining = Math.max(0, USER_DAILY_LIMIT - userUsed);
      return new Response(upstream.body, {
        status: 200,
        headers: {
          "content-type": contentType,
          "cache-control": "no-store",
          "x-tti-user-remaining": String(remaining),
          "x-tti-user-limit": String(USER_DAILY_LIMIT),
        },
      });
    }

    lastUpstreamStatus = upstream.status;
    if (
      upstream.status === 401 ||
      upstream.status === 402 ||
      upstream.status === 403
    ) {
      // Auth-level rejection: this key is dead for the rest of the day. Mark
      // it exhausted and try the next key.
      await redis.set(ckey, String(POOL_PER_KEY_DAILY_LIMIT), {
        ttlSeconds: 60 * 60 * 48,
      });
      continue;
    }
    if (upstream.status === 429) {
      // Transient rate limit on this key. Don't burn the slot for the rest of
      // the day — just try the next key. The next request from the user will
      // retry this one (counter is unchanged).
      continue;
    }

    // Unknown upstream error — don't burn user quota.
    await redis.decr(userKey).catch(() => {});
    return jsonError("upstream_error", 502, { status: upstream.status });
  }

  // Every key was exhausted or unusable.
  await redis.decr(userKey).catch(() => {});
  return jsonError("pool_exhausted", 503, {
    lastUpstreamStatus,
  });
}
