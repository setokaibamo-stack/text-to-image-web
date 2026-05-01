"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { Locale } from "@/i18n/config";
import {
  POLLINATIONS_KEY_STORAGE,
  POLLINATIONS_VALIDATED_FLAG,
  validatePollinationsKey,
} from "@/lib/pollinations";

/**
 * Mounts on the dashboard. If a Pollinations key is saved on this device but
 * has not yet been validated this session, runs a background validation. If
 * the saved key is rejected by Pollinations.ai, clears it and bounces the user
 * to /settings with a notice so they can re-enter it. Network/timeout errors
 * are ignored — we don't interrupt the user just because their connection is
 * flaky, the pool path still works.
 */
export function KeyGuard({ locale }: { locale: Locale }) {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    if (typeof window === "undefined") return;

    const key = window.localStorage.getItem(POLLINATIONS_KEY_STORAGE);
    if (!key) return;
    const alreadyValidated =
      window.sessionStorage.getItem(POLLINATIONS_VALIDATED_FLAG) === "1";
    if (alreadyValidated) return;

    (async () => {
      const result = await validatePollinationsKey(key);
      if (cancelled) return;
      if (result.ok) {
        try {
          window.sessionStorage.setItem(POLLINATIONS_VALIDATED_FLAG, "1");
        } catch {
          // ignore
        }
        return;
      }
      if (result.reason === "invalid") {
        try {
          window.localStorage.removeItem(POLLINATIONS_KEY_STORAGE);
          window.sessionStorage.removeItem(POLLINATIONS_VALIDATED_FLAG);
        } catch {
          // ignore
        }
        router.replace(`/${locale}/settings?keyInvalid=1`);
      }
      // network/timeout: stay on dashboard; the pool path still works.
    })();

    return () => {
      cancelled = true;
    };
  }, [locale, router]);

  return null;
}
