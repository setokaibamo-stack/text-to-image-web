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
  userKey?: unknown;
};

type UpstreamAttempt =
  | { ok: true; response: Response }
  | { ok: false; kind: "status"; status: number }
  | { ok: false; kind: "timeout" }
  | { ok: false; kind: "network" };

function jsonError(
  error: string,
  status: number,
  extra?: Record<string, unknown>,
) {
  return Response.json({ error, ...extra }, { status });
}

function buildPollinationsUrl(
  prompt: string,
  width: number,
  height: number,
  token: string,
): string {
  const seed = Math.floor(Math.random() * 1_000_000_000);
  return (
    "https://image.pollinations.ai/prompt/" +
    encodeURIComponent(prompt) +
    `?width=${width}&height=${height}&seed=${seed}&nologo=true&token=` +
    encodeURIComponent(token)
  );
}

async function fetchPollinations(url: string): Promise<UpstreamAttempt> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), POLLINATIONS_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "GET",
      signal: controller.signal,
      cache: "no-store",
    });
    if (res.ok) return { ok: true, response: res };
    return { ok: false, kind: "status", status: res.status };
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return { ok: false, kind: "timeout" };
    }
    return { ok: false, kind: "network" };
  } finally {
    clearTimeout(timeout);
  }
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
  if (prompt.length > PROMPT_MAX_LENGTH)
    return jsonError("prompt_too_long", 400);

  const ratioKey = typeof body.ratio === "string" ? body.ratio : "1:1";
  const dims = ALLOWED_RATIOS[ratioKey] ?? ALLOWED_RATIOS["1:1"];
  const [width, height] = dims;

  if (!isValidDeviceId(body.deviceId)) {
    return jsonError("missing_device_id", 400);
  }
  const deviceId = body.deviceId;

  const rawUserKey = typeof body.userKey === "string" ? body.userKey.trim() : "";
  const userKey = rawUserKey.length >= 6 ? rawUserKey : "";

  // ---------- Phase 1: if the user brought their own key, try it first ----
  //
  // BYOK bypasses the per-user shared quota entirely — they're paying their
  // own way. We still cap at one attempt against their key, then fall back
  // to the shared pool on rate-limit (429) or network errors so we don't
  // leave them stuck. A hard 401/402/403 means the key is dead; we surface
  // that specifically so the client can prompt the user to fix it in
  // Settings rather than silently eating their quota behind a bad key.
  if (userKey) {
    const attempt = await fetchPollinations(
      buildPollinationsUrl(prompt, width, height, userKey),
    );
    if (attempt.ok) {
      const contentType =
        attempt.response.headers.get("content-type") ?? "image/jpeg";
      return new Response(attempt.response.body, {
        status: 200,
        headers: {
          "content-type": contentType,
          "cache-control": "no-store",
          "x-tti-mode": "byok",
        },
      });
    }
    if (attempt.kind === "status") {
      if (
        attempt.status === 401 ||
        attempt.status === 402 ||
        attempt.status === 403
      ) {
        // Dead key — surface to UI so the user can fix it in Settings.
        return jsonError("byok_invalid", 401, { status: attempt.status });
      }
      // 429 or other non-auth failures: fall through to the shared pool.
    }
    // Timeouts and network errors also fall through; the pool is our
    // safety net so the user still gets an image if their key path is
    // transiently broken.
  }

  // ---------- Phase 2: shared pool with per-user quota ---------------------
  const day = dayBucket();
  const poolUserKey = userCounterKey(deviceId, day);

  // Per-user quota: increment first, roll back if we end up not generating.
  const userUsed = await redis.incr(poolUserKey);
  if (userUsed > USER_DAILY_LIMIT) {
    await redis.decr(poolUserKey).catch(() => {});
    return jsonError("user_quota_exceeded", 429, {
      limit: USER_DAILY_LIMIT,
      used: USER_DAILY_LIMIT,
      remaining: 0,
    });
  }

  const pool = getPoolKeys();
  if (pool.length === 0) {
    await redis.decr(poolUserKey).catch(() => {});
    return jsonError("pool_unconfigured", 503);
  }

  // Pick the least-used keys first so load spreads evenly across the pool
  // instead of always burning key 1 to zero before touching key 2.
  const counterKeys = pool.map((k) => poolCounterKey(k.id, day));
  const counts = await redis.mget(counterKeys);
  const ordered = pool
    .map((k, i) => ({
      key: k,
      used: parseInt(counts[i] ?? "0", 10) || 0,
    }))
    .filter((entry) => entry.used < POOL_PER_KEY_DAILY_LIMIT)
    .sort((a, b) => a.used - b.used);

  let lastUpstreamStatus: number | null = null;
  for (const entry of ordered) {
    const key = entry.key;
    const ckey = poolCounterKey(key.id, day);
    const attempt = await fetchPollinations(
      buildPollinationsUrl(prompt, width, height, key.value),
    );

    if (attempt.ok) {
      await redis.incr(ckey);
      const contentType =
        attempt.response.headers.get("content-type") ?? "image/jpeg";
      const remaining = Math.max(0, USER_DAILY_LIMIT - userUsed);
      return new Response(attempt.response.body, {
        status: 200,
        headers: {
          "content-type": contentType,
          "cache-control": "no-store",
          "x-tti-mode": "pool",
          "x-tti-user-remaining": String(remaining),
          "x-tti-user-limit": String(USER_DAILY_LIMIT),
        },
      });
    }

    if (attempt.kind === "timeout") {
      // Treat upstream timeout as transient — don't burn this key, just bail.
      await redis.decr(poolUserKey).catch(() => {});
      return jsonError("upstream_timeout", 504);
    }

    if (attempt.kind === "network") {
      // Network error — try the next key (could be DNS hiccup specific to
      // one upstream node); don't punish this key.
      continue;
    }

    lastUpstreamStatus = attempt.status;
    if (
      attempt.status === 401 ||
      attempt.status === 402 ||
      attempt.status === 403 ||
      attempt.status === 429
    ) {
      // Mark this key exhausted for the rest of the day and try the next one.
      await redis.set(ckey, String(POOL_PER_KEY_DAILY_LIMIT), {
        ttlSeconds: 60 * 60 * 48,
      });
      continue;
    }

    // Unknown upstream error — don't burn user quota.
    await redis.decr(poolUserKey).catch(() => {});
    return jsonError("upstream_error", 502, { status: attempt.status });
  }

  // Every key was exhausted or unusable.
  await redis.decr(poolUserKey).catch(() => {});
  return jsonError("pool_exhausted", 503, {
    lastUpstreamStatus,
  });
}
