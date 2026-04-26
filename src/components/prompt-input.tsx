"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import { ArrowRightIcon, PaperclipIcon, SparkleIcon } from "./icons";

export function PromptInput({ dict, locale }: { dict: Dict; locale?: Locale }) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "sent">("idle");
  const [dragging, setDragging] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim() || state === "loading") return;
    setState("loading");
    if (locale) {
      router.push(`/${locale}/launch`);
      return;
    }
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
      className={`relative w-full max-w-2xl rounded-[var(--radius-xl)] glass-strong shadow-[var(--shadow-glow-mix)] transition-colors ${
        dragging ? "ring-2 ring-[var(--brand-violet)]/60" : ""
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-60"
        style={{
          background: "var(--gradient-brand)",
          WebkitMask:
            "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
          mask: "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />
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
            aria-label={dict.hero.promptAttach}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--text-secondary)] hover:bg-white/8 hover:text-[var(--text-primary)] transition-colors"
          >
            <PaperclipIcon width={18} height={18} />
          </button>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-caption text-[var(--text-muted)] bg-white/[0.04] border border-[var(--border-strong)] rounded-full px-3 py-1">
            <SparkleIcon width={12} height={12} />
            {dict.hero.forPlatform}
          </span>
        </div>
        <button
          type="submit"
          disabled={!value.trim() || state === "loading"}
          className="inline-flex items-center gap-2 rounded-[var(--radius-md)] text-white px-4 py-2.5 text-body-sm font-semibold transition-all hover:-translate-y-px disabled:opacity-40 disabled:pointer-events-none"
          style={{
            background: "var(--gradient-brand)",
            boxShadow: "var(--shadow-glow-purple)",
          }}
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
