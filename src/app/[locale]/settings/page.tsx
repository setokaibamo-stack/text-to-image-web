import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Background } from "@/components/background";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { SettingsPanel } from "@/components/settings-panel";
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
  return { title: d.settings.title };
}

export default async function SettingsPage({
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

      <Reveal>
        <div className="flex flex-col gap-3 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/[0.04] px-3 py-1 text-caption uppercase tracking-[0.14em] text-[var(--text-secondary)] w-fit">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--gradient-brand)" }}
            />
            {d.settings.eyebrow}
          </span>
          <h1 className="text-display-lg text-[var(--text-primary)] text-balance">
            {d.settings.title}
          </h1>
          <p className="text-body-lg text-[var(--text-secondary)] max-w-[60ch] text-pretty">
            {d.settings.subtitle}
          </p>
        </div>
      </Reveal>

      <Reveal delay={1} className="mt-10 sm:mt-12 max-w-3xl">
        <SettingsPanel locale={l} dict={d} />
      </Reveal>

      <div className="mt-8 max-w-3xl">
        <Link
          href={`/${l}/dashboard`}
          className="inline-flex items-center gap-2 text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <span aria-hidden className="rtl-flip">
            ←
          </span>
          {d.settings.back}
        </Link>
      </div>
    </Section>
  );
}
