import { headers } from "next/headers";
import { Background } from "@/components/background";
import { Button } from "@/components/button";
import { ArrowRightIcon } from "@/components/icons";
import { Section } from "@/components/section";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function LocaleNotFound() {
  const h = await headers();
  const headerLocale = h.get("x-locale");
  const l: Locale =
    headerLocale && isLocale(headerLocale) ? headerLocale : defaultLocale;
  const d = getDictionary(l);

  return (
    <Section className="overflow-hidden">
      <Background variant="hero" />
      <div className="relative max-w-xl mx-auto text-center">
        <div className="text-[clamp(80px,14vw,180px)] font-bold tracking-[-0.04em] leading-none ltr-nums text-gradient-brand">
          {d.notFound.code}
        </div>
        <h1 className="mt-6 text-display-lg text-[var(--text-primary)]">
          {d.notFound.title}
        </h1>
        <p className="mt-4 text-body-lg text-[var(--text-secondary)] text-pretty">
          {d.notFound.body}
        </p>
        <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
          <Button href={`/${l}`} iconRight={<ArrowRightIcon width={16} height={16} />}>
            {d.notFound.cta}
          </Button>
          <Button href={`/${l}/dashboard`} variant="secondary">
            {d.notFound.secondary}
          </Button>
        </div>
      </div>
    </Section>
  );
}
