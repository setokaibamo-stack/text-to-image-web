import { notFound } from "next/navigation";
import { Background } from "@/components/background";
import { Button } from "@/components/button";
import { Counter } from "@/components/counter";
import { FAQAccordion } from "@/components/faq";
import {
  ArrowRightIcon,
  CheckIcon,
  GlobeIcon,
  LayersIcon,
  LightningIcon,
  LockIcon,
  PlayIcon,
  SparkleIcon,
  WandIcon,
} from "@/components/icons";
import { Marquee } from "@/components/marquee";
import { PhoneMockup } from "@/components/phone-mockup";
import { Pricing } from "@/components/pricing";
import { PromptInput } from "@/components/prompt-input";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeader } from "@/components/section";
import { Typewriter } from "@/components/typewriter";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { ReactNode } from "react";

const FEATURE_ICONS: Record<string, ReactNode> = {
  spark: <SparkleIcon width={20} height={20} />,
  lock: <LockIcon width={20} height={20} />,
  lightning: <LightningIcon width={20} height={20} />,
  globe: <GlobeIcon width={20} height={20} />,
  layers: <LayersIcon width={20} height={20} />,
  wand: <WandIcon width={20} height={20} />,
};

export default async function HomePage({
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
    <>
      {/* ==================== HERO ==================== */}
      <section className="relative isolate">
        <Background variant="hero" />

        <div className="container-page relative pt-16 sm:pt-24 md:pt-32 pb-20 sm:pb-24 md:pb-32">
          <Reveal as="div" className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
            {/* Eyebrow chip */}
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/[0.04] px-3 py-1 text-caption uppercase tracking-[0.14em] text-[var(--text-secondary)] backdrop-blur">
              <SparkleIcon width={14} height={14} className="text-[var(--brand-violet)]" />
              <span>{d.hero.eyebrow}</span>
            </span>

            <h1 className="text-display-2xl text-balance">
              <span className="text-[var(--text-primary)]">{splitTitle(d.hero.title)[0]} </span>
              <span className="text-gradient-brand">{splitTitle(d.hero.title)[1]}</span>
            </h1>

            <p className="text-body-lg text-[var(--text-secondary)] max-w-[60ch] text-pretty">
              {d.hero.subtitle}
            </p>

            <div className="mt-2 flex items-center gap-3 flex-wrap justify-center">
              <Button
                href={`/${l}/launch`}
                size="lg"
                iconRight={<ArrowRightIcon width={16} height={16} />}
              >
                {d.hero.primaryCta}
              </Button>
              <Button
                href={`/${l}/dashboard`}
                variant="secondary"
                size="lg"
                icon={<PlayIcon width={14} height={14} />}
              >
                {d.hero.secondaryCta}
              </Button>
            </div>
          </Reveal>

          {/* Prompt input + chips */}
          <Reveal delay={2} className="mt-12 sm:mt-14 flex flex-col items-center gap-5">
            <PromptInput dict={d} locale={l} />
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl">
              {d.home.examples.map((ex) => (
                <span
                  key={ex}
                  className="rounded-full border border-[var(--border-strong)] bg-white/[0.03] px-3 py-1 text-caption text-[var(--text-secondary)] hover:border-[var(--brand-violet)] hover:text-[var(--text-primary)] transition-colors"
                >
                  {ex}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Code box / typewriter */}
          <Reveal delay={3} className="mt-14 max-w-3xl mx-auto">
            <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-strong)] glass-strong p-1 shadow-[var(--shadow-glow-mix)]">
              <div className="rounded-[calc(var(--radius-xl)-4px)] bg-black/40 p-5 sm:p-6">
                <div className="flex items-center gap-1.5 pb-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                  <span className="ms-3 font-mono text-[11px] text-[var(--text-muted)]">
                    text-to-image · prompt
                  </span>
                </div>
                <pre className="font-mono text-body-sm text-[var(--text-secondary)] whitespace-pre-wrap break-words min-h-[5.5rem]">
                  <span className="text-emerald-400">$</span>{" "}
                  <span className="text-[var(--brand-violet)]">generate</span>{" "}
                  <span className="text-cyan-400">--prompt</span>{" "}
                  <span className="text-[var(--text-primary)]">&quot;</span>
                  <Typewriter
                    phrases={d.home.codeLines}
                    className="text-[var(--text-primary)]"
                  />
                  <span className="text-[var(--text-primary)]">&quot;</span>
                </pre>
              </div>
            </div>
          </Reveal>

          {/* Metrics counter row */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto text-center">
            {d.home.metrics.map((m, i) => (
              <Reveal key={m.label} delay={(i + 1) as 1 | 2 | 3 | 4}>
                <div className="text-display-lg text-gradient-brand font-bold">
                  <Counter
                    to={m.value}
                    decimals={m.decimals ?? 0}
                    suffix={m.suffix ?? ""}
                  />
                </div>
                <div className="mt-1 text-caption uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  {m.label}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURES ==================== */}
      <Section id="features" className="overflow-hidden">
        <Background variant="section" />
        <Reveal>
          <SectionHeader
            eyebrow={d.home.featuresEyebrow}
            title={d.home.featuresTitle}
            subtitle={d.home.featuresSubtitle}
            align="center"
          />
        </Reveal>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {d.home.features.map((f, i) => (
            <Reveal as="li" key={f.title} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <div className="card-glow p-7 h-full flex flex-col gap-4">
                <span
                  aria-hidden
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white"
                  style={{
                    background: "var(--gradient-brand-soft)",
                    color: "#c4b5fd",
                  }}
                >
                  {FEATURE_ICONS[f.icon] ?? FEATURE_ICONS.spark}
                </span>
                <h3 className="text-heading-md text-[var(--text-primary)]">
                  {f.title}
                </h3>
                <p className="text-body-md text-[var(--text-secondary)]">
                  {f.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ==================== PHONE SHOWCASE ==================== */}
      <Section id="showcase" className="overflow-hidden">
        <Background variant="section" />
        <Reveal>
          <SectionHeader
            eyebrow={d.home.phoneShowcaseEyebrow}
            title={d.home.phoneShowcaseTitle}
            subtitle={d.home.phoneShowcaseSubtitle}
            align="center"
          />
        </Reveal>
        <div className="mt-16 grid gap-12 lg:gap-6 md:grid-cols-3 items-center">
          <Reveal delay={1} className="flex justify-center">
            <PhoneMockup
              variant="generator"
              tilt={-1}
              labels={d.home.phoneLabels}
            />
          </Reveal>
          <Reveal delay={2} className="flex justify-center md:-translate-y-6">
            <PhoneMockup
              variant="gallery"
              tilt={0}
              labels={d.home.phoneLabels}
            />
          </Reveal>
          <Reveal delay={3} className="flex justify-center">
            <PhoneMockup
              variant="settings"
              tilt={1}
              labels={d.home.phoneLabels}
            />
          </Reveal>
        </div>
      </Section>

      {/* ==================== PROCESS ==================== */}
      <Section id="process" className="overflow-hidden">
        <Background variant="section" />
        <Reveal>
          <SectionHeader
            eyebrow={d.process.eyebrow}
            title={d.process.title}
            subtitle={d.process.subtitle}
            align="center"
          />
        </Reveal>
        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 relative">
          {d.process.steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <div className="card-glow p-6 h-full">
                <div
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white text-body-sm font-bold ltr-nums"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-4 text-heading-md text-[var(--text-primary)]">
                  {s.title}
                </h3>
                <p className="mt-2 text-body-md text-[var(--text-secondary)]">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ==================== PRICING ==================== */}
      <Section id="pricing" className="overflow-hidden">
        <Background variant="section" />
        <Reveal>
          <SectionHeader
            eyebrow={d.home.pricing.eyebrow}
            title={d.home.pricing.title}
            subtitle={d.home.pricing.subtitle}
            align="center"
          />
        </Reveal>
        <div className="mt-12">
          <Pricing
            tiers={d.home.pricing.tiers}
            ctaHref={`/${l}/launch`}
            strings={{
              monthly: d.home.pricing.monthly,
              annual: d.home.pricing.annual,
              saveBadge: d.home.pricing.saveBadge,
              perMonth: d.home.pricing.perMonth,
              billedAnnually: d.home.pricing.billedAnnually,
              popular: d.home.pricing.popular,
            }}
          />
        </div>
      </Section>

      {/* ==================== TESTIMONIALS MARQUEE ==================== */}
      <section className="relative overflow-hidden py-20 sm:py-24 md:py-28">
        <Background variant="section" />
        <div className="container-page relative">
          <Reveal>
            <SectionHeader
              eyebrow={d.testimonials.eyebrow}
              title={d.testimonials.title}
              subtitle={d.testimonials.subtitle}
              align="center"
            />
          </Reveal>
        </div>
        <div className="relative mt-12 flex flex-col gap-5">
          <Marquee rtl={isRtl}>
            {d.home.marquee.map((q, i) => (
              <TestimonialCard key={i} quote={q.quote} name={q.name} role={q.role} />
            ))}
          </Marquee>
          <Marquee rtl={!isRtl}>
            {d.home.marquee
              .slice()
              .reverse()
              .map((q, i) => (
                <TestimonialCard
                  key={i}
                  quote={q.quote}
                  name={q.name}
                  role={q.role}
                />
              ))}
          </Marquee>
        </div>
      </section>

      {/* ==================== ABOUT PREVIEW ==================== */}
      <Section id="about" className="overflow-hidden">
        <Background variant="section" />
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/[0.03] px-3 py-1 text-caption uppercase tracking-[0.14em] text-[var(--text-secondary)] w-fit">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--gradient-brand)" }}
              />
              {d.about.eyebrow}
            </span>
            <h2 className="mt-3 text-display-lg text-[var(--text-primary)] text-balance">
              {d.about.title}
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="text-body-lg text-[var(--text-secondary)] max-w-[60ch] text-pretty">
              {d.about.body}
            </p>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: d.about.visionTitle, b: d.about.visionBody },
            { t: d.about.missionTitle, b: d.about.missionBody },
            { t: d.about.philosophyTitle, b: d.about.philosophyBody },
          ].map((x, i) => (
            <Reveal key={x.t} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <div className="card-glow p-6 h-full">
                <h3 className="text-heading-md text-[var(--text-primary)]">
                  {x.t}
                </h3>
                <p className="mt-3 text-body-md text-[var(--text-secondary)]">
                  {x.b}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10">
          <Button
            href={`/${l}/about`}
            variant="secondary"
            iconRight={<ArrowRightIcon width={16} height={16} />}
          >
            {d.common.learnMore}
          </Button>
        </Reveal>
      </Section>

      {/* ==================== WHY US (concise grid) ==================== */}
      <Section id="why" className="overflow-hidden">
        <Background variant="section" />
        <Reveal>
          <SectionHeader
            eyebrow={d.why.eyebrow}
            title={d.why.title}
            subtitle={d.why.subtitle}
            align="center"
          />
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {d.why.items.map((it, i) => (
            <Reveal as="li" key={it.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <div className="card-glow p-6 h-full flex flex-col gap-3">
                <span
                  aria-hidden
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  <CheckIcon width={16} height={16} />
                </span>
                <h3 className="text-heading-md text-[var(--text-primary)]">
                  {it.title}
                </h3>
                <p className="text-body-md text-[var(--text-secondary)]">
                  {it.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ==================== FAQ ==================== */}
      <Section id="faq" className="overflow-hidden">
        <Background variant="section" />
        <div className="grid gap-10 lg:gap-12 lg:grid-cols-[1fr_1.5fr]">
          <Reveal>
            <SectionHeader
              eyebrow={d.faq.eyebrow}
              title={d.faq.title}
              subtitle={d.faq.subtitle}
            />
          </Reveal>
          <Reveal delay={1}>
            <FAQAccordion items={d.faq.items} />
          </Reveal>
        </div>
      </Section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="relative">
        <div className="container-page py-20 md:py-28">
          <Reveal>
            <div className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--border-strong)] glass-strong px-6 sm:px-10 py-14 sm:py-20 md:px-16 md:py-24 text-center glow-pulse">
              <div
                aria-hidden
                className="orb orb-purple orb-anim-1 -top-24 left-[10%] h-[400px] w-[400px] opacity-60"
              />
              <div
                aria-hidden
                className="orb orb-blue orb-anim-2 -bottom-24 right-[10%] h-[400px] w-[400px] opacity-60"
              />
              <div aria-hidden className="bg-grid-overlay opacity-60" />

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/[0.04] px-3 py-1 text-caption uppercase tracking-[0.14em] text-[var(--text-secondary)] backdrop-blur">
                  <SparkleIcon width={14} height={14} className="text-[var(--brand-violet)]" />
                  {d.home.finalCta.eyebrow}
                </span>
                <h2 className="mt-5 text-display-xl text-[var(--text-primary)] mx-auto max-w-[22ch] text-balance">
                  {d.home.finalCta.title}
                </h2>
                <p className="mt-4 text-body-lg text-[var(--text-secondary)] max-w-[54ch] mx-auto text-pretty">
                  {d.home.finalCta.body}
                </p>
                <div className="mt-9 flex items-center justify-center gap-3 flex-wrap">
                  <Button
                    href={`/${l}/launch`}
                    size="lg"
                    iconRight={<ArrowRightIcon width={16} height={16} />}
                  >
                    {d.home.finalCta.primary}
                  </Button>
                  <Button href={`/${l}#pricing`} variant="secondary" size="lg">
                    {d.home.finalCta.secondary}
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function TestimonialCard({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role: string;
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <figure className="w-[320px] sm:w-[360px] shrink-0 rounded-[var(--radius-xl)] border border-[var(--border-strong)] glass p-6 flex flex-col gap-4">
      <blockquote className="text-body-md text-[var(--text-primary)] text-pretty">
        “{quote}”
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <span
          aria-hidden
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white text-body-sm font-semibold"
          style={{ background: "var(--gradient-brand)" }}
        >
          {initials}
        </span>
        <div>
          <div className="text-body-sm text-[var(--text-primary)]">{name}</div>
          <div className="text-caption text-[var(--text-muted)]">{role}</div>
        </div>
      </figcaption>
    </figure>
  );
}

/**
 * Splits the hero title at the last word so we can render the tail in a
 * gradient. Falls back gracefully for short titles.
 */
function splitTitle(title: string): [string, string] {
  const parts = title.trim().split(" ");
  if (parts.length < 4) return [title, ""];
  const tail = parts.slice(-2).join(" ");
  const head = parts.slice(0, -2).join(" ");
  return [head, tail];
}
