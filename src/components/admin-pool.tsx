"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import type { Dict } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type Health = {
  day: string;
  perKeyLimit: number;
  userLimit: number;
  redisConfigured: boolean;
  keys: { id: string; used: number; remaining: number; exhausted: boolean }[];
  totalUsed: number;
  totalCapacity: number;
};

type Props = {
  dict: Dict["admin"];
  locale: Locale;
};

const PASSWORD_STORAGE = "tti.admin.password";

export function AdminPoolClient({ dict }: Props) {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [health, setHealth] = useState<Health | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(
    async (pw: string) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/admin/pool", {
          method: "GET",
          headers: { "x-admin-password": pw },
          cache: "no-store",
        });
        if (res.status === 401) {
          setError(dict.errorWrongPassword);
          setAuthed(false);
          sessionStorage.removeItem(PASSWORD_STORAGE);
          return;
        }
        if (res.status === 503) {
          setError(dict.errorDisabled);
          setAuthed(false);
          return;
        }
        if (!res.ok) {
          setError(dict.errorGeneric);
          return;
        }
        const data = (await res.json()) as Health;
        setHealth(data);
        setAuthed(true);
        sessionStorage.setItem(PASSWORD_STORAGE, pw);
      } catch {
        setError(dict.errorNetwork);
      } finally {
        setLoading(false);
      }
    },
    [dict.errorDisabled, dict.errorGeneric, dict.errorNetwork, dict.errorWrongPassword],
  );

  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? window.sessionStorage.getItem(PASSWORD_STORAGE)
        : null;
    if (saved) {
      setPassword(saved);
      void load(saved);
    }
  }, [load]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;
    void load(password.trim());
  }

  if (!authed) {
    return (
      <form
        onSubmit={onSubmit}
        className="card-glow p-6 sm:p-8 max-w-md flex flex-col gap-4"
      >
        <label
          htmlFor="admin-password"
          className="text-caption uppercase tracking-[0.1em] text-[var(--text-muted)]"
        >
          {dict.passwordLabel}
        </label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={dict.passwordPlaceholder}
          className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 text-body-md text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--brand-violet)]"
        />
        {error ? (
          <p className="text-caption text-[var(--danger,_#f87171)]">{error}</p>
        ) : null}
        <button
          type="submit"
          disabled={!password.trim() || loading}
          className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--accent)] text-[var(--accent-fg)] px-4 py-2.5 text-body-sm font-semibold transition-all hover:-translate-y-px disabled:opacity-40 disabled:pointer-events-none"
        >
          {loading ? dict.loading : dict.signIn}
        </button>
      </form>
    );
  }

  if (!health) return null;

  const totalRemaining = Math.max(0, health.totalCapacity - health.totalUsed);
  const fillPct =
    health.totalCapacity > 0
      ? Math.min(100, Math.round((health.totalUsed / health.totalCapacity) * 100))
      : 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="card-glow p-5 sm:p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <div className="text-caption uppercase tracking-[0.1em] text-[var(--text-muted)]">
              {dict.dayLabel} · UTC {health.day}
            </div>
            <div className="mt-1 text-heading-md text-[var(--text-primary)]">
              {dict.poolTitle}
            </div>
          </div>
          <button
            type="button"
            onClick={() => load(password)}
            disabled={loading}
            className="rounded-[var(--radius-md)] border border-[var(--border-strong)] px-3 py-1.5 text-caption text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            {loading ? dict.loading : dict.refresh}
          </button>
        </div>
        <div className="flex flex-wrap gap-3 text-body-sm text-[var(--text-secondary)]">
          <span>
            <strong className="text-[var(--text-primary)] ltr-nums">
              {health.totalUsed}
            </strong>{" "}
            / {health.totalCapacity} {dict.imagesUsedToday}
          </span>
          <span>
            <strong className="text-[var(--text-primary)] ltr-nums">
              {totalRemaining}
            </strong>{" "}
            {dict.remaining}
          </span>
          <span>
            {dict.perKeyLimit}: {health.perKeyLimit}
          </span>
          <span>
            {dict.perUserLimit}: {health.userLimit}
          </span>
        </div>
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-[var(--bg-subtle)]"
          aria-label={dict.poolFillLabel}
          role="progressbar"
          aria-valuenow={fillPct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full transition-[width] duration-500"
            style={{
              width: `${fillPct}%`,
              background: "var(--gradient-brand)",
            }}
          />
        </div>
        {!health.redisConfigured ? (
          <p className="text-caption text-[var(--warning,_#fbbf24)]">
            {dict.redisNotConfigured}
          </p>
        ) : null}
      </div>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {health.keys.length === 0 ? (
          <li className="card-glow p-5 col-span-full">
            <p className="text-body-md text-[var(--text-secondary)]">
              {dict.noKeysConfigured}
            </p>
          </li>
        ) : null}
        {health.keys.map((k) => {
          const pct =
            health.perKeyLimit > 0
              ? Math.min(100, Math.round((k.used / health.perKeyLimit) * 100))
              : 0;
          return (
            <li
              key={k.id}
              className="card-glow p-4 sm:p-5 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-caption uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  {dict.keyLabel} · {k.id}
                </span>
                <span
                  className={`text-caption font-semibold ${
                    k.exhausted
                      ? "text-[var(--danger,_#f87171)]"
                      : "text-emerald-400"
                  }`}
                >
                  {k.exhausted ? dict.exhausted : dict.healthy}
                </span>
              </div>
              <div className="text-body-md text-[var(--text-primary)] ltr-nums">
                {k.used} / {health.perKeyLimit}
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg-subtle)]">
                <div
                  className="h-full"
                  style={{
                    width: `${pct}%`,
                    background: k.exhausted
                      ? "var(--danger,_#f87171)"
                      : "var(--gradient-brand)",
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
