import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/cta";
import { ArrowUpRightIcon } from "@/components/icons";
import { ProjectThumb } from "@/components/project-thumb";
import { Section, SectionHeader } from "@/components/section";
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
  return { title: d.portfolio.title };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const d = getDictionary(l);

  const categories = Array.from(new Set(d.portfolio.items.map((i) => i.category)));

  return (
    <>
      <Section>
        <SectionHeader
          eyebrow={d.portfolio.eyebrow}
          title={d.portfolio.title}
          subtitle={d.portfolio.subtitle}
        />
        <div className="mt-8 flex flex-wrap gap-2">
          <span className="text-body-sm px-3 py-1.5 rounded-[var(--radius-full)] bg-[var(--accent)] text-[var(--accent-fg)]">
            {d.portfolio.allCategories}
          </span>
          {categories.map((c) => (
            <span
              key={c}
              className="text-body-sm px-3 py-1.5 rounded-[var(--radius-full)] border border-[var(--border)] text-[var(--text-secondary)]"
            >
              {c}
            </span>
          ))}
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {d.portfolio.items.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/${l}/portfolio/${p.slug}`}
                className="group block"
              >
                <ProjectThumb item={p} ratio="16/10" />
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      {p.category}
                    </div>
                    <h3 className="mt-1 text-heading-md text-[var(--text-primary)] group-hover:underline underline-offset-4 decoration-[var(--border-strong)]">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-body-sm text-[var(--text-secondary)]">
                      {p.tagline}
                    </p>
                  </div>
                  <ArrowUpRightIcon
                    width={18}
                    height={18}
                    className="mt-2 text-[var(--text-muted)] group-hover:text-[var(--text-primary)]"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <CTASection locale={l} dict={d} />
    </>
  );
}
