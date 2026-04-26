"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dict } from "@/i18n/dictionaries";

type Point = {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  dx: number;
  dy: number;
};

function seededPoints(count: number): Point[] {
  // deterministic pseudo-random so SSR and client agree
  let seed = 20260426;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  return Array.from({ length: count }, () => ({
    x: rand() * 100,
    y: rand() * 100,
    size: 1 + rand() * 2.5,
    delay: -rand() * 12,
    duration: 8 + rand() * 10,
    dx: (rand() - 0.5) * 40,
    dy: (rand() - 0.5) * 40,
  }));
}

export function LaunchSplash({
  locale,
  dict,
  durationMs = 3000,
}: {
  locale: Locale;
  dict: Dict;
  durationMs?: number;
}) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const startRef = useRef<number | null>(null);
  const redirected = useRef(false);

  const points = useMemo(() => seededPoints(44), []);

  useEffect(() => {
    let raf = 0;
    const tick = (t: number) => {
      if (startRef.current === null) startRef.current = t;
      const elapsed = t - startRef.current;
      const p = Math.min(1, elapsed / durationMs);
      setProgress(p);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!redirected.current) {
        redirected.current = true;
        router.push(`/${locale}/dashboard`);
      }
    };
    raf = requestAnimationFrame(tick);

    const prefetchTimer = setTimeout(() => {
      try {
        router.prefetch(`/${locale}/dashboard`);
      } catch {
        /* noop */
      }
    }, 100);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(prefetchTimer);
    };
  }, [durationMs, locale, router]);

  const pct = Math.round(progress * 100);

  return (
    <div
      className="fixed inset-0 z-[60] overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)]"
      role="status"
      aria-live="polite"
      aria-label={dict.launch.loadingLabel}
    >
      {/* Animated orb + grid + drifting points background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="orb orb-purple orb-anim-1 -top-32 -left-24 h-[560px] w-[560px]" />
        <div className="orb orb-blue orb-anim-2 -bottom-32 -right-24 h-[520px] w-[520px]" />
        <div className="orb orb-indigo orb-anim-3 top-[30%] left-[40%] h-[420px] w-[420px] opacity-40" />
        <div className="bg-grid-overlay" />
        <div className="absolute inset-0">
          {points.map((p, i) => (
            <span
              key={i}
              className="launch-point"
              style={
                {
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  animationDelay: `${p.delay}s`,
                  animationDuration: `${p.duration}s`,
                  "--dx": `${p.dx}px`,
                  "--dy": `${p.dy}px`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>

      <div className="relative h-full w-full flex flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center gap-8 text-center max-w-lg w-full">
          <div className="launch-logo flex items-center gap-3">
            <span
              aria-hidden
              className="inline-flex h-14 w-14 items-center justify-center rounded-2xl text-[20px] font-bold text-white shadow-[var(--shadow-glow-mix)]"
              style={{ background: "var(--gradient-brand)" }}
            >
              t→i
            </span>
            <span className="text-display-lg font-semibold tracking-tight">
              {dict.brand.name}
            </span>
          </div>

          <p className="launch-tagline text-body-md uppercase tracking-[0.32em] text-[var(--text-muted)]">
            {dict.launch.tagline}
          </p>

          <div
            className="launch-bar w-full max-w-sm h-1 rounded-full bg-white/10 overflow-hidden"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            aria-label={dict.launch.loadingLabel}
          >
            <div
              className="h-full transition-[width] duration-150 ease-linear"
              style={{
                width: `${pct}%`,
                background: "var(--gradient-brand)",
                boxShadow: "var(--shadow-glow-purple)",
              }}
            />
          </div>

          <div className="flex items-center gap-2 text-caption text-[var(--text-muted)] ltr-nums">
            <span>{dict.launch.loadingLabel}</span>
            <span aria-hidden>·</span>
            <span>{pct}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
