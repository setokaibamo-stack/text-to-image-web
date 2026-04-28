/**
 * Pool of Pollinations API keys for Google-flow users.
 *
 * Keys live ONLY in server-side env vars (POLL_KEY_1..POLL_KEY_10), are never
 * shipped to the browser, and are rotated round-robin until one succeeds. The
 * `/api/generate` route is the only consumer.
 */

import { redis } from "./redis";

export const POOL_PER_KEY_DAILY_LIMIT = 10;
export const USER_DAILY_LIMIT = 5;
export const POOL_KEY_COUNT = 10;

export type PoolKey = { id: string; value: string };

/**
 * Reads POLL_KEY_1..POLL_KEY_<POOL_KEY_COUNT> from the environment. Empty or
 * missing slots are skipped so the operator can ramp up gradually.
 */
export function getPoolKeys(): PoolKey[] {
  const out: PoolKey[] = [];
  for (let i = 1; i <= POOL_KEY_COUNT; i += 1) {
    const value = process.env[`POLL_KEY_${i}`];
    if (typeof value === "string" && value.trim().length > 0) {
      out.push({ id: `k${i}`, value: value.trim() });
    }
  }
  return out;
}

/** Day bucket in UTC, used for daily counter keys. Format: YYYYMMDD. */
export function dayBucket(now: Date = new Date()): string {
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

export function poolCounterKey(keyId: string, day: string): string {
  return `pool:${keyId}:${day}`;
}

export function userCounterKey(deviceId: string, day: string): string {
  return `user:${deviceId}:${day}`;
}

/** Snapshot of pool health for the admin page. */
export type PoolHealth = {
  day: string;
  perKeyLimit: number;
  userLimit: number;
  redisConfigured: boolean;
  keys: { id: string; used: number; remaining: number; exhausted: boolean }[];
  totalUsed: number;
  totalCapacity: number;
};

export async function getPoolHealth(): Promise<PoolHealth> {
  const day = dayBucket();
  const keys = getPoolKeys();
  const counterKeys = keys.map((k) => poolCounterKey(k.id, day));
  const counts = await redis.mget(counterKeys);
  const perKey = keys.map((k, i) => {
    const used = parseInt(counts[i] ?? "0", 10) || 0;
    return {
      id: k.id,
      used,
      remaining: Math.max(0, POOL_PER_KEY_DAILY_LIMIT - used),
      exhausted: used >= POOL_PER_KEY_DAILY_LIMIT,
    };
  });
  return {
    day,
    perKeyLimit: POOL_PER_KEY_DAILY_LIMIT,
    userLimit: USER_DAILY_LIMIT,
    redisConfigured: redis.isConfigured(),
    keys: perKey,
    totalUsed: perKey.reduce((s, k) => s + k.used, 0),
    totalCapacity: keys.length * POOL_PER_KEY_DAILY_LIMIT,
  };
}
