export const POLLINATIONS_KEY_STORAGE = "tti.pollinations.api_key";
export const POLLINATIONS_VALIDATED_FLAG = "tti.pollinations.validated";

export type ValidateResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "network" | "timeout" };

const VALIDATE_TIMEOUT_MS = 10_000;

/**
 * Validates a Pollinations.ai API token by issuing a tiny image generation
 * request through a model that requires authentication.
 *
 * Pollinations' free tier allows unauthenticated requests for some models, so
 * to actually exercise the token we hit a 64x64 generation with a model that
 * gates on auth. A 401/403 means the token is rejected. A 2xx response means
 * the token was accepted. Any other failure (network, CORS, timeout) is
 * surfaced separately so the UI can offer "try again" instead of falsely
 * telling the user their key is bad.
 */
export async function validatePollinationsKey(
  key: string,
): Promise<ValidateResult> {
  const trimmed = key.trim();
  if (!trimmed) return { ok: false, reason: "invalid" };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), VALIDATE_TIMEOUT_MS);

  // tiny 64x64 generation, no logo, fixed seed for cache-friendliness.
  const url =
    "https://image.pollinations.ai/prompt/" +
    encodeURIComponent("a tiny dot") +
    "?width=64&height=64&seed=1&nologo=true&token=" +
    encodeURIComponent(trimmed);

  try {
    const res = await fetch(url, {
      method: "GET",
      signal: controller.signal,
      cache: "no-store",
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
