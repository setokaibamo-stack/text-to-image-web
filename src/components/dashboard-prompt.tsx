"use client";

import { useState, type FormEvent } from "react";
import type { Dict } from "@/i18n/dictionaries";
import { ArrowRightIcon, PaperclipIcon } from "./icons";

export function DashboardPrompt({ dict }: { dict: Dict }) {
  const [value, setValue] = useState("");
  const [aspect, setAspect] = useState(dict.dashboard.aspects[0].value);
  const [style, setStyle] = useState(dict.dashboard.styles[0].value);
  const [state, setState] = useState<"idle" | "loading" | "sent">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim() || state === "loading") return;
    setState("loading");
    await new Promise((r) => setTimeout(r, 900));
    setState("sent");
    setTimeout(() => {
      setState("idle");
      setValue("");
    }, 2200);
  }

  const sending = state === "loading";
  const sent = state === "sent";

  return (
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
            : sent
            ? "✓"
            : dict.dashboard.promptSubmit}
          {!sending && !sent ? (
            <ArrowRightIcon width={16} height={16} />
          ) : null}
        </button>
      </div>

      <p className="px-4 sm:px-5 pb-4 text-caption text-[var(--text-muted)]">
        {sent ? dict.dashboard.promptSuccess : dict.dashboard.promptHelper}
      </p>
    </form>
  );
}
