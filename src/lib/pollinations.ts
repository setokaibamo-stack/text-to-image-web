export const POLLINATIONS_KEY_STORAGE = "tti.pollinations.api_key";
export const POLLINATIONS_VALIDATED_FLAG = "tti.pollinations.validated";

export type ValidateResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "network" | "timeout" };

const VALIDATE_TIMEOUT_MS = 10_000;
const VALIDATE_URL = "https://auth.pollinations.ai/api/user";

/**
 * Validates a Pollinations.ai API token against the auth service.
 *
 * Pollinations' image endpoint serves anonymous traffic, so it returns 200 even
 * for bogus tokens (falling back to public quota). Their auth service does
 * gate on token validity:
 *   - 200 → token is valid (response body is the user account)
 *   - 401 → token is missing or rejected
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
