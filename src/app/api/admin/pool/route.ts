import { getPoolHealth } from "@/lib/pool";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
  const provided = req.headers.get("x-admin-password");
  if (provided !== expected) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  const health = await getPoolHealth();
  return Response.json(health, {
    headers: { "cache-control": "no-store" },
  });
}
