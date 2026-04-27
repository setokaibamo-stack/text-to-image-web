"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";
import { Button } from "./button";
import { CloseIcon, GlobeIcon, MenuIcon } from "./icons";

type Mode = "hidden" | "marketing" | "app";

const CHROMELESS = new Set(["/launch", "/welcome", "/auth"]);

function modeFor(pathname: string): Mode {
  const m = pathname.match(/^\/(?:en|ar)(\/.*)?$/);
  const rest = m ? m[1] || "/" : pathname || "/";
  if (CHROMELESS.has(rest)) return "hidden";
  if (rest === "/dashboard" || rest.startsWith("/dashboard/")) return "app";
  return "marketing";
}

export function Header({ locale, dict }: { locale: Locale; dict: Dict }) {
  const pathname = usePathname();
  const mode = useMemo(() => modeFor(pathname), [pathname]);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (mode === "hidden") return;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mode]);

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

  if (mode === "hidden") return null;

  const otherLocale: Locale = locale === "en" ? "ar" : "en";
  const localeHref = switchLocale(pathname, locale, otherLocale);
  const localeLabel = otherLocale === "ar" ? "العربية" : "English";

  // App mode: hamburger always visible (no top-nav links anyway).
  // Marketing: hamburger only on mobile.
  const hamburgerClass =
    mode === "app"
      ? "inline-flex"
      : "sm:hidden inline-flex";
  const drawerVisibility = mode === "app" ? "" : "sm:hidden";
  // Locale chip on header bar: marketing+desktop only. App mode hides it (locale lives in drawer).
  const localeChipClass =
    mode === "marketing"
      ? "hidden sm:inline-flex"
      : "hidden";

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
          href={`/${locale}${mode === "app" ? "/dashboard" : ""}`}
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

        <div className="flex items-center gap-2">
          <a
            href={localeHref}
            className={`${localeChipClass} items-center gap-1.5 text-body-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-3 py-2 rounded-full hover:bg-white/5 transition-colors`}
            aria-label={`Switch to ${localeLabel}`}
            hrefLang={otherLocale}
          >
            <GlobeIcon width={16} height={16} />
            <span>{localeLabel}</span>
          </a>
          {mode === "marketing" ? (
            <Button
              href={`/${locale}/auth`}
              size="md"
              className="hidden sm:inline-flex"
            >
              {dict.nav.signIn}
            </Button>
          ) : null}
          <button
            onClick={() => setOpen((v) => !v)}
            className={`${hamburgerClass} h-9 w-9 items-center justify-center rounded-full hover:bg-white/8 text-[var(--text-primary)]`}
            aria-label={open ? dict.nav.close : dict.nav.menu}
            aria-expanded={open}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          className={`${drawerVisibility} fixed inset-x-0 top-16 bottom-0 z-30 bg-[var(--bg-base)] border-t border-[var(--border)] animate-[fadeIn_200ms_ease] overflow-y-auto`}
        >
          <div className="container-page py-6 flex flex-col gap-1">
            <a
              href={localeHref}
              hrefLang={otherLocale}
              className="flex items-center gap-2.5 py-4 text-body-lg border-b border-[var(--border)] text-[var(--text-primary)] hover:text-[var(--brand-violet)] transition-colors"
              onClick={() => setOpen(false)}
            >
              <GlobeIcon width={18} height={18} />
              <span>{localeLabel}</span>
            </a>

            {mode === "app" ? (
              <Link
                href={`/${locale}/auth`}
                className="flex items-center justify-between py-4 text-body-lg border-b border-[var(--border)] text-[var(--text-primary)] hover:text-[var(--brand-violet)] transition-colors"
                onClick={() => setOpen(false)}
              >
                <span>{dict.nav.signOut}</span>
              </Link>
            ) : (
              <div className="pt-4">
                <Button
                  href={`/${locale}/auth`}
                  size="md"
                  onClick={() => setOpen(false)}
                  className="w-full justify-center"
                >
                  {dict.nav.signIn}
                </Button>
              </div>
            )}
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
