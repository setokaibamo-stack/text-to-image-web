import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/cta";
import { Section } from "@/components/section";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function generateStaticParams() {
  const en = getDictionary("en");
  return locales.flatMap((locale) =>
    en.blog.posts.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale);
  const p = d.blog.posts.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.excerpt } : {};
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const d = getDictionary(l);
  const post = d.blog.posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <Section>
        <article className="max-w-3xl mx-auto">
          <Link
            href={`/${l}/blog`}
            className="text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            ← {d.blog.backToBlog}
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-caption text-[var(--text-muted)]">
            <span className="ltr-nums">{post.date}</span>
            <span aria-hidden>·</span>
            <span>
              <span className="ltr-nums">{post.minutes}</span> {d.blog.minutes}
            </span>
            <span aria-hidden>·</span>
            <span>{post.author}</span>
          </div>
          <h1 className="mt-4 text-display-lg text-[var(--text-primary)] text-balance">
            {post.title}
          </h1>
          <p className="mt-6 text-body-lg text-[var(--text-secondary)]">
            {post.excerpt}
          </p>
          <div className="mt-10 prose-none">
            <p className="text-body-lg text-[var(--text-primary)] whitespace-pre-line leading-[1.7]">
              {post.body}
            </p>
          </div>
        </article>
      </Section>
      <CTASection locale={l} dict={d} />
    </>
  );
}
