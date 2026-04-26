import Link from "next/link";
import { Button } from "@/components/button";
import { CTASection } from "@/components/cta";
import { ContactForm } from "@/components/contact-form";
import { FAQAccordion } from "@/components/faq";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  SparkleIcon,
  StarIcon,
} from "@/components/icons";
import { ProjectThumb } from "@/components/project-thumb";
import { PromptInput } from "@/components/prompt-input";
import { Badge, Card, Section, SectionHeader } from "@/components/section";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";

export default async function HomePage({
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
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 grid-dots opacity-70 pointer-events-none"
        />
        <div className="container-page relative pt-16 md:pt-24 pb-20 md:pb-28">
          <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
            <Badge>
              <SparkleIcon width={14} height={14} />
              <span>{d.hero.eyebrow}</span>
            </Badge>
            <h1 className="text-display-xl text-[var(--text-primary)]">
              {d.hero.title}
            </h1>
            <p className="text-body-lg text-[var(--text-secondary)] max-w-[56ch]">
              {d.hero.subtitle}
            </p>
            <div className="mt-2 flex items-center gap-3 flex-wrap justify-center">
              <Button
                href={`/${l}/contact`}
                size="lg"
                iconRight={<ArrowRightIcon width={16} height={16} />}
              >
                {d.hero.primaryCta}
              </Button>
              <Button href={`/${l}/portfolio`} variant="secondary" size="lg">
                {d.hero.secondaryCta}
              </Button>
            </div>
          </div>

          <div className="mt-14 flex justify-center">
            <PromptInput dict={d} />
          </div>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto text-center">
            {d.about.stats.map((s) => (
              <div key={s.label}>
                <div className="text-heading-lg text-[var(--text-primary)]">
                  {s.value}
                </div>
                <div className="mt-1 text-caption uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <Section tone="subtle" id="why">
        <SectionHeader
          eyebrow={d.why.eyebrow}
          title={d.why.title}
          subtitle={d.why.subtitle}
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {d.why.items.map((it) => (
            <Card
              key={it.title}
              as="li"
              interactive
              className="flex flex-col gap-3"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-full)] bg-[var(--accent)] text-[var(--accent-fg)]">
                <CheckIcon width={16} height={16} />
              </span>
              <h3 className="text-heading-md text-[var(--text-primary)]">
                {it.title}
              </h3>
              <p className="text-body-md text-[var(--text-secondary)]">
                {it.body}
              </p>
            </Card>
          ))}
        </ul>
      </Section>

      {/* Portfolio preview */}
      <Section id="work">
        <SectionHeader
          eyebrow={d.portfolio.eyebrow}
          title={d.portfolio.title}
          subtitle={d.portfolio.subtitle}
          action={
            <Button
              href={`/${l}/portfolio`}
              variant="secondary"
              size="md"
              iconRight={<ArrowUpRightIcon width={16} height={16} />}
            >
              {d.portfolio.viewAll}
            </Button>
          }
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {d.portfolio.items.slice(0, 6).map((p) => (
            <li key={p.slug}>
              <Link
                href={`/${l}/portfolio/${p.slug}`}
                className="group block"
              >
                <ProjectThumb item={p} />
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
                    className="mt-2 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* About preview */}
      <Section tone="subtle" id="about">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
          <div>
            <span className="text-caption uppercase tracking-[0.14em] text-[var(--text-muted)]">
              {d.about.eyebrow}
            </span>
            <h2 className="mt-3 text-display-lg text-[var(--text-primary)]">
              {d.about.title}
            </h2>
          </div>
          <p className="text-body-lg text-[var(--text-secondary)] max-w-[60ch]">
            {d.about.body}
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { t: d.about.visionTitle, b: d.about.visionBody },
            { t: d.about.missionTitle, b: d.about.missionBody },
            { t: d.about.philosophyTitle, b: d.about.philosophyBody },
          ].map((x) => (
            <Card key={x.t}>
              <h3 className="text-heading-md text-[var(--text-primary)]">
                {x.t}
              </h3>
              <p className="mt-3 text-body-md text-[var(--text-secondary)]">
                {x.b}
              </p>
            </Card>
          ))}
        </div>
        <div className="mt-10">
          <Button
            href={`/${l}/about`}
            variant="secondary"
            iconRight={<ArrowRightIcon width={16} height={16} />}
          >
            {d.common.learnMore}
          </Button>
        </div>
      </Section>

      {/* Process */}
      <Section id="process">
        <SectionHeader
          eyebrow={d.process.eyebrow}
          title={d.process.title}
          subtitle={d.process.subtitle}
        />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {d.process.steps.map((s) => (
            <li
              key={s.n}
              className="p-6 rounded-[var(--radius-lg)] bg-[var(--bg-elevated)] border border-[var(--border)]"
            >
              <div className="text-caption text-[var(--text-muted)] ltr-nums">
                {s.n}
              </div>
              <h3 className="mt-2 text-heading-md text-[var(--text-primary)]">
                {s.title}
              </h3>
              <p className="mt-2 text-body-md text-[var(--text-secondary)]">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Testimonials */}
      <Section tone="subtle" id="testimonials">
        <SectionHeader
          eyebrow={d.testimonials.eyebrow}
          title={d.testimonials.title}
          subtitle={d.testimonials.subtitle}
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {d.testimonials.items.map((t) => (
            <Card as="li" key={t.name} className="flex flex-col gap-5">
              <div className="flex items-center gap-0.5 text-[var(--text-primary)]">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <StarIcon key={i} width={16} height={16} />
                ))}
              </div>
              <blockquote className="text-body-lg text-[var(--text-primary)]">
                “{t.quote}”
              </blockquote>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-full)] bg-[var(--accent)] text-[var(--accent-fg)] text-body-sm font-semibold"
                >
                  {t.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                </span>
                <div>
                  <div className="text-body-sm text-[var(--text-primary)]">
                    {t.name}
                  </div>
                  <div className="text-caption text-[var(--text-muted)]">
                    {t.role}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </ul>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <SectionHeader
            eyebrow={d.faq.eyebrow}
            title={d.faq.title}
            subtitle={d.faq.subtitle}
          />
          <FAQAccordion items={d.faq.items} />
        </div>
      </Section>

      {/* Contact */}
      <Section tone="subtle" id="contact">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeader
              eyebrow={d.contact.eyebrow}
              title={d.contact.title}
              subtitle={d.contact.subtitle}
            />
            <dl className="mt-8 space-y-4 text-body-md">
              <ContactInfo label={d.contact.info.emailLabel} value={d.contact.info.email} href={`mailto:${d.contact.info.email}`} />
              <ContactInfo label={d.contact.info.phoneLabel} value={d.contact.info.phone} href={`tel:${d.contact.info.phone.replace(/\s/g, "")}`} />
              <ContactInfo label={d.contact.info.addressLabel} value={d.contact.info.address} />
              <ContactInfo label={d.contact.info.hoursLabel} value={d.contact.info.hours} />
            </dl>
          </div>
          <Card>
            <ContactForm dict={d} />
          </Card>
        </div>
      </Section>

      <CTASection locale={l} dict={d} />
    </>
  );
}

function ContactInfo({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-4 border-b border-[var(--border)] pb-4">
      <dt className="w-16 shrink-0 text-caption uppercase tracking-[0.12em] text-[var(--text-muted)] pt-1">
        {label}
      </dt>
      <dd className="text-body-md text-[var(--text-primary)]">
        {href ? (
          <a href={href} className="hover:underline underline-offset-4">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
