/**
 * tti-api Cloudflare Worker
 *
 * Replaces the Next.js `/api/generate` route for deployments (like a Capacitor
 * APK build) that ship as a static bundle without a server. The Worker holds
 * the rotating `POLL_KEY_1..POLL_KEY_10` secrets in its own environment, so
 * they never leave Cloudflare's edge.
 *
 * The request / response contract is identical to Next's `/api/generate` so
 * the web client can switch between the two by changing a base URL.
 */

const POOL_KEY_COUNT = 10;
const POOL_PER_KEY_DAILY_LIMIT = 10;
const USER_DAILY_LIMIT = 5;
const POLLINATIONS_TIMEOUT_MS = 60_000;
const PROMPT_MAX_LENGTH = 1000;
const DEVICE_ID_REGEX = /^[a-zA-Z0-9_-]{16,64}$/;
const COUNTER_TTL_SECONDS = 60 * 60 * 48;

const ALLOWED_RATIOS: Record<string, [number, number]> = {
  "1:1": [1024, 1024],
  "3:2": [1216, 832],
  "2:3": [832, 1216],
  "16:9": [1280, 720],
};

export interface Env {
  POLL_KEY_1?: string;
  POLL_KEY_2?: string;
  POLL_KEY_3?: string;
  POLL_KEY_4?: string;
  POLL_KEY_5?: string;
  POLL_KEY_6?: string;
  POLL_KEY_7?: string;
  POLL_KEY_8?: string;
  POLL_KEY_9?: string;
  POLL_KEY_10?: string;
  UPSTASH_REDIS_REST_URL?: string;
  UPSTASH_REDIS_REST_TOKEN?: string;
  ALLOWED_ORIGINS?: string;
}

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

type PoolKey = { id: string; value: string };

// ---------------------------------------------------------------------------
// CORS
// ---------------------------------------------------------------------------

function parseAllowedOrigins(env: Env): string[] {
  const raw = env.ALLOWED_ORIGINS ?? "";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function pickAllowedOrigin(request: Request, env: Env): string | null {
  const origin = request.headers.get("origin");
  if (!origin) return null;
  const allowed = parseAllowedOrigins(env);
  return allowed.includes(origin) ? origin : null;
}

function corsHeaders(request: Request, env: Env): HeadersInit {
  const allowOrigin = pickAllowedOrigin(request, env);
  const headers: Record<string, string> = {
    vary: "Origin",
  };
  if (allowOrigin) {
    headers["access-control-allow-origin"] = allowOrigin;
    headers["access-control-allow-methods"] = "POST, OPTIONS";
    headers["access-control-allow-headers"] = "content-type";
    headers["access-control-max-age"] = "86400";
  }
  return headers;
}

function json(
  payload: unknown,
  status: number,
  request: Request,
  env: Env,
): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
      ...corsHeaders(request, env),
    },
  });
}

function jsonError(
  error: string,
  status: number,
  request: Request,
  env: Env,
  extra?: Record<string, unknown>,
): Response {
  return json({ error, ...extra }, status, request, env);
}

// ---------------------------------------------------------------------------
// Redis (Upstash REST) — same semantics as src/lib/redis.ts in the Next app.
// If the env vars aren't set, we fall back to in-memory which is fine for
// smoke-testing but NOT for production (counters reset on each Worker isolate).
// ---------------------------------------------------------------------------

const memory = new Map<string, { value: string; expiresAt?: number }>();

function redisConfigured(env: Env): boolean {
  return Boolean(env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN);
}

async function upstash(
  env: Env,
  args: (string | number)[],
): Promise<unknown> {
  const res = await fetch(env.UPSTASH_REDIS_REST_URL!, {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.UPSTASH_REDIS_REST_TOKEN!}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(args),
  });
  if (!res.ok) {
    throw new Error(`upstash ${args[0]} http ${res.status}`);
  }
  const body = (await res.json()) as { result?: unknown; error?: string };
  if (body.error) throw new Error(`upstash ${args[0]}: ${body.error}`);
  return body.result;
}

async function redisGet(env: Env, key: string): Promise<string | null> {
  if (!redisConfigured(env)) {
    const entry = memory.get(key);
    if (!entry) return null;
    if (entry.expiresAt && entry.expiresAt < Date.now()) {
      memory.delete(key);
      return null;
    }
    return entry.value;
  }
  const result = await upstash(env, ["GET", key]);
  return result == null ? null : String(result);
}

async function redisSet(
  env: Env,
  key: string,
  value: string,
  ttlSeconds: number,
): Promise<void> {
  if (!redisConfigured(env)) {
    memory.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
    return;
  }
  await upstash(env, ["SET", key, value, "EX", ttlSeconds]);
}

async function redisIncr(env: Env, key: string): Promise<number> {
  if (!redisConfigured(env)) {
    const current = parseInt((await redisGet(env, key)) ?? "0", 10);
    const next = current + 1;
    memory.set(key, {
      value: String(next),
      expiresAt: Date.now() + COUNTER_TTL_SECONDS * 1000,
    });
    return next;
  }
  const result = (await upstash(env, ["INCR", key])) as number;
  if (result === 1) {
    await upstash(env, ["EXPIRE", key, COUNTER_TTL_SECONDS]).catch(() => {});
  }
  return Number(result);
}

async function redisDecr(env: Env, key: string): Promise<number> {
  if (!redisConfigured(env)) {
    const current = parseInt((await redisGet(env, key)) ?? "0", 10);
    const next = current - 1;
    memory.set(key, {
      value: String(next),
      expiresAt: Date.now() + COUNTER_TTL_SECONDS * 1000,
    });
    return next;
  }
  const result = (await upstash(env, ["DECR", key])) as number;
  return Number(result);
}

async function redisMget(
  env: Env,
  keys: string[],
): Promise<(string | null)[]> {
  if (keys.length === 0) return [];
  if (!redisConfigured(env)) {
    return keys.map((k) => {
      const entry = memory.get(k);
      if (!entry) return null;
      if (entry.expiresAt && entry.expiresAt < Date.now()) {
        memory.delete(k);
        return null;
      }
      return entry.value;
    });
  }
  const result = (await upstash(env, ["MGET", ...keys])) as (string | null)[];
  return result.map((v) => (v == null ? null : String(v)));
}

// ---------------------------------------------------------------------------
// Pool helpers
// ---------------------------------------------------------------------------

function getPoolKeys(env: Env): PoolKey[] {
  const out: PoolKey[] = [];
  for (let i = 1; i <= POOL_KEY_COUNT; i += 1) {
    const value = env[`POLL_KEY_${i}` as keyof Env];
    if (typeof value === "string" && value.trim().length > 0) {
      out.push({ id: `k${i}`, value: value.trim() });
    }
  }
  return out;
}

function dayBucket(now: Date = new Date()): string {
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

function poolCounterKey(keyId: string, day: string): string {
  return `pool:${keyId}:${day}`;
}

function userCounterKey(deviceId: string, day: string): string {
  return `user:${deviceId}:${day}`;
}

function isValidDeviceId(input: unknown): input is string {
  return typeof input === "string" && DEVICE_ID_REGEX.test(input);
}

// ---------------------------------------------------------------------------
// Pollinations call
// ---------------------------------------------------------------------------

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
      cf: { cacheTtl: 0 },
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

// ---------------------------------------------------------------------------
// Main handler
// ---------------------------------------------------------------------------

async function handleGenerate(request: Request, env: Env): Promise<Response> {
  let body: GenerateBody;
  try {
    body = (await request.json()) as GenerateBody;
  } catch {
    return jsonError("invalid_body", 400, request, env);
  }

  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt) return jsonError("missing_prompt", 400, request, env);
  if (prompt.length > PROMPT_MAX_LENGTH) {
    return jsonError("prompt_too_long", 400, request, env);
  }

  const ratioKey = typeof body.ratio === "string" ? body.ratio : "1:1";
  const dims = ALLOWED_RATIOS[ratioKey] ?? ALLOWED_RATIOS["1:1"]!;
  const [width, height] = dims;

  if (!isValidDeviceId(body.deviceId)) {
    return jsonError("missing_device_id", 400, request, env);
  }
  const deviceId = body.deviceId;

  const rawUserKey =
    typeof body.userKey === "string" ? body.userKey.trim() : "";
  const userKey = rawUserKey.length >= 6 ? rawUserKey : "";

  const cors = corsHeaders(request, env);

  // ---------- Phase 1: BYOK ------------------------------------------------
  // Mirror of Next's route: try the user's own key once, bypass per-user
  // quota, fall back to the pool on 429 or transient failures, but surface
  // 401/402/403 specifically so the client can clear the dead key.
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
          ...cors,
        },
      });
    }
    if (attempt.kind === "status") {
      if (
        attempt.status === 401 ||
        attempt.status === 402 ||
        attempt.status === 403
      ) {
        return jsonError("byok_invalid", 401, request, env, {
          status: attempt.status,
        });
      }
      // 429 or other non-auth upstream failures: fall through to the pool.
    }
    // Timeouts and network errors also fall through.
  }

  // ---------- Phase 2: shared pool + per-user quota ------------------------
  const day = dayBucket();
  const poolUserKey = userCounterKey(deviceId, day);

  const userUsed = await redisIncr(env, poolUserKey);
  if (userUsed > USER_DAILY_LIMIT) {
    await redisDecr(env, poolUserKey).catch(() => {});
    return jsonError("user_quota_exceeded", 429, request, env, {
      limit: USER_DAILY_LIMIT,
      used: USER_DAILY_LIMIT,
      remaining: 0,
    });
  }

  const pool = getPoolKeys(env);
  if (pool.length === 0) {
    await redisDecr(env, poolUserKey).catch(() => {});
    return jsonError("pool_unconfigured", 503, request, env);
  }

  const counterKeys = pool.map((k) => poolCounterKey(k.id, day));
  const counts = await redisMget(env, counterKeys);
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
      await redisIncr(env, ckey);
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
          ...cors,
        },
      });
    }

    if (attempt.kind === "timeout") {
      await redisDecr(env, poolUserKey).catch(() => {});
      return jsonError("upstream_timeout", 504, request, env);
    }
    if (attempt.kind === "network") {
      continue;
    }

    lastUpstreamStatus = attempt.status;
    if (
      attempt.status === 401 ||
      attempt.status === 402 ||
      attempt.status === 403 ||
      attempt.status === 429
    ) {
      await redisSet(
        env,
        ckey,
        String(POOL_PER_KEY_DAILY_LIMIT),
        COUNTER_TTL_SECONDS,
      );
      continue;
    }

    await redisDecr(env, poolUserKey).catch(() => {});
    return jsonError("upstream_error", 502, request, env, {
      status: attempt.status,
    });
  }

  await redisDecr(env, poolUserKey).catch(() => {});
  return jsonError("pool_exhausted", 503, request, env, {
    lastUpstreamStatus,
  });
}

// ---------------------------------------------------------------------------
// Router
// ---------------------------------------------------------------------------

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(request, env),
      });
    }

    if (request.method === "GET" && url.pathname === "/health") {
      return json(
        {
          ok: true,
          poolKeys: getPoolKeys(env).length,
          redisConfigured: redisConfigured(env),
        },
        200,
        request,
        env,
      );
    }

    if (request.method === "POST" && url.pathname === "/generate") {
      // Reject callers from origins we don't recognize. The handful of
      // allowlisted origins live in `ALLOWED_ORIGINS` in wrangler.toml.
      if (!pickAllowedOrigin(request, env)) {
        // Still allow requests from trusted server-to-server callers which
        // won't send an Origin header (e.g., curl / uptime probes). If the
        // caller DID send an Origin and it's not allowlisted, block.
        if (request.headers.get("origin")) {
          return json({ error: "origin_not_allowed" }, 403, request, env);
        }
      }
      return handleGenerate(request, env);
    }

    return json({ error: "not_found" }, 404, request, env);
  },
};

export default worker;
