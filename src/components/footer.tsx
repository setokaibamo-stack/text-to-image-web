import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from "./icons";
import { NewsletterForm } from "./newsletter-form";

export function Footer({ locale, dict }: { locale: Locale; dict: Dict }) {
  const year = new Date().getFullYear();

  const cols: { title: string; links: { href: string; label: string }[] }[] = [
    {
      title: dict.footer.product,
      links: [
        { href: `/${locale}/dashboard`, label: dict.nav.dashboard },
        { href: `/${locale}/launch`, label: dict.nav.startProject },
      ],
    },
    {
      title: dict.footer.company,
      links: [
        { href: `/${locale}/about`, label: dict.nav.about },
        { href: `/${locale}/blog`, label: dict.nav.blog },
      ],
    },
    {
      title: dict.footer.legal,
      links: [
        { href: `/${locale}/privacy`, label: dict.legal.privacy.title },
        { href: `/${locale}/terms`, label: dict.legal.terms.title },
      ],
    },
  ];

  return (
    <footer className="relative border-t border-[var(--border)] mt-24">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-violet)]/40 to-transparent" />
      <div className="container-page py-16">
        <div className="grid gap-12 md:gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="md:pr-6">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 font-semibold tracking-tight"
            >
              <span
                aria-hidden
                className="inline-flex h-8 w-8 items-center justify-center rounded-[10px] text-white text-[12px] font-bold shadow-[var(--shadow-glow-purple)]"
                style={{ background: "var(--gradient-brand)" }}
              >
                t→i
              </span>
              <span>{dict.brand.name}</span>
            </Link>
            <p className="mt-4 text-body-sm text-[var(--text-secondary)] max-w-[32ch]">
              {dict.brand.tagline}
            </p>

            <NewsletterForm
              label={dict.footer.subscribe}
              placeholder={dict.footer.subscribePh}
              cta={dict.footer.subscribeCta}
            />
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-caption uppercase tracking-[0.08em] text-[var(--text-muted)]">
                {c.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-caption text-[var(--text-muted)]">
            © {year} {dict.brand.name}. {dict.footer.rights}
          </p>
          <p className="text-caption text-[var(--text-muted)]">
            {dict.footer.madeWith}
          </p>
          <div className="flex items-center gap-2 text-[var(--text-secondary)]">
            {[
              {
                label: dict.social.twitter,
                href: "https://twitter.com",
                icon: <TwitterIcon width={16} height={16} />,
              },
              {
                label: dict.social.linkedin,
                href: "https://linkedin.com",
                icon: <LinkedInIcon width={16} height={16} />,
              },
              {
                label: dict.social.github,
                href: "https://github.com",
                icon: <GitHubIcon width={16} height={16} />,
              },
              {
                label: dict.social.instagram,
                href: "https://instagram.com",
                icon: <InstagramIcon width={16} height={16} />,
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-strong)] bg-white/[0.03] hover:border-[var(--brand-violet)] hover:text-[var(--text-primary)] hover:bg-white/[0.06] transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
