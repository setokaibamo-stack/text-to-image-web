"use client";

import { useState } from "react";
import { Button } from "./button";
import { CheckIcon } from "./icons";

type Tier = {
  name: string;
  badge?: string;
  monthly: number;
  annual: number;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

type Strings = {
  monthly: string;
  annual: string;
  saveBadge: string;
  perMonth: string;
  billedAnnually: string;
  popular: string;
};

export function Pricing({
  tiers,
  strings,
  ctaHref,
}: {
  tiers: Tier[];
  strings: Strings;
  ctaHref: string;
}) {
  const [annual, setAnnual] = useState(true);

  return (
    <div>
      {/* Toggle */}
      <div className="flex items-center justify-center gap-3">
        <div className="relative inline-flex items-center rounded-full border border-[var(--border-strong)] bg-white/5 p-1 backdrop-blur">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            aria-pressed={!annual}
            className={`relative z-10 px-4 py-1.5 text-body-sm font-semibold rounded-full transition-colors ${
              !annual ? "text-white" : "text-[var(--text-secondary)]"
            }`}
          >
            {strings.monthly}
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            aria-pressed={annual}
            className={`relative z-10 px-4 py-1.5 text-body-sm font-semibold rounded-full transition-colors ${
              annual ? "text-white" : "text-[var(--text-secondary)]"
            }`}
          >
            {strings.annual}
          </button>
          <span
            aria-hidden
            className="absolute top-1 bottom-1 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              insetInlineStart: annual ? "calc(50% + 2px)" : "4px",
              insetInlineEnd: annual ? "4px" : "calc(50% + 2px)",
              background: "var(--gradient-brand)",
              boxShadow: "var(--shadow-glow-purple)",
            }}
          />
        </div>
        <span className="text-caption uppercase tracking-[0.14em] text-emerald-400/90 ltr-nums">
          {strings.saveBadge}
        </span>
      </div>

      {/* Tiers */}
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {tiers.map((t) => {
          const price = annual ? t.annual : t.monthly;
          return (
            <div
              key={t.name}
              className={`relative card-glow p-7 flex flex-col gap-5 ${
                t.highlighted ? "ring-1 ring-[var(--brand-violet)]/60 glow-purple" : ""
              }`}
            >
              {t.highlighted && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-[var(--shadow-glow-purple)]"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  {strings.popular}
                </span>
              )}
              <div className="flex items-baseline justify-between">
                <h3 className="text-heading-md text-[var(--text-primary)]">
                  {t.name}
                </h3>
                {t.badge && (
                  <span className="text-caption uppercase tracking-[0.14em] text-[var(--brand-violet)]">
                    {t.badge}
                  </span>
                )}
              </div>
              <p className="text-body-md text-[var(--text-secondary)] -mt-2">
                {t.description}
              </p>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-display-lg text-[var(--text-primary)] ltr-nums">
                    ${price}
                  </span>
                  <span className="text-body-sm text-[var(--text-muted)]">
                    /{strings.perMonth}
                  </span>
                </div>
                {annual && (
                  <div className="mt-1 text-caption text-[var(--text-muted)]">
                    {strings.billedAnnually}
                  </div>
                )}
              </div>
              <ul className="flex flex-col gap-2.5">
                {t.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-body-sm text-[var(--text-secondary)]"
                  >
                    <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-[var(--brand-violet)]/15 text-[var(--brand-violet)]">
                      <CheckIcon width={11} height={11} />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                href={ctaHref}
                size="md"
                variant={t.highlighted ? "primary" : "secondary"}
                className="mt-2 w-full"
              >
                {t.cta}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
