import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Background } from "@/components/background";
import { CTASection } from "@/components/cta";
import { ArrowRightIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Card, Section, SectionHeader } from "@/components/section";
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
  return { title: d.blog.eyebrow };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const d = getDictionary(l);

  const [featured, ...rest] = d.blog.posts;

  return (
    <>
      <Section className="overflow-hidden">
        <Background variant="section" />
        <Reveal>
          <SectionHeader
            eyebrow={d.blog.eyebrow}
            title={d.blog.title}
            subtitle={d.blog.subtitle}
          />
        </Reveal>
        <Reveal delay={1}>
        <Link
          href={`/${l}/blog/${featured.slug}`}
          className="mt-12 block group card-glow p-6 sm:p-8 md:p-10"
        >
          <div className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-caption text-[var(--text-muted)]">
                <span className="ltr-nums">{featured.date}</span>
                <span aria-hidden>·</span>
                <span>
                  <span className="ltr-nums">{featured.minutes}</span> {d.blog.minutes}
                </span>
                <span aria-hidden>·</span>
                <span>{featured.author}</span>
              </div>
              <h2 className="mt-3 text-display-lg text-[var(--text-primary)] group-hover:underline underline-offset-4 decoration-[var(--border-strong)]">
                {featured.title}
              </h2>
              <p className="mt-4 text-body-lg text-[var(--text-secondary)] max-w-[60ch]">
                {featured.excerpt}
              </p>
            </div>
            <div className="flex md:justify-end">
              <span className="inline-flex items-center gap-2 text-body-sm text-[var(--text-primary)]">
                {d.blog.readMore}
                <ArrowRightIcon width={16} height={16} />
              </span>
            </div>
          </div>
        </Link>
        </Reveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
            <Card interactive className="h-full">
              <Link href={`/${l}/blog/${p.slug}`} className="flex flex-col gap-3">
                <div className="text-caption text-[var(--text-muted)]">
                  <span className="ltr-nums">{p.date}</span> · {p.author}
                </div>
                <h3 className="text-heading-md text-[var(--text-primary)]">
                  {p.title}
                </h3>
                <p className="text-body-sm text-[var(--text-secondary)]">
                  {p.excerpt}
                </p>
                <div className="mt-2 text-caption text-[var(--text-muted)]">
                  <span className="ltr-nums">{p.minutes}</span> {d.blog.minutes}
                </div>
              </Link>
            </Card>
            </Reveal>
          ))}
        </ul>
      </Section>
      <CTASection locale={l} dict={d} />
    </>
  );
}
