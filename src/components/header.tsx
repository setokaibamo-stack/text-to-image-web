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
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/blog`, label: dict.nav.blog },
    { href: `/${locale}/dashboard`, label: dict.nav.dashboard },
  ];

  const otherLocale: Locale = locale === "en" ? "ar" : "en";
  const localeHref = switchLocale(pathname, locale, otherLocale);
  const localeLabel = otherLocale === "ar" ? "العربية" : "English";

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled
          ? "border-b border-[var(--border)] bg-[var(--bg-glass-strong)] backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-[var(--bg-glass)] backdrop-blur-md"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href={`/${locale}`}
          className="group flex items-center gap-2.5 font-semibold tracking-tight text-[15px]"
        >
          <span
            aria-hidden
            className="relative inline-flex h-8 w-8 items-center justify-center rounded-[10px] text-[12px] font-bold text-white shadow-[var(--shadow-glow-purple)] transition-transform group-hover:scale-105"
            style={{ background: "var(--gradient-brand)" }}
          >
            t→i
          </span>
          <span className="text-[var(--text-primary)]">{dict.brand.name}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active =
              pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-body-sm px-3 py-2 rounded-full transition-colors ${
                  active
                    ? "text-[var(--text-primary)] bg-white/8"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={localeHref}
            className="hidden sm:inline-flex items-center gap-1.5 text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-3 py-2 rounded-full hover:bg-white/5 transition-colors"
            aria-label={`Switch to ${localeLabel}`}
            hrefLang={otherLocale}
          >
            <GlobeIcon width={16} height={16} />
            <span>{localeLabel}</span>
          </a>
          <Button
            href={`/${locale}/launch`}
            size="md"
            className="hidden md:inline-flex"
          >
            {dict.nav.startProject}
          </Button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/8 text-[var(--text-primary)]"
            aria-label={open ? dict.nav.close : dict.nav.menu}
            aria-expanded={open}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="md:hidden fixed inset-0 top-16 z-30 bg-[var(--bg-glass-strong)] backdrop-blur-xl backdrop-saturate-150 border-t border-[var(--border)] animate-[fadeIn_200ms_ease]">
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
              <a
                href={localeHref}
                className="inline-flex items-center gap-1.5 text-body-sm text-[var(--text-secondary)]"
                hrefLang={otherLocale}
              >
                <GlobeIcon width={16} height={16} />
                <span>{localeLabel}</span>
              </a>
              <Button
                href={`/${locale}/launch`}
                size="md"
                onClick={() => setOpen(false)}
              >
                {dict.nav.startProject}
              </Button>
            </div>
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
