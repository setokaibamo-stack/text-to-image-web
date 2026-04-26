import { headers } from "next/headers";
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
    <Section>
      <div className="max-w-xl mx-auto text-center">
        <div className="text-[clamp(80px,12vw,140px)] font-semibold tracking-[-0.04em] text-[var(--text-primary)] leading-none ltr-nums">
          {d.notFound.code}
        </div>
        <h1 className="mt-4 text-heading-lg text-[var(--text-primary)]">
          {d.notFound.title}
        </h1>
        <p className="mt-4 text-body-lg text-[var(--text-secondary)]">
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
