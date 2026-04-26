"use client";

import { useState } from "react";
import { MinusIcon, PlusIcon } from "./icons";

export function FAQAccordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <ul className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
      {items.map((item, i) => {
        const open = openIdx === i;
        return (
          <li key={item.q}>
            <button
              type="button"
              onClick={() => setOpenIdx(open ? null : i)}
              aria-expanded={open}
              className="w-full flex items-start justify-between gap-6 py-5 text-start"
            >
              <span className="text-heading-md text-[var(--text-primary)]">
                {item.q}
              </span>
              <span
                className={`mt-1 shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full border transition-all ${
                  open
                    ? "text-white border-transparent shadow-[var(--shadow-glow-purple)]"
                    : "text-[var(--text-secondary)] border-[var(--border-strong)]"
                }`}
                style={
                  open ? { background: "var(--gradient-brand)" } : undefined
                }
              >
                {open ? <MinusIcon width={16} height={16} /> : <PlusIcon width={16} height={16} />}
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="text-body-md text-[var(--text-secondary)] max-w-[72ch]">
                  {item.a}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
