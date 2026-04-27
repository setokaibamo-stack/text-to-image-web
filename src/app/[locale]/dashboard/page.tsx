import { notFound } from "next/navigation";
import { Background } from "@/components/background";
import { DashboardPrompt } from "@/components/dashboard-prompt";
import { ArrowUpRightIcon, SparkleIcon } from "@/components/icons";
import { KeyGuard } from "@/components/key-guard";
import { Reveal } from "@/components/reveal";
import { Card, Section } from "@/components/section";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const d = getDictionary(l);

  return (
    <Section className="overflow-hidden">
      <Background variant="section" />
      <KeyGuard locale={l} />

      <Reveal>
        <div className="flex flex-col gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/[0.04] px-3 py-1 text-caption uppercase tracking-[0.14em] text-[var(--text-secondary)] w-fit">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--gradient-brand)" }}
            />
            {d.dashboard.eyebrow}
          </span>
          <h1 className="text-display-lg text-[var(--text-primary)] text-balance max-w-[22ch]">
            {d.dashboard.welcomeTitle}
          </h1>
          <p className="text-body-lg text-[var(--text-secondary)] max-w-[60ch] text-pretty">
            {d.dashboard.welcomeSubtitle}
          </p>
        </div>
      </Reveal>

      {/* Stats */}
      <ul className="mt-10 grid gap-4 grid-cols-2 lg:grid-cols-4">
        {d.dashboard.stats.map((s, i) => (
          <Reveal as="li" key={s.label} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
            <div className="card-glow p-5 sm:p-6 h-full">
              <div className="text-caption uppercase tracking-[0.1em] text-[var(--text-muted)]">
                {s.label}
              </div>
              <div className="mt-2 text-display-md text-gradient-brand font-bold ltr-nums">
                {s.value}
              </div>
              <div className="mt-1 text-caption text-[var(--text-secondary)]">
                {s.hint}
              </div>
            </div>
          </Reveal>
        ))}
      </ul>

      <div className="mt-10 sm:mt-12 grid gap-6 lg:gap-8 lg:grid-cols-[1.4fr_1fr]">
        {/* Prompt panel */}
        <Reveal>
          <Card interactive className="flex flex-col gap-5">
            <div className="flex items-start gap-3">
              <span
                aria-hidden
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-white"
                style={{
                  background: "var(--gradient-brand)",
                  boxShadow: "var(--shadow-glow-purple)",
                }}
              >
                <SparkleIcon width={18} height={18} />
              </span>
              <div>
                <h2 className="text-heading-md text-[var(--text-primary)]">
                  {d.dashboard.promptTitle}
                </h2>
                <p className="mt-1 text-body-sm text-[var(--text-secondary)]">
                  {d.dashboard.promptSubtitle}
                </p>
              </div>
            </div>

            <DashboardPrompt dict={d} />

            <div>
              <h3 className="text-caption uppercase tracking-[0.1em] text-[var(--text-muted)]">
                {d.dashboard.tipsTitle}
              </h3>
              <ul className="mt-3 space-y-2">
                {d.dashboard.tips.map((tip) => (
                  <li
                    key={tip}
                    className="text-body-sm text-[var(--text-secondary)] flex items-start gap-2"
                  >
                    <span
                      aria-hidden
                      className="mt-[9px] inline-block h-1 w-1 rounded-full bg-[var(--brand-violet)] shrink-0"
                    />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </Reveal>

        {/* Recent runs */}
        <Reveal delay={1}>
          <Card interactive className="flex flex-col gap-4 h-full">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-heading-md text-[var(--text-primary)]">
                {d.dashboard.recentTitle}
              </h2>
            </div>
            <ul className="flex flex-col divide-y divide-[var(--border)]">
              {d.dashboard.recentItems.map((r) => (
                <li
                  key={r.prompt}
                  className="py-3 first:pt-0 last:pb-0 flex items-start gap-3"
                >
                  <span
                    aria-hidden
                    className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] border border-[var(--border-strong)] text-[var(--brand-violet)]"
                  >
                    <SparkleIcon width={14} height={14} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-body-sm text-[var(--text-primary)] line-clamp-2">
                      {r.prompt}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-caption text-[var(--text-muted)]">
                      <span>{r.style}</span>
                      <span aria-hidden>·</span>
                      <span>{r.time}</span>
                    </div>
                  </div>
                  <ArrowUpRightIcon
                    width={16}
                    height={16}
                    className="mt-2 text-[var(--text-muted)] shrink-0"
                  />
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
