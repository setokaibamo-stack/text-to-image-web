/**
 * Resolves which HTTP endpoint the client calls for image generation.
 *
 * The Next.js web deployment uses its own same-origin `/api/generate` route.
 * A Capacitor APK build (static export, no server) instead points at a
 * Cloudflare Worker deployed from `workers/tti-api`. Switch by setting
 * `NEXT_PUBLIC_API_BASE_URL` at build time:
 *
 *   # web build (default): same-origin /api/generate
 *   # APK build:
 *   NEXT_PUBLIC_API_BASE_URL=https://tti-api.example.workers.dev npm run build
 *
 * The value is inlined by Next's bundler at build time.
 */

const RAW_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

function normalize(base: string): string {
  const trimmed = base.trim();
  if (!trimmed) return "";
  return trimmed.endsWith("/") ? trimmed.slice(0, -1) : trimmed;
}

const BASE = normalize(RAW_BASE);

export function generateEndpoint(): string {
  return BASE ? `${BASE}/generate` : "/api/generate";
}
