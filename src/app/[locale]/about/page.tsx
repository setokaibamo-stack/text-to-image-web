import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/cta";
import { Card, Section, SectionHeader } from "@/components/section";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale);
  return { title: d.about.eyebrow };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const d = getDictionary(l);

  return (
    <>
      <Section>
        <div className="max-w-3xl">
          <span className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)]">
            {d.about.eyebrow}
          </span>
          <h1 className="mt-3 text-display-lg text-[var(--text-primary)]">
            {d.about.title}
          </h1>
          <p className="mt-6 text-body-lg text-[var(--text-secondary)]">
            {d.about.body}
          </p>
        </div>

        <div className="mt-10 sm:mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: d.about.visionTitle, b: d.about.visionBody },
            { t: d.about.missionTitle, b: d.about.missionBody },
            { t: d.about.philosophyTitle, b: d.about.philosophyBody },
          ].map((x) => (
            <Card key={x.t}>
              <h3 className="text-heading-md text-[var(--text-primary)]">
                {x.t}
              </h3>
              <p className="mt-3 text-body-md text-[var(--text-secondary)]">
                {x.b}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="subtle">
        <SectionHeader
          eyebrow={d.about.statsTitle}
          title={d.about.methodTitle}
          subtitle={d.about.methodBody}
        />
        <dl className="mt-10 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {d.about.stats.map((s) => (
            <div
              key={s.label}
              className="p-5 sm:p-6 rounded-[var(--radius-lg)] bg-[var(--bg-elevated)] border border-[var(--border)]"
            >
              <dt className="text-caption uppercase tracking-[0.12em] text-[var(--text-muted)]">
                {s.label}
              </dt>
              <dd className="mt-2 text-heading-lg sm:text-display-lg text-[var(--text-primary)] ltr-nums">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section>
        <SectionHeader title={d.about.teamTitle} />
        <ul className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
          {d.about.team.map((p) => (
            <Card as="li" key={p.name} className="text-center">
              <div
                aria-hidden
                className="mx-auto h-20 w-20 rounded-[var(--radius-full)] bg-[var(--bg-subtle)] border border-[var(--border)] flex items-center justify-center text-heading-md text-[var(--text-primary)]"
              >
                {p.name
                  .split(" ")
                  .map((x) => x[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <h3 className="mt-4 text-heading-md text-[var(--text-primary)]">
                {p.name}
              </h3>
              <p className="mt-1 text-body-sm text-[var(--text-secondary)]">
                {p.role}
              </p>
            </Card>
          ))}
        </ul>
      </Section>

      <CTASection locale={l} dict={d} />
    </>
  );
}
