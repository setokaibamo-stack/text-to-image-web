import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/button";
import { CTASection } from "@/components/cta";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { Badge, Card, Section } from "@/components/section";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function generateStaticParams() {
  const en = getDictionary("en");
  return locales.flatMap((locale) =>
    en.services.items.map((s) => ({ locale, slug: s.slug }))
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
  const s = d.services.items.find((x) => x.slug === slug);
  return s ? { title: s.title, description: s.tagline } : {};
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const d = getDictionary(l);
  const service = d.services.items.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = d.services.items.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <Section>
        <div className="flex flex-col gap-6 max-w-3xl">
          <Link
            href={`/${l}/services`}
            className="text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] inline-flex items-center gap-1"
          >
            ← {d.services.title}
          </Link>
          <Badge>{d.services.eyebrow}</Badge>
          <h1 className="text-display-lg text-[var(--text-primary)]">
            {service.title}
          </h1>
          <p className="text-body-lg text-[var(--text-secondary)]">
            {service.tagline}
          </p>
          <p className="text-body-md text-[var(--text-secondary)]">
            {service.body}
          </p>
          <div className="pt-2">
            <Button
              href={`/${l}/contact`}
              size="lg"
              iconRight={<ArrowRightIcon width={16} height={16} />}
            >
              {d.services.detail.nextStep}
            </Button>
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          <Card>
            <h3 className="text-heading-md text-[var(--text-primary)]">
              {d.services.detail.deliverables}
            </h3>
            <ul className="mt-4 space-y-3">
              {service.deliverables.map((x) => (
                <li
                  key={x}
                  className="flex items-start gap-2 text-body-md text-[var(--text-secondary)]"
                >
                  <CheckIcon
                    width={16}
                    height={16}
                    className="mt-1 text-[var(--text-primary)] shrink-0"
                  />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="text-heading-md text-[var(--text-primary)]">
              {d.services.detail.timeline}
            </h3>
            <p className="mt-4 text-heading-lg text-[var(--text-primary)]">
              {service.timeline}
            </p>
          </Card>
          <Card>
            <h3 className="text-heading-md text-[var(--text-primary)]">
              {d.services.detail.stack}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {service.stack.map((t) => (
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
      </Section>

      <Section tone="subtle">
        <h2 className="text-heading-lg text-[var(--text-primary)]">
          {d.services.viewAll}
        </h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {others.map((s) => (
            <Card as="li" key={s.slug} interactive>
              <Link href={`/${l}/services/${s.slug}`} className="block">
                <h3 className="text-heading-md text-[var(--text-primary)]">
                  {s.title}
                </h3>
                <p className="mt-2 text-body-sm text-[var(--text-secondary)]">
                  {s.tagline}
                </p>
              </Link>
            </Card>
          ))}
        </ul>
      </Section>

      <CTASection locale={l} dict={d} />
    </>
  );
}
