import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Background } from "@/components/background";
import { CTASection } from "@/components/cta";
import { Reveal } from "@/components/reveal";
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
      <Section className="overflow-hidden">
        <Background variant="section" />
        <Reveal>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/[0.04] px-3 py-1 text-caption uppercase tracking-[0.14em] text-[var(--text-secondary)] w-fit">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--gradient-brand)" }} />
              {d.about.eyebrow}
            </span>
            <h1 className="mt-4 text-display-xl text-[var(--text-primary)] text-balance">
              {d.about.title}
            </h1>
            <p className="mt-6 text-body-lg text-[var(--text-secondary)] text-pretty">
              {d.about.body}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: d.about.visionTitle, b: d.about.visionBody },
            { t: d.about.missionTitle, b: d.about.missionBody },
            { t: d.about.philosophyTitle, b: d.about.philosophyBody },
          ].map((x, i) => (
            <Reveal key={x.t} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <Card interactive className="h-full">
                <h3 className="text-heading-md text-[var(--text-primary)]">
                  {x.t}
                </h3>
                <p className="mt-3 text-body-md text-[var(--text-secondary)]">
                  {x.b}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="subtle" className="overflow-hidden">
        <Background variant="section" />
        <Reveal>
          <SectionHeader
            eyebrow={d.about.statsTitle}
            title={d.about.methodTitle}
            subtitle={d.about.methodBody}
          />
        </Reveal>
        <dl className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {d.about.stats.map((s, i) => (
            <Reveal key={s.label} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <div className="card-glow p-5 sm:p-6 h-full">
                <dt className="text-caption uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  {s.label}
                </dt>
                <dd className="mt-2 text-display-md text-gradient-brand font-bold ltr-nums">
                  {s.value}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Section>

      <Section className="overflow-hidden">
        <Background variant="section" />
        <Reveal>
          <SectionHeader title={d.about.teamTitle} />
        </Reveal>
        <ul className="mt-10 grid gap-5 grid-cols-2 lg:grid-cols-4">
          {d.about.team.map((p, i) => (
            <Reveal as="li" key={p.name} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
            <Card interactive className="text-center h-full">
              <div
                aria-hidden
                className="mx-auto h-20 w-20 rounded-full flex items-center justify-center text-heading-md text-white"
                style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-glow-purple)" }}
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
            </Reveal>
          ))}
        </ul>
      </Section>

      <CTASection locale={l} dict={d} />
    </>
  );
}
