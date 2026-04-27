import { notFound } from "next/navigation";
import { Background } from "@/components/background";
import { Button } from "@/components/button";
import { ArrowRightIcon, SparkleIcon } from "@/components/icons";
import { PhoneMockup } from "@/components/phone-mockup";
import { Reveal } from "@/components/reveal";
import { Typewriter } from "@/components/typewriter";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function WelcomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const d = getDictionary(l);
  const isRtl = l === "ar";

  return (
    <section className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden">
      <Background variant="hero" />

      <div className="container-page relative pt-12 sm:pt-20 pb-32 sm:pb-36">
        <Reveal as="div" className="flex flex-col items-center text-center gap-5 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/[0.04] px-3 py-1 text-caption uppercase tracking-[0.14em] text-[var(--text-secondary)] backdrop-blur">
            <SparkleIcon width={14} height={14} className="text-[var(--brand-violet)]" />
            <span>{d.welcome.eyebrow}</span>
          </span>

          <h1 className="text-display-xl text-balance">
            <span className="text-[var(--text-primary)]">{d.welcome.title} </span>
            <span className="text-gradient-brand">{d.welcome.titleAccent}</span>
          </h1>

          <p className="text-body-lg text-[var(--text-secondary)] max-w-[60ch] text-pretty">
            {d.welcome.subtitle}
          </p>
        </Reveal>

        {/* Phone + code box, side by side on lg, stacked on mobile */}
        <div className="mt-12 sm:mt-16 grid items-center gap-10 lg:gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <Reveal delay={1} className="flex justify-center lg:justify-start">
            <PhoneMockup
              variant="generator"
              tilt={isRtl ? 1 : -1}
              labels={d.home.phoneLabels}
            />
          </Reveal>

          <Reveal delay={2} className="w-full">
            <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-strong)] glass-strong p-1 shadow-[var(--shadow-glow-mix)]">
              <div className="rounded-[calc(var(--radius-xl)-4px)] bg-black/40 p-5 sm:p-6">
                <div className="flex items-center gap-1.5 pb-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                  <span className="ms-3 font-mono text-[11px] text-[var(--text-muted)]">
                    text-to-image · {d.welcome.codeCaption}
                  </span>
                </div>
                <pre className="font-mono text-body-sm text-[var(--text-secondary)] whitespace-pre-wrap break-words min-h-[7rem]">
                  <span className="text-emerald-400">$</span>{" "}
                  <span className="text-[var(--brand-violet)]">generate</span>{" "}
                  <span className="text-cyan-400">--prompt</span>{" "}
                  <span className="text-[var(--text-primary)]">&quot;</span>
                  <Typewriter
                    phrases={d.welcome.codeLines}
                    className="text-[var(--text-primary)]"
                  />
                  <span className="text-[var(--text-primary)]">&quot;</span>
                </pre>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Continue — pinned to the trailing edge (bottom-right LTR, bottom-left RTL) */}
        <div className="mt-16 flex justify-end">
          <Reveal delay={3}>
            <Button
              href={`/${l}/auth`}
              size="lg"
              iconRight={
                <ArrowRightIcon
                  width={16}
                  height={16}
                  className="rtl:scale-x-[-1]"
                />
              }
            >
              {d.welcome.continueCta}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
