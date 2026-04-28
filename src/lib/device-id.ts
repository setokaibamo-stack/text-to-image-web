/**
 * Anonymous device identifier used to enforce per-user daily quota on the
 * pool-rotation path. Generated once and cached in localStorage so the same
 * browser is recognized across sessions. Cleared by sign-out alongside the
 * Pollinations key.
 *
 * This is intentionally weak — incognito or storage-cleared sessions get a
 * fresh ID, which is the limit of what we can do without real auth. Once
 * Google OAuth is wired up we can swap this for the Google sub claim.
 */

export const DEVICE_ID_STORAGE = "tti.device_id";

const VALID = /^[a-zA-Z0-9_-]{16,64}$/;

function generate(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID().replaceAll("-", "");
  }
  // Fallback for very old browsers — unlikely on Vercel, but defensive.
  let s = "";
  for (let i = 0; i < 32; i += 1) {
    s += Math.floor(Math.random() * 36).toString(36);
  }
  return s;
}

export function getOrCreateDeviceId(): string {
  if (typeof window === "undefined") return "";
  try {
    const existing = window.localStorage.getItem(DEVICE_ID_STORAGE);
    if (existing && VALID.test(existing)) return existing;
    const fresh = generate();
    window.localStorage.setItem(DEVICE_ID_STORAGE, fresh);
    return fresh;
  } catch {
    // localStorage disabled (privacy mode, etc.) — return an ephemeral id.
    return generate();
  }
}

/** Validation for the API route — same rule as the storage check. */
export function isValidDeviceId(input: unknown): input is string {
  return typeof input === "string" && VALID.test(input);
}
