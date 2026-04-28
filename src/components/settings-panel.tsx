"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import {
  POLLINATIONS_KEY_STORAGE,
  POLLINATIONS_VALIDATED_FLAG,
  maskKey,
} from "@/lib/pollinations";
import { ArrowRightIcon, SparkleIcon } from "./icons";

function GoogleGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden
      className="shrink-0"
    >
      <path
        fill="#EA4335"
        d="M12 10.2v3.84h5.36c-.23 1.37-1.62 4.02-5.36 4.02-3.22 0-5.85-2.67-5.85-5.96s2.63-5.96 5.85-5.96c1.83 0 3.06.78 3.76 1.45l2.56-2.46C16.91 3.66 14.7 2.6 12 2.6 6.96 2.6 2.88 6.68 2.88 11.7s4.08 9.1 9.12 9.1c5.27 0 8.76-3.7 8.76-8.91 0-.6-.07-1.06-.16-1.51L12 10.2z"
      />
    </svg>
  );
}

export function SettingsPanel({ locale, dict }: { locale: Locale; dict: Dict }) {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [masked, setMasked] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = window.localStorage.getItem(POLLINATIONS_KEY_STORAGE) ?? "";
    setMasked(maskKey(key));
    setHydrated(true);
  }, []);

  function onReplace() {
    router.push(`/${locale}/auth`);
  }

  function onRemove() {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(POLLINATIONS_KEY_STORAGE);
        window.sessionStorage.removeItem(POLLINATIONS_VALIDATED_FLAG);
      } catch {
        // ignore
      }
    }
    router.push(`/${locale}/auth`);
  }

  return (
    <div className="grid gap-6 sm:gap-8">
      <div className="card-glow p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span
            aria-hidden
            className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] text-white shadow-[var(--shadow-glow-purple)] shrink-0"
            style={{ background: "var(--gradient-brand)" }}
          >
            <SparkleIcon width={18} height={18} />
          </span>
          <div className="flex flex-col gap-1.5 min-w-0 flex-1">
            <h2 className="text-heading-md text-[var(--text-primary)]">
              {dict.settings.apiSectionTitle}
            </h2>
            <p className="text-body-sm text-[var(--text-secondary)]">
              {dict.settings.apiSectionDesc}
            </p>

            <div className="mt-4 rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white/[0.03] px-4 py-3">
              <div className="text-caption uppercase tracking-[0.1em] text-[var(--text-muted)]">
                {hydrated && masked
                  ? dict.settings.apiKeyActive
                  : dict.settings.apiKeyEmpty}
              </div>
              {hydrated && masked ? (
                <div className="mt-1 font-mono text-body-md text-[var(--text-primary)] break-all ltr-nums">
                  {masked}
                </div>
              ) : null}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onReplace}
                className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white/[0.04] px-4 py-2.5 text-body-md text-[var(--text-primary)] hover:bg-white/10 hover:border-[var(--brand-violet)] transition-colors"
              >
                <span>{dict.settings.replaceCta}</span>
                <ArrowRightIcon width={14} height={14} className="rtl-flip" />
              </button>
              {hydrated && masked ? (
                <button
                  type="button"
                  onClick={onRemove}
                  className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-body-md text-red-200 hover:bg-red-500/20 transition-colors"
                >
                  <span>{dict.settings.removeCta}</span>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="card-glow p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span
            aria-hidden
            className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-white/[0.06] border border-[var(--border-strong)] shrink-0"
          >
            <GoogleGlyph size={18} />
          </span>
          <div className="flex flex-col gap-1.5 min-w-0 flex-1">
            <h2 className="text-heading-md text-[var(--text-primary)]">
              {dict.settings.googleSectionTitle}
            </h2>
            <p className="text-body-sm text-[var(--text-secondary)]">
              {dict.settings.googleSectionDesc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
