import { timingSafeEqual } from "node:crypto";
import { getPoolHealth } from "@/lib/pool";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Constant-time string compare that returns false on length mismatch without
 * leaking byte-by-byte timing. Length is technically observable but is fine
 * for a passphrase-style admin secret.
 */
function safeCompare(a: string, b: string): boolean {
  const aBuf = Buffer.from(a, "utf8");
  const bBuf = Buffer.from(b, "utf8");
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

/**
 * Returns pool health JSON. Gated by ADMIN_PASSWORD env var.
 * If ADMIN_PASSWORD is not set, the route returns 503 so the admin UI is
 * effectively disabled until the operator opts in.
 */
export async function GET(req: Request) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return Response.json({ error: "admin_disabled" }, { status: 503 });
  }
  const provided = req.headers.get("x-admin-password") ?? "";
  if (!safeCompare(provided, expected)) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  const health = await getPoolHealth();
  return Response.json(health, {
    headers: { "cache-control": "no-store" },
  });
}
