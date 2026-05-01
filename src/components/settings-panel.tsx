"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import {
  POLLINATIONS_KEY_STORAGE,
  POLLINATIONS_VALIDATED_FLAG,
  maskKey,
  validatePollinationsKey,
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
  const searchParams = useSearchParams();
  const [hydrated, setHydrated] = useState(false);
  const [masked, setMasked] = useState<string>("");
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [validating, setValidating] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [keyInvalidNotice, setKeyInvalidNotice] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = window.localStorage.getItem(POLLINATIONS_KEY_STORAGE) ?? "";
    setMasked(maskKey(key));
    setHydrated(true);
    if (searchParams?.get("keyInvalid") === "1") {
      setKeyInvalidNotice(true);
      // Auto-open the form so the user can immediately fix it.
      setEditing(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (editing) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 30);
      return () => window.clearTimeout(t);
    }
  }, [editing]);

  function onStartEdit() {
    setFormError(null);
    setDraft("");
    setEditing(true);
  }

  function onCancel() {
    if (validating) return;
    setEditing(false);
    setDraft("");
    setFormError(null);
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
    setMasked("");
    setEditing(false);
    setDraft("");
    setKeyInvalidNotice(false);
    if (searchParams?.get("keyInvalid") === "1") {
      router.replace(`/${locale}/settings`);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (validating) return;
    const trimmed = draft.trim();
    if (trimmed.length < 6) {
      setFormError(dict.settings.keyFormatError);
      return;
    }
    setFormError(null);
    setValidating(true);
    const result = await validatePollinationsKey(trimmed);
    setValidating(false);
    if (!result.ok) {
      setFormError(
        result.reason === "invalid"
          ? dict.settings.keyInvalidError
          : result.reason === "timeout"
            ? dict.settings.keyTimeoutError
            : dict.settings.keyNetworkError,
      );
      return;
    }
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(POLLINATIONS_KEY_STORAGE, trimmed);
        window.sessionStorage.setItem(POLLINATIONS_VALIDATED_FLAG, "1");
      } catch {
        // ignore storage quota / privacy mode errors
      }
    }
    setMasked(maskKey(trimmed));
    setEditing(false);
    setDraft("");
    setKeyInvalidNotice(false);
    if (searchParams?.get("keyInvalid") === "1") {
      router.replace(`/${locale}/settings`);
    }
  }

  const hasKey = hydrated && masked;
  const primaryCtaLabel = hasKey
    ? dict.settings.replaceCta
    : dict.settings.addCta;

  return (
    <div className="grid gap-6 sm:gap-8">
      {keyInvalidNotice ? (
        <div
          role="status"
          className="rounded-[var(--radius-md)] border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-body-sm text-amber-200"
        >
          {dict.settings.keyInvalidNotice}
        </div>
      ) : null}

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
                {hasKey
                  ? dict.settings.apiKeyActive
                  : dict.settings.apiKeyEmpty}
              </div>
              {hasKey ? (
                <div className="mt-1 font-mono text-body-md text-[var(--text-primary)] break-all ltr-nums">
                  {masked}
                </div>
              ) : null}
            </div>

            {editing ? (
              <form onSubmit={onSubmit} className="mt-4 grid gap-3" noValidate>
                <label className="flex flex-col gap-1.5">
                  <span className="text-caption uppercase tracking-[0.1em] text-[var(--text-muted)]">
                    {dict.settings.keyInputLabel}
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    inputMode="text"
                    autoComplete="off"
                    spellCheck={false}
                    value={draft}
                    onChange={(e) => {
                      setDraft(e.target.value);
                      if (formError) setFormError(null);
                    }}
                    placeholder={dict.settings.keyInputPlaceholder}
                    aria-invalid={formError ? true : undefined}
                    disabled={validating}
                    className="rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white/[0.03] px-4 py-3 font-mono text-body-md text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--brand-violet)] focus:ring-2 focus:ring-[color:rgb(124_58_237/0.35)] disabled:opacity-60"
                  />
                  {formError ? (
                    <span className="text-caption text-red-400">
                      {formError}
                    </span>
                  ) : null}
                </label>

                <a
                  href={dict.settings.keyHelpHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-body-sm font-semibold text-[var(--brand-violet)] hover:text-[var(--text-primary)] transition-colors w-fit"
                >
                  <span>{dict.settings.keyHelpCta}</span>
                  <ArrowRightIcon width={14} height={14} className="rtl-flip" />
                </a>

                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <button
                    type="submit"
                    disabled={validating}
                    className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[image:var(--gradient-brand)] px-4 py-2.5 text-body-md font-semibold text-white shadow-[var(--shadow-glow-purple)] transition-all hover:-translate-y-px hover:shadow-[var(--shadow-glow-mix)] disabled:opacity-60 disabled:pointer-events-none"
                  >
                    {validating ? (
                      <>
                        <span
                          aria-hidden
                          className="inline-block h-3.5 w-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin"
                        />
                        <span>{dict.settings.savingCta}</span>
                      </>
                    ) : (
                      <>
                        <span>{dict.settings.saveCta}</span>
                        <ArrowRightIcon
                          width={14}
                          height={14}
                          className="rtl-flip"
                        />
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={onCancel}
                    disabled={validating}
                    className="rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white/[0.03] px-4 py-2.5 text-body-md text-[var(--text-primary)] hover:bg-white/8 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {dict.settings.cancelCta}
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={onStartEdit}
                  className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white/[0.04] px-4 py-2.5 text-body-md text-[var(--text-primary)] hover:bg-white/10 hover:border-[var(--brand-violet)] transition-colors"
                >
                  <span>{primaryCtaLabel}</span>
                  <ArrowRightIcon width={14} height={14} className="rtl-flip" />
                </button>
                {hasKey ? (
                  <button
                    type="button"
                    onClick={onRemove}
                    className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-body-md text-red-200 hover:bg-red-500/20 transition-colors"
                  >
                    <span>{dict.settings.removeCta}</span>
                  </button>
                ) : null}
              </div>
            )}
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
