import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/button";
import { CTASection } from "@/components/cta";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { ProjectThumb } from "@/components/project-thumb";
import { Badge, Card, Section } from "@/components/section";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function generateStaticParams() {
  const en = getDictionary("en");
  return locales.flatMap((locale) =>
    en.portfolio.items.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale);
  const p = d.portfolio.items.find((x) => x.slug === slug);
  return p ? { title: p.name, description: p.tagline } : {};
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const d = getDictionary(l);
  const idx = d.portfolio.items.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();
  const project = d.portfolio.items[idx];
  const next = d.portfolio.items[(idx + 1) % d.portfolio.items.length];

  return (
    <>
      <Section>
        <div className="flex flex-col gap-6 max-w-3xl">
          <Link
            href={`/${l}/portfolio`}
            className="text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] inline-flex items-center gap-1"
          >
            ← {d.portfolio.title}
          </Link>
          <Badge>{project.category}</Badge>
          <h1 className="text-display-lg text-[var(--text-primary)]">
            {project.name}
          </h1>
          <p className="text-body-lg text-[var(--text-secondary)]">
            {project.tagline}
          </p>
        </div>

        <div className="mt-10">
          <ProjectThumb item={project} ratio="16/9" />
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="text-heading-lg text-[var(--text-primary)]">
              {d.portfolio.overview}
            </h2>
            <p className="mt-4 text-body-lg text-[var(--text-secondary)]">
              {project.body}
            </p>
          </div>
          <div className="space-y-6">
            <Card>
              <h3 className="text-heading-md text-[var(--text-primary)]">
                {d.portfolio.highlights}
              </h3>
              <ul className="mt-4 space-y-3">
                {project.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2 text-body-md text-[var(--text-secondary)]"
                  >
                    <CheckIcon
                      width={16}
                      height={16}
                      className="mt-1 text-[var(--text-primary)] shrink-0"
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <h3 className="text-heading-md text-[var(--text-primary)]">
                {d.portfolio.outcomes}
              </h3>
              <ul className="mt-4 space-y-3">
                {project.outcomes.map((o) => (
                  <li
                    key={o}
                    className="text-body-md text-[var(--text-primary)]"
                  >
                    {o}
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <h3 className="text-heading-md text-[var(--text-primary)]">
                {d.portfolio.stack}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <li
                    key={t}
                    className="text-body-sm text-[var(--text-secondary)] bg-[var(--bg-subtle)] border border-[var(--border)] rounded-[var(--radius-full)] px-3 py-1"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </Section>

      <Section tone="subtle">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <div className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)]">
              {d.portfolio.nextProject}
            </div>
            <h2 className="mt-2 text-heading-lg text-[var(--text-primary)]">
              {next.name}
            </h2>
          </div>
          <Button
            href={`/${l}/portfolio/${next.slug}`}
            variant="secondary"
            iconRight={<ArrowRightIcon width={16} height={16} />}
          >
            {d.portfolio.viewCase}
          </Button>
        </div>
        <div className="mt-8">
          <Link href={`/${l}/portfolio/${next.slug}`} className="block group">
            <ProjectThumb item={next} ratio="16/9" />
          </Link>
        </div>
      </Section>

      <CTASection locale={l} dict={d} />
    </>
  );
}
