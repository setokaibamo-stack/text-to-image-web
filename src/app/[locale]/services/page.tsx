import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/cta";
import { ArrowUpRightIcon } from "@/components/icons";
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
  return { title: d.services.title };
}

export default async function ServicesPage({
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
        <SectionHeader
          eyebrow={d.services.eyebrow}
          title={d.services.title}
          subtitle={d.services.subtitle}
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {d.services.items.map((s) => (
            <Card as="li" key={s.slug} interactive>
              <Link
                href={`/${l}/services/${s.slug}`}
                className="group flex flex-col gap-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-heading-lg text-[var(--text-primary)] group-hover:underline underline-offset-4 decoration-[var(--border-strong)]">
                    {s.title}
                  </h3>
                  <ArrowUpRightIcon
                    width={18}
                    height={18}
                    className="mt-2 text-[var(--text-muted)] group-hover:text-[var(--text-primary)]"
                  />
                </div>
                <p className="text-body-md text-[var(--text-secondary)]">
                  {s.tagline}
                </p>
                <p className="text-body-sm text-[var(--text-secondary)]">
                  {s.body}
                </p>
                <div className="flex items-center gap-3 flex-wrap pt-2">
                  <span className="text-caption uppercase tracking-[0.12em] text-[var(--text-muted)]">
                    {d.services.detail.timeline}:
                  </span>
                  <span className="text-body-sm text-[var(--text-primary)]">
                    {s.timeline}
                  </span>
                </div>
              </Link>
            </Card>
          ))}
        </ul>
      </Section>
      <CTASection locale={l} dict={d} />
    </>
  );
}
