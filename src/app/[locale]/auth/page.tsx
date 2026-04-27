import { notFound } from "next/navigation";
import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
import { Background } from "@/components/background";
import { SparkleIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function AuthPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const d = getDictionary(l);

  return (
    <section className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden">
      <Background variant="hero" />

      <div className="container-page relative pt-12 sm:pt-20 pb-20 sm:pb-28">
        <Reveal as="div" className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/[0.04] px-3 py-1 text-caption uppercase tracking-[0.14em] text-[var(--text-secondary)] backdrop-blur">
            <SparkleIcon width={14} height={14} className="text-[var(--brand-violet)]" />
            <span>{d.auth.eyebrow}</span>
          </span>
          <h1 className="text-display-lg text-balance">
            <span className="text-[var(--text-primary)]">{d.auth.title} </span>
            <span className="text-gradient-brand">{d.auth.titleAccent}</span>
          </h1>
          <p className="text-body-md text-[var(--text-secondary)] max-w-[55ch] text-pretty">
            {d.auth.subtitle}
          </p>
        </Reveal>

        <Reveal delay={1} className="mt-10 sm:mt-12">
          <AuthForm locale={l} dict={d} />
        </Reveal>

        <div className="mt-10 flex justify-center">
          <Link
            href={`/${l}/welcome`}
            className="inline-flex items-center gap-2 text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <span aria-hidden className="rtl-flip">←</span>
            {d.auth.backCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
