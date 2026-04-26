"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import { Button } from "./button";
import { CloseIcon, GlobeIcon, MenuIcon } from "./icons";

export function Header({ locale, dict }: { locale: Locale; dict: Dict }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/portfolio`, label: dict.nav.portfolio },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/blog`, label: dict.nav.blog },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  const otherLocale: Locale = locale === "en" ? "ar" : "en";
  const localeHref = switchLocale(pathname, locale, otherLocale);
  const localeLabel = otherLocale === "ar" ? "العربية" : "English";

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled
          ? "bg-[var(--bg-base)]/90 backdrop-blur border-b border-[var(--border)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 font-semibold tracking-tight text-[15px]"
        >
          <span
            aria-hidden
            className="inline-flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--accent)] text-[var(--accent-fg)] text-[12px] font-bold"
          >
            t→i
          </span>
          <span className="text-[var(--text-primary)]">{dict.brand.name}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-body-sm px-3 py-2 rounded-[var(--radius-sm)] transition-colors ${
                  active
                    ? "text-[var(--text-primary)] bg-[var(--bg-subtle)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={localeHref}
            className="hidden sm:inline-flex items-center gap-1.5 text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-3 py-2 rounded-[var(--radius-sm)] hover:bg-[var(--bg-subtle)] transition-colors"
            aria-label={`Switch to ${localeLabel}`}
          >
            <GlobeIcon width={16} height={16} />
            <span>{localeLabel}</span>
          </Link>
          <Button
            href={`/${locale}/contact`}
            size="md"
            className="hidden md:inline-flex"
          >
            {dict.nav.startProject}
          </Button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-full)] hover:bg-[var(--bg-subtle)] text-[var(--text-primary)]"
            aria-label={open ? dict.nav.close : dict.nav.menu}
            aria-expanded={open}
          >
            {open ? <MenuIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="md:hidden fixed inset-0 top-16 z-30 bg-[var(--bg-base)] border-t border-[var(--border)] animate-[fadeIn_200ms_ease]">
          <div className="container-page py-6 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-body-lg py-3 border-b border-[var(--border)] text-[var(--text-primary)]"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-4">
              <Link
                href={localeHref}
                className="inline-flex items-center gap-1.5 text-body-sm text-[var(--text-secondary)]"
              >
                <GlobeIcon width={16} height={16} />
                <span>{localeLabel}</span>
              </Link>
              <Button href={`/${locale}/contact`} size="md" onClick={() => setOpen(false)}>
                {dict.nav.startProject}
              </Button>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="mt-6 self-end inline-flex items-center gap-1.5 text-body-sm text-[var(--text-muted)]"
            >
              <CloseIcon width={16} height={16} />
              {dict.nav.close}
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function switchLocale(pathname: string, current: Locale, next: Locale): string {
  if (!pathname) return `/${next}`;
  if (pathname === `/${current}`) return `/${next}`;
  if (pathname.startsWith(`/${current}/`)) {
    return `/${next}` + pathname.slice(`/${current}`.length);
  }
  return `/${next}`;
}
