"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import {
  POLLINATIONS_KEY_STORAGE,
  POLLINATIONS_VALIDATED_FLAG,
  validatePollinationsKey,
} from "@/lib/pollinations";
import { ArrowRightIcon, CloseIcon, SparkleIcon } from "./icons";

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

function PollinationsGlyph({ size = 18 }: { size?: number }) {
  return (
    <span
      aria-hidden
      className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full text-white shrink-0"
      style={{
        width: size,
        height: size,
        background: "var(--gradient-brand)",
      }}
    >
      <SparkleIcon width={Math.round(size * 0.6)} height={Math.round(size * 0.6)} />
    </span>
  );
}

type Mode = "signin" | "signup";

export function AuthForm({ locale, dict }: { locale: Locale; dict: Dict }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState<"idle" | "loading">("idle");
  const [pollOpen, setPollOpen] = useState(false);
  const [pollKey, setPollKey] = useState("");
  const [pollError, setPollError] = useState<string | null>(null);
  const [pollValidating, setPollValidating] = useState(false);
  const [keyInvalidNotice, setKeyInvalidNotice] = useState(false);
  const pollInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchParams?.get("keyInvalid") === "1") {
      setKeyInvalidNotice(true);
    }
  }, [searchParams]);

  function go() {
    router.push(`/${locale}/dashboard`);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (state === "loading") return;
    if (!email.trim() || password.length < 8) return;
    setState("loading");
    await new Promise((r) => setTimeout(r, 700));
    go();
  }

  async function onGoogle() {
    if (state === "loading") return;
    setState("loading");
    await new Promise((r) => setTimeout(r, 700));
    go();
  }

  function onPollinations() {
    if (state === "loading") return;
    setPollError(null);
    if (typeof window !== "undefined") {
      const existing = window.localStorage.getItem(POLLINATIONS_KEY_STORAGE);
      setPollKey(existing ?? "");
    }
    setPollOpen(true);
  }

  async function onPollinationsSubmit(e: FormEvent) {
    e.preventDefault();
    if (pollValidating) return;
    const trimmed = pollKey.trim();
    if (trimmed.length < 6) {
      setPollError(dict.auth.pollinationsKeyError);
      return;
    }
    setPollError(null);
    setPollValidating(true);
    const result = await validatePollinationsKey(trimmed);
    setPollValidating(false);
    if (!result.ok) {
      setPollError(
        result.reason === "invalid"
          ? dict.auth.pollinationsKeyInvalidError
          : result.reason === "timeout"
            ? dict.auth.pollinationsKeyTimeoutError
            : dict.auth.pollinationsKeyNetworkError,
      );
      return;
    }
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(POLLINATIONS_KEY_STORAGE, trimmed);
        window.sessionStorage.setItem(POLLINATIONS_VALIDATED_FLAG, "1");
      } catch {
        // ignore quota / privacy mode errors
      }
    }
    setKeyInvalidNotice(false);
    setPollOpen(false);
    setState("loading");
    go();
  }

  useEffect(() => {
    if (!pollOpen) return;
    const t = window.setTimeout(() => pollInputRef.current?.focus(), 30);
    function onKey(ev: KeyboardEvent) {
      if (ev.key === "Escape" && !pollValidating) setPollOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
  }, [pollOpen, pollValidating]);

  useEffect(() => {
    if (pollOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [pollOpen]);

  const submitLabel =
    mode === "signin" ? dict.auth.submitSignIn : dict.auth.submitSignUp;
  const toggleLabel =
    mode === "signin" ? dict.auth.toggleToSignUp : dict.auth.toggleToSignIn;
  const disabled = state === "loading";

  return (
    <div className="flex flex-col gap-5 w-full max-w-md mx-auto">
      {keyInvalidNotice ? (
        <div
          role="status"
          className="rounded-[var(--radius-md)] border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-body-sm text-amber-200"
        >
          {dict.auth.keyInvalidNotice}
        </div>
      ) : null}
      <div className="grid gap-3">
        <button
          type="button"
          onClick={onGoogle}
          disabled={disabled}
          className="inline-flex items-center justify-center gap-3 w-full rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white/[0.04] px-5 py-3 text-body-md font-semibold text-[var(--text-primary)] backdrop-blur transition-all hover:bg-white/10 hover:border-[var(--brand-violet)] disabled:opacity-50 disabled:pointer-events-none"
        >
          <GoogleGlyph />
          <span>{dict.auth.googleCta}</span>
        </button>
        <button
          type="button"
          onClick={onPollinations}
          disabled={disabled}
          className="inline-flex items-center justify-center gap-3 w-full rounded-[var(--radius-md)] bg-[image:var(--gradient-brand)] px-5 py-3 text-body-md font-semibold text-white shadow-[var(--shadow-glow-purple)] transition-all hover:-translate-y-px hover:shadow-[var(--shadow-glow-mix)] disabled:opacity-50 disabled:pointer-events-none"
        >
          <PollinationsGlyph />
          <span>{dict.auth.pollinationsCta}</span>
        </button>
      </div>

      <div className="flex items-center gap-3 text-caption uppercase tracking-[0.14em] text-[var(--text-muted)]">
        <span aria-hidden className="h-px flex-1 bg-[var(--border-strong)]" />
        <span>{dict.auth.dividerOr}</span>
        <span aria-hidden className="h-px flex-1 bg-[var(--border-strong)]" />
      </div>

      <form onSubmit={onSubmit} className="grid gap-3" noValidate>
        <label className="flex flex-col gap-1.5">
          <span className="text-caption uppercase tracking-[0.1em] text-[var(--text-muted)]">
            {dict.auth.emailLabel}
          </span>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={dict.auth.emailPlaceholder}
            className="rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white/[0.03] px-4 py-3 text-body-md text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--brand-violet)] focus:ring-2 focus:ring-[color:rgb(124_58_237/0.35)]"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="flex items-center justify-between gap-2 text-caption uppercase tracking-[0.1em] text-[var(--text-muted)]">
            <span>{dict.auth.passwordLabel}</span>
            <button
              type="button"
              className="text-caption normal-case tracking-normal text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {dict.auth.forgotCta}
            </button>
          </span>
          <input
            type="password"
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={dict.auth.passwordPlaceholder}
            className="rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white/[0.03] px-4 py-3 text-body-md text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--brand-violet)] focus:ring-2 focus:ring-[color:rgb(124_58_237/0.35)]"
          />
        </label>

        <button
          type="submit"
          disabled={disabled || !email.trim() || password.length < 8}
          className="mt-1 inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[image:var(--gradient-brand)] px-5 py-3 text-body-md font-semibold text-white shadow-[var(--shadow-glow-purple)] transition-all hover:-translate-y-px hover:shadow-[var(--shadow-glow-mix)] disabled:opacity-50 disabled:pointer-events-none"
        >
          <span>{submitLabel}</span>
          <ArrowRightIcon width={16} height={16} className="rtl-flip" />
        </button>
      </form>

      {/* Quota glow card */}
      <div className="card-glow p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span
            aria-hidden
            className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] text-white shadow-[var(--shadow-glow-purple)] shrink-0"
            style={{ background: "var(--gradient-brand)" }}
          >
            <SparkleIcon width={16} height={16} />
          </span>
          <div className="flex flex-col gap-2">
            <div className="text-heading-md text-[var(--text-primary)]">
              {dict.auth.quotaTitle}
            </div>
            <ul className="grid gap-1.5 text-body-sm text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <GoogleGlyph size={14} />
                <span>{dict.auth.quotaGoogle}</span>
              </li>
              <li className="flex items-start gap-2">
                <PollinationsGlyph size={14} />
                <span>{dict.auth.quotaPollinations}</span>
              </li>
            </ul>
            <a
              href={dict.auth.quotaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-body-sm font-semibold text-[var(--brand-violet)] hover:text-[var(--text-primary)] transition-colors"
            >
              <span>{dict.auth.quotaLinkLabel}</span>
              <ArrowRightIcon width={14} height={14} className="rtl-flip" />
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <button
          type="button"
          onClick={() => setMode((m) => (m === "signin" ? "signup" : "signin"))}
          className="text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          {toggleLabel}
        </button>
        <p className="text-caption text-[var(--text-muted)] max-w-[40ch]">
          {dict.auth.termsNote}
        </p>
      </div>

      {pollOpen ? (
        <div
          role="dialog"
          aria-modal
          aria-labelledby="poll-key-title"
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 animate-[fadeIn_180ms_ease]"
        >
          <button
            type="button"
            aria-label={dict.auth.pollinationsKeyCancel}
            onClick={() => {
              if (!pollValidating) setPollOpen(false);
            }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <form
            onSubmit={onPollinationsSubmit}
            className="relative w-full max-w-md rounded-[var(--radius-xl)] border border-[var(--border-strong)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-glow-mix)]"
          >
            <button
              type="button"
              onClick={() => setPollOpen(false)}
              disabled={pollValidating}
              aria-label={dict.auth.pollinationsKeyCancel}
              className="absolute end-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-secondary)] hover:bg-white/8 hover:text-[var(--text-primary)] transition-colors disabled:opacity-50 disabled:pointer-events-none"
            >
              <CloseIcon width={16} height={16} />
            </button>

            <div className="flex items-start gap-3">
              <span
                aria-hidden
                className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] text-white shadow-[var(--shadow-glow-purple)] shrink-0"
                style={{ background: "var(--gradient-brand)" }}
              >
                <SparkleIcon width={18} height={18} />
              </span>
              <div className="flex flex-col gap-1">
                <h2
                  id="poll-key-title"
                  className="text-heading-md text-[var(--text-primary)]"
                >
                  {dict.auth.pollinationsKeyTitle}
                </h2>
                <p className="text-body-sm text-[var(--text-secondary)]">
                  {dict.auth.pollinationsKeyDesc}
                </p>
              </div>
            </div>

            <label className="mt-5 flex flex-col gap-1.5">
              <span className="text-caption uppercase tracking-[0.1em] text-[var(--text-muted)]">
                {dict.auth.pollinationsKeyLabel}
              </span>
              <input
                ref={pollInputRef}
                type="text"
                inputMode="text"
                autoComplete="off"
                spellCheck={false}
                value={pollKey}
                onChange={(e) => {
                  setPollKey(e.target.value);
                  if (pollError) setPollError(null);
                }}
                placeholder={dict.auth.pollinationsKeyPlaceholder}
                aria-invalid={pollError ? true : undefined}
                className="rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white/[0.03] px-4 py-3 font-mono text-body-md text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--brand-violet)] focus:ring-2 focus:ring-[color:rgb(124_58_237/0.35)]"
              />
              {pollError ? (
                <span className="text-caption text-red-400">{pollError}</span>
              ) : null}
            </label>

            <a
              href={dict.auth.quotaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-body-sm font-semibold text-[var(--brand-violet)] hover:text-[var(--text-primary)] transition-colors"
            >
              <span>{dict.auth.pollinationsKeyHelp}</span>
              <ArrowRightIcon width={14} height={14} className="rtl-flip" />
            </a>

            <div className="mt-6 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setPollOpen(false)}
                disabled={pollValidating}
                className="rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-white/[0.03] px-4 py-2.5 text-body-md text-[var(--text-primary)] hover:bg-white/8 transition-colors disabled:opacity-50 disabled:pointer-events-none"
              >
                {dict.auth.pollinationsKeyCancel}
              </button>
              <button
                type="submit"
                disabled={pollValidating}
                className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[image:var(--gradient-brand)] px-4 py-2.5 text-body-md font-semibold text-white shadow-[var(--shadow-glow-purple)] transition-all hover:-translate-y-px hover:shadow-[var(--shadow-glow-mix)] disabled:opacity-60 disabled:pointer-events-none"
              >
                {pollValidating ? (
                  <>
                    <span
                      aria-hidden
                      className="inline-block h-3.5 w-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin"
                    />
                    <span>{dict.auth.pollinationsKeyValidating}</span>
                  </>
                ) : (
                  <>
                    <span>{dict.auth.pollinationsKeyContinue}</span>
                    <ArrowRightIcon width={14} height={14} className="rtl-flip" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
