import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import { Button } from "./button";
import { ArrowRightIcon } from "./icons";

export function CTASection({ locale, dict }: { locale: Locale; dict: Dict }) {
  return (
    <section className="bg-[var(--bg-base)]">
      <div className="container-page py-20 md:py-24">
        <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg-elevated)] px-8 py-16 md:px-14 md:py-20 text-center">
          <div
            aria-hidden
            className="absolute inset-0 grid-dots opacity-40 pointer-events-none"
          />
          <div className="relative">
            <h2 className="text-display-lg text-[var(--text-primary)] mx-auto max-w-[22ch]">
              {dict.cta.title}
            </h2>
            <p className="mt-4 text-body-lg text-[var(--text-secondary)] max-w-[54ch] mx-auto">
              {dict.cta.body}
            </p>
            <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
              <Button href={`/${locale}/contact`} size="lg" iconRight={<ArrowRightIcon width={16} height={16} />}>
                {dict.cta.primary}
              </Button>
              <Button href={`/${locale}#faq`} variant="secondary" size="lg">
                {dict.cta.secondary}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
