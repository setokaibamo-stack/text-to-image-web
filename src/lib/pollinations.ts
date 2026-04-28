export const POLLINATIONS_KEY_STORAGE = "tti.pollinations.api_key";
export const POLLINATIONS_VALIDATED_FLAG = "tti.pollinations.validated";

export type ValidateResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "network" | "timeout" };

const VALIDATE_TIMEOUT_MS = 15_000;
// gen.pollinations.ai is the new (post-2025) gateway. It rejects unauthenticated
// or bogus tokens with 401 across all generation routes, so a tiny image
// request is a reliable, low-cost token check. Tokens issued from the legacy
// auth.pollinations.ai service are NOT recognized here and tokens issued from
// enter.pollinations.ai (current) ARE — which is the inverse of the previous
// validator.
const VALIDATE_URL =
  "https://gen.pollinations.ai/image/x?width=16&height=16&nologo=true";

/**
 * Validates a Pollinations.ai API token by issuing a tiny generation request
 * to gen.pollinations.ai (the current API gateway).
 *
 *   - 200 → token is valid (image bytes returned; we discard them)
 *   - 401/403 → token missing or rejected
 * Any other failure (network, CORS, timeout) is surfaced separately so the UI
 * can offer "try again" instead of falsely telling the user their key is bad.
 */
export async function validatePollinationsKey(
  key: string,
): Promise<ValidateResult> {
  const trimmed = key.trim();
  if (!trimmed) return { ok: false, reason: "invalid" };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), VALIDATE_TIMEOUT_MS);

  try {
    const res = await fetch(VALIDATE_URL, {
      method: "GET",
      signal: controller.signal,
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${trimmed}`,
      },
    });
    if (res.status === 401 || res.status === 403) {
      return { ok: false, reason: "invalid" };
    }
    if (!res.ok) {
      return { ok: false, reason: "network" };
    }
    return { ok: true };
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return { ok: false, reason: "timeout" };
    }
    return { ok: false, reason: "network" };
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Returns a masked representation of a key suitable for display in the UI.
 * Shows only the last 4 characters: "••••••••1234". Empty input returns "".
 */
export function maskKey(key: string): string {
  const trimmed = key.trim();
  if (!trimmed) return "";
  const last4 = trimmed.slice(-4);
  return "••••••••" + last4;
}
