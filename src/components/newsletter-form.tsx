"use client";

import { useState } from "react";

export function NewsletterForm({
  label,
  placeholder,
  cta,
}: {
  label: string;
  placeholder: string;
  cta: string;
}) {
  const [done, setDone] = useState(false);
  return (
    <form
      className="mt-6 flex items-center gap-2 max-w-sm"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <label className="sr-only" htmlFor="subscribe">
        {label}
      </label>
      <input
        id="subscribe"
        type="email"
        required
        placeholder={placeholder}
        className="flex-1 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-[var(--radius-md)] px-3 py-2.5 text-body-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--border-strong)] focus:bg-[var(--bg-elevated)] transition-colors outline-none"
      />
      <button
        type="submit"
        className="text-body-sm font-semibold px-4 py-2.5 rounded-[var(--radius-md)] bg-[var(--accent)] text-[var(--accent-fg)] hover:-translate-y-px hover:shadow-[var(--shadow-sm)] transition-transform"
      >
        {done ? "✓" : cta}
      </button>
    </form>
  );
}
