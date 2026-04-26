"use client";

import { useState, type FormEvent } from "react";
import type { Dict } from "@/i18n/dictionaries";
import { ArrowRightIcon, PaperclipIcon, SparkleIcon } from "./icons";

export function PromptInput({ dict }: { dict: Dict }) {
  const [value, setValue] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "sent">("idle");
  const [dragging, setDragging] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim() || state === "loading") return;
    setState("loading");
    await new Promise((r) => setTimeout(r, 900));
    setState("sent");
    setTimeout(() => setState("idle"), 1400);
  }

  return (
    <form
      onSubmit={onSubmit}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
      }}
      className={`relative w-full max-w-2xl rounded-[var(--radius-xl)] border ${
        dragging
          ? "border-dashed border-[var(--text-muted)] bg-[var(--bg-subtle)]"
          : "border-[var(--border)] bg-[var(--bg-elevated)]"
      } shadow-[var(--shadow-md)] transition-colors`}
    >
      <label htmlFor="prompt" className="sr-only">
        {dict.hero.promptPlaceholder}
      </label>
      <textarea
        id="prompt"
        rows={3}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            (e.currentTarget.form as HTMLFormElement | null)?.requestSubmit();
          }
        }}
        placeholder={dict.hero.promptPlaceholder}
        className="block w-full resize-none bg-transparent px-5 pt-5 pb-3 text-body-lg text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none"
      />
      <div className="flex items-center justify-between gap-3 px-4 pb-4">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Attach file"
            className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-full)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)] transition-colors"
          >
            <PaperclipIcon width={18} height={18} />
          </button>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-caption text-[var(--text-muted)] bg-[var(--bg-subtle)] border border-[var(--border)] rounded-[var(--radius-full)] px-3 py-1">
            <SparkleIcon width={12} height={12} />
            {dict.hero.forPlatform}
          </span>
        </div>
        <button
          type="submit"
          disabled={!value.trim() || state === "loading"}
          className="inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--accent)] text-[var(--accent-fg)] px-4 py-2.5 text-body-sm font-semibold transition-all hover:-translate-y-px hover:shadow-[var(--shadow-sm)] disabled:opacity-40 disabled:pointer-events-none"
        >
          {state === "loading"
            ? dict.common.loading
            : state === "sent"
            ? "✓"
            : dict.hero.promptSubmit}
          {state === "idle" ? <ArrowRightIcon width={16} height={16} /> : null}
        </button>
      </div>
      <p className="px-5 pb-4 text-caption text-[var(--text-muted)]">
        {dict.hero.promptHelper}
      </p>
    </form>
  );
}
