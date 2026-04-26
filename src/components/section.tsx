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
      className={`${
        tone === "subtle" ? "bg-[var(--bg-subtle)]" : "bg-[var(--bg-base)]"
      } ${className}`}
    >
      <div className="container-page py-14 sm:py-20 md:py-24">{children}</div>
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
          <span className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)]">
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
      className={`inline-flex items-center gap-1 rounded-[var(--radius-full)] px-2.5 py-1 text-body-sm ${
        tone === "accent"
          ? "bg-[var(--accent)] text-[var(--accent-fg)]"
          : "bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border)]"
      }`}
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
  const base =
    "bg-[var(--bg-elevated)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6";
  const hover = interactive
    ? "transition-[box-shadow,border-color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[var(--shadow-sm)] hover:border-[var(--border-strong)]"
    : "";
  return <Tag className={`${base} ${hover} ${className}`}>{children}</Tag>;
}
