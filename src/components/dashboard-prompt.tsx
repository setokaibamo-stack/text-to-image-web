"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import type { Dict } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import {
  POLLINATIONS_KEY_STORAGE,
  POLLINATIONS_VALIDATED_FLAG,
} from "@/lib/pollinations";
import { getOrCreateDeviceId } from "@/lib/device-id";
import { generateEndpoint } from "@/lib/api-base";
import { ArrowRightIcon, PaperclipIcon } from "./icons";

type GenState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "image"; url: string; mode: "pool" | "byok" }
  | {
      kind: "error";
      code:
        | "user_quota_exceeded"
        | "pool_exhausted"
        | "pool_unconfigured"
        | "byok_invalid"
        | "byok_quota"
        | "network"
        | "timeout"
        | "generic";
      message?: string;
    };

const STYLE_PROMPT_SUFFIX: Record<string, string> = {
  cinematic: ", cinematic, dramatic lighting, 35mm",
  photoreal: ", photorealistic, ultra detailed, sharp focus",
  editorial: ", editorial photography, soft natural light",
  illustration: ", illustration, clean vector lines",
};

export function DashboardPrompt({
  dict,
  locale,
}: {
  dict: Dict;
  locale: Locale;
}) {
  const [value, setValue] = useState("");
  const [aspect, setAspect] = useState(dict.dashboard.aspects[0].value);
  const [style, setStyle] = useState(dict.dashboard.styles[0].value);
  const [gen, setGen] = useState<GenState>({ kind: "idle" });
  const blobUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, []);

  function setImage(url: string, mode: "pool" | "byok") {
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }
    blobUrlRef.current = url;
    setGen({ kind: "image", url, mode });
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const prompt = value.trim();
    if (!prompt || gen.kind === "loading") return;

    const styledPrompt = prompt + (STYLE_PROMPT_SUFFIX[style] ?? "");
    setGen({ kind: "loading" });

    try {
      await runGenerate(styledPrompt, aspect);
    } catch {
      // Safety net for unexpected rejections (e.g., body-stream failures
      // during `res.blob()`) that escape runGenerate's inner try/catch and
      // would otherwise leave the UI stuck in `loading`.
      setGen({ kind: "error", code: "network" });
    }
  }

  async function runGenerate(prompt: string, ratio: string) {
    const deviceId = getOrCreateDeviceId();
    const userKey =
      typeof window !== "undefined"
        ? (window.localStorage.getItem(POLLINATIONS_KEY_STORAGE) ?? "").trim()
        : "";

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 90_000);
    let res: Response;
    try {
      res = await fetch(generateEndpoint(), {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          prompt,
          ratio,
          deviceId,
          ...(userKey ? { userKey } : {}),
        }),
        cache: "no-store",
        signal: controller.signal,
      });
    } catch (err) {
      clearTimeout(timeout);
      if (err instanceof DOMException && err.name === "AbortError") {
        setGen({ kind: "error", code: "timeout" });
        return;
      }
      setGen({ kind: "error", code: "network" });
      return;
    }
    clearTimeout(timeout);

    if (res.ok) {
      const mode = res.headers.get("x-tti-mode") === "byok" ? "byok" : "pool";
      const blob = await res.blob();
      setImage(URL.createObjectURL(blob), mode);
      return;
    }

    const body = (await res.json().catch(() => ({}))) as { error?: string };
    const errorCode = typeof body.error === "string" ? body.error : "";

    if (errorCode === "byok_invalid") {
      // Server rejected our saved key. Clear local copy so KeyGuard and
      // future requests don't keep submitting a dead key.
      try {
        window.localStorage.removeItem(POLLINATIONS_KEY_STORAGE);
        window.sessionStorage.removeItem(POLLINATIONS_VALIDATED_FLAG);
      } catch {}
      setGen({ kind: "error", code: "byok_invalid" });
      return;
    }

    if (res.status === 429 || errorCode === "user_quota_exceeded") {
      setGen({ kind: "error", code: "user_quota_exceeded" });
      return;
    }

    if (res.status === 503) {
      setGen({
        kind: "error",
        code:
          errorCode === "pool_unconfigured"
            ? "pool_unconfigured"
            : "pool_exhausted",
      });
      return;
    }

    if (res.status === 504 || errorCode === "upstream_timeout") {
      setGen({ kind: "error", code: "timeout" });
      return;
    }

    setGen({ kind: "error", code: "generic" });
  }

  const sending = gen.kind === "loading";

  return (
    <div className="flex flex-col gap-4">
      <form
        onSubmit={onSubmit}
        className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] shadow-[var(--shadow-sm)]"
      >
        <label htmlFor="dash-prompt" className="sr-only">
          {dict.dashboard.promptPlaceholder}
        </label>
        <textarea
          id="dash-prompt"
          rows={4}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && (e.ctrlKey || e.metaKey)) {
              e.preventDefault();
              (e.currentTarget.form as HTMLFormElement | null)?.requestSubmit();
            }
          }}
          placeholder={dict.dashboard.promptPlaceholder}
          className="block w-full resize-none bg-transparent px-4 sm:px-5 pt-4 sm:pt-5 pb-3 text-body-md sm:text-body-lg text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none"
        />

        <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-1 flex flex-wrap items-center gap-2 sm:gap-3">
          <label className="inline-flex items-center gap-2 text-caption text-[var(--text-muted)]">
            <span className="uppercase tracking-[0.1em]">
              {dict.dashboard.aspectLabel}
            </span>
            <select
              aria-label={dict.dashboard.aspectLabel}
              value={aspect}
              onChange={(e) => setAspect(e.target.value)}
              className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--bg-base)] px-2 py-1 text-body-sm text-[var(--text-primary)]"
            >
              {dict.dashboard.aspects.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </select>
          </label>
          <label className="inline-flex items-center gap-2 text-caption text-[var(--text-muted)]">
            <span className="uppercase tracking-[0.1em]">
              {dict.dashboard.styleLabel}
            </span>
            <select
              aria-label={dict.dashboard.styleLabel}
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--bg-base)] px-2 py-1 text-body-sm text-[var(--text-primary)]"
            >
              {dict.dashboard.styles.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            aria-label={dict.dashboard.promptAttach}
            className="ms-auto inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-full)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)] transition-colors"
          >
            <PaperclipIcon width={18} height={18} />
          </button>
          <button
            type="submit"
            disabled={!value.trim() || sending}
            className="inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--accent)] text-[var(--accent-fg)] px-4 py-2.5 text-body-sm font-semibold transition-all hover:-translate-y-px hover:shadow-[var(--shadow-sm)] disabled:opacity-40 disabled:pointer-events-none"
          >
            {sending
              ? dict.dashboard.promptSending
              : dict.dashboard.promptSubmit}
            {!sending ? <ArrowRightIcon width={16} height={16} /> : null}
          </button>
        </div>

        <p className="px-4 sm:px-5 pb-4 text-caption text-[var(--text-muted)]">
          {dict.dashboard.promptHelper}
        </p>
      </form>

      <GenerationResult gen={gen} dict={dict} locale={locale} />
    </div>
  );
}

function GenerationResult({
  gen,
  dict,
  locale,
}: {
  gen: GenState;
  dict: Dict;
  locale: Locale;
}) {
  if (gen.kind === "idle") return null;

  if (gen.kind === "loading") {
    return (
      <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-5 flex items-center gap-3">
        <span
          className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent text-[var(--brand-violet)]"
          aria-hidden
        />
        <span className="text-body-sm text-[var(--text-secondary)]">
          {dict.dashboard.generationPending}
        </span>
      </div>
    );
  }

  if (gen.kind === "image") {
    return (
      <figure className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-elevated)] p-3 flex flex-col gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={gen.url}
          alt={dict.dashboard.generationAlt}
          className="w-full rounded-[var(--radius-md)]"
        />
        <figcaption className="text-caption text-[var(--text-muted)] flex items-center justify-between flex-wrap gap-2 px-1">
          <span>
            {gen.mode === "pool"
              ? dict.dashboard.modePool
              : dict.dashboard.modeByok}
          </span>
          <a
            href={gen.url}
            download="text-to-image.jpg"
            className="text-[var(--brand-violet)] hover:underline"
          >
            {dict.dashboard.downloadImage}
          </a>
        </figcaption>
      </figure>
    );
  }

  // error states
  const errors = dict.dashboard.errors;
  let title = errors.generic;
  let body: string | null = null;
  let cta: { href: string; label: string } | null = null;

  switch (gen.code) {
    case "user_quota_exceeded":
      title = errors.userQuotaTitle;
      body = errors.userQuotaBody;
      cta = { href: `/${locale}/settings`, label: errors.userQuotaCta };
      break;
    case "pool_exhausted":
      title = errors.poolExhaustedTitle;
      body = errors.poolExhaustedBody;
      cta = { href: `/${locale}/settings`, label: errors.poolExhaustedCta };
      break;
    case "pool_unconfigured":
      title = errors.poolUnconfiguredTitle;
      body = errors.poolUnconfiguredBody;
      break;
    case "byok_invalid":
      title = errors.byokInvalidTitle;
      body = errors.byokInvalidBody;
      cta = {
        href: `/${locale}/settings?keyInvalid=1`,
        label: errors.byokInvalidCta,
      };
      break;
    case "byok_quota":
      title = errors.byokQuotaTitle;
      body = errors.byokQuotaBody;
      break;
    case "timeout":
      title = errors.timeoutTitle;
      body = errors.timeoutBody;
      break;
    case "network":
      title = errors.networkTitle;
      body = errors.networkBody;
      break;
    default:
      title = errors.generic;
      break;
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-[color:var(--danger,#f87171)]/30 bg-[color:var(--danger,#f87171)]/8 p-5 flex flex-col gap-2">
      <div className="text-body-md font-semibold text-[var(--text-primary)]">
        {title}
      </div>
      {body ? (
        <p className="text-body-sm text-[var(--text-secondary)]">{body}</p>
      ) : null}
      {cta ? (
        <Link
          href={cta.href}
          className="mt-1 inline-flex items-center gap-1.5 text-caption font-semibold text-[var(--brand-violet)] hover:underline w-fit"
        >
          {cta.label}
          <ArrowRightIcon width={12} height={12} />
        </Link>
      ) : null}
    </div>
  );
}
