import { headers } from "next/headers";
import Link from "next/link";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function NotFound() {
  // A completely unmatched path (e.g. /ar/<unknown>) falls back here rather
  // than to [locale]/not-found.tsx, so resolve the active locale from the
  // x-locale header that middleware sets. Fall back to defaultLocale only
  // when the header is absent or invalid.
  const h = await headers();
  const headerLocale = h.get("x-locale");
  const l: Locale =
    headerLocale && isLocale(headerLocale) ? headerLocale : defaultLocale;
  const d = getDictionary(l);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <div className="text-[clamp(80px,12vw,140px)] font-semibold tracking-[-0.04em] text-[var(--text-primary)] leading-none">
          {d.notFound.code}
        </div>
        <h1 className="mt-4 text-heading-lg text-[var(--text-primary)]">
          {d.notFound.title}
        </h1>
        <p className="mt-4 text-body-lg text-[var(--text-secondary)]">
          {d.notFound.body}
        </p>
        <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
          <Link
            href={`/${l}`}
            className="inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--accent)] text-[var(--accent-fg)] px-5 py-3 text-body-sm font-semibold"
          >
            {d.notFound.cta}
          </Link>
          <Link
            href={`/${l}/dashboard`}
            className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] px-5 py-3 text-body-sm font-semibold text-[var(--text-primary)]"
          >
            {d.notFound.secondary}
          </Link>
        </div>
      </div>
    </div>
  );
}
