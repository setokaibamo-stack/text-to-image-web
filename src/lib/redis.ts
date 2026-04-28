/**
 * Tiny Upstash Redis REST client.
 *
 * Uses the Upstash REST API (https://upstash.com/docs/redis/features/restapi)
 * so we don't need to add an SDK dependency or a TCP connection from a
 * Vercel serverless function. Two env vars are required:
 *   - UPSTASH_REDIS_REST_URL
 *   - UPSTASH_REDIS_REST_TOKEN
 *
 * If either is missing, the client falls back to an in-memory map. This keeps
 * local `next dev` working without Upstash provisioning, but counters reset on
 * every process restart (and aren't shared across serverless instances), so
 * production MUST set both env vars.
 */

type CommandArg = string | number;

const memory = new Map<string, { value: string; expiresAt?: number }>();

function memGet(key: string): string | null {
  const entry = memory.get(key);
  if (!entry) return null;
  if (entry.expiresAt && entry.expiresAt < Date.now()) {
    memory.delete(key);
    return null;
  }
  return entry.value;
}

function memSet(key: string, value: string, ttlSeconds?: number): void {
  memory.set(key, {
    value,
    expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined,
  });
}

function memIncr(key: string): number {
  const current = parseInt(memGet(key) ?? "0", 10);
  const next = current + 1;
  memSet(key, String(next), 60 * 60 * 48);
  return next;
}

function memDecr(key: string): number {
  const current = parseInt(memGet(key) ?? "0", 10);
  const next = current - 1;
  memSet(key, String(next), 60 * 60 * 48);
  return next;
}

function isConfigured(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL &&
      process.env.UPSTASH_REDIS_REST_TOKEN,
  );
}

async function rawCall(args: CommandArg[]): Promise<unknown> {
  const url = process.env.UPSTASH_REDIS_REST_URL!;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN!;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Upstash ${args[0]} failed: ${res.status}`);
  }
  const body = (await res.json()) as { result?: unknown; error?: string };
  if (body.error) throw new Error(`Upstash ${args[0]}: ${body.error}`);
  return body.result;
}

export const redis = {
  async get(key: string): Promise<string | null> {
    if (!isConfigured()) return memGet(key);
    const result = await rawCall(["GET", key]);
    return result == null ? null : String(result);
  },

  async set(
    key: string,
    value: string,
    options?: { ttlSeconds?: number },
  ): Promise<void> {
    if (!isConfigured()) {
      memSet(key, value, options?.ttlSeconds);
      return;
    }
    const args: CommandArg[] = ["SET", key, value];
    if (options?.ttlSeconds) {
      args.push("EX", options.ttlSeconds);
    }
    await rawCall(args);
  },

  async incr(key: string, ttlSeconds = 60 * 60 * 48): Promise<number> {
    if (!isConfigured()) return memIncr(key);
    const result = await rawCall(["INCR", key]);
    if (result === 1) {
      // first write — set TTL so the counter expires automatically
      await rawCall(["EXPIRE", key, ttlSeconds]).catch(() => {});
    }
    return Number(result);
  },

  async decr(key: string): Promise<number> {
    if (!isConfigured()) return memDecr(key);
    const result = await rawCall(["DECR", key]);
    return Number(result);
  },

  async mget(keys: string[]): Promise<(string | null)[]> {
    if (keys.length === 0) return [];
    if (!isConfigured()) return keys.map((k) => memGet(k));
    const result = (await rawCall(["MGET", ...keys])) as (string | null)[];
    return result.map((v) => (v == null ? null : String(v)));
  },

  isConfigured,
};
