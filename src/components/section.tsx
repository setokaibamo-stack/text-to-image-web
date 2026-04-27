import type { ReactNode } from "react";

export function Section({
  children,
  id,
  className = "",
  tone = "base",
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  tone?: "base" | "subtle";
}) {
  return (
    <section
      id={id}
      className={`relative ${
        tone === "subtle" ? "bg-[var(--bg-subtle)]" : "bg-transparent"
      } ${className}`}
    >
      <div className="container-page relative py-16 sm:py-24 md:py-28">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "start",
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "start" | "center";
  action?: ReactNode;
}) {
  const alignment =
    align === "center" ? "text-center items-center" : "text-start items-start";
  return (
    <div
      className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 ${
        align === "center" ? "md:flex-col md:items-center" : ""
      }`}
    >
      <div className={`flex flex-col gap-3 ${alignment}`}>
        {eyebrow ? (
          <span
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/[0.03] px-3 py-1 text-caption uppercase tracking-[0.14em] text-[var(--text-secondary)] w-fit"
            data-eyebrow
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--gradient-brand)" }}
            />
            {eyebrow}
          </span>
        ) : null}
        <h2 className="text-display-lg text-[var(--text-primary)] max-w-[22ch] text-balance">
          {title}
        </h2>
        {subtitle ? (
          <p className="text-body-lg text-[var(--text-secondary)] max-w-[60ch] text-pretty">
            {subtitle}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function Badge({
  children,
  tone = "subtle",
}: {
  children: ReactNode;
  tone?: "subtle" | "accent";
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-body-sm ${
        tone === "accent"
          ? "text-white shadow-[var(--shadow-glow-purple)]"
          : "bg-white/[0.04] text-[var(--text-secondary)] border border-[var(--border-strong)] backdrop-blur"
      }`}
      style={
        tone === "accent" ? { background: "var(--gradient-brand)" } : undefined
      }
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  className = "",
  as: Tag = "div",
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
  interactive?: boolean;
}) {
  const base = interactive
    ? "card-glow p-6"
    : "card-surface p-6";
  return <Tag className={`${base} ${className}`}>{children}</Tag>;
}
