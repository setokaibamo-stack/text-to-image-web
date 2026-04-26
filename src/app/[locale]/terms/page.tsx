import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/section";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale);
  return { title: d.legal.terms.title };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);

  return (
    <Section>
      <div className="max-w-3xl">
        <h1 className="text-display-lg text-[var(--text-primary)]">
          {d.legal.terms.title}
        </h1>
        <p className="mt-2 text-caption text-[var(--text-muted)]">
          {d.legal.terms.updated}
        </p>
        <div className="mt-10 space-y-10">
          {d.legal.terms.sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-heading-md text-[var(--text-primary)]">{s.h}</h2>
              <p className="mt-3 text-body-md text-[var(--text-secondary)]">
                {s.p}
              </p>
            </section>
          ))}
        </div>
      </div>
    </Section>
  );
}
