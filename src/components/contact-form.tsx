"use client";

import { useState } from "react";
import type { Dict } from "@/i18n/dictionaries";
import { ArrowRightIcon } from "./icons";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({ dict }: { dict: Dict }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; description?: string }>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = (fd.get("name") as string | null)?.trim() ?? "";
    const email = (fd.get("email") as string | null)?.trim() ?? "";
    const description = (fd.get("description") as string | null)?.trim() ?? "";

    const next: typeof errors = {};
    if (!name) next.name = dict.contact.form.required;
    if (!email) next.email = dict.contact.form.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = dict.contact.form.invalidEmail;
    if (!description) next.description = dict.contact.form.required;
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      await new Promise((r) => setTimeout(r, 900));
      setStatus("success");
      form.reset();
      setTimeout(() => setStatus("idle"), 3500);
    } catch {
      setStatus("error");
    }
  }

  const input =
    "w-full bg-[var(--bg-elevated)] border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-3 text-body-md text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--border-strong)] transition-colors outline-none";
  const label = "text-body-sm text-[var(--text-secondary)] mb-2 block";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">
            {dict.contact.form.name}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder={dict.contact.form.namePh}
            className={input}
            aria-invalid={!!errors.name}
          />
          {errors.name ? (
            <p className="text-caption text-[var(--danger)] mt-1">{errors.name}</p>
          ) : null}
        </div>
        <div>
          <label className={label} htmlFor="email">
            {dict.contact.form.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder={dict.contact.form.emailPh}
            className={input}
            aria-invalid={!!errors.email}
          />
          {errors.email ? (
            <p className="text-caption text-[var(--danger)] mt-1">{errors.email}</p>
          ) : null}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="phone">
            {dict.contact.form.phone}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder={dict.contact.form.phonePh}
            className={input}
          />
        </div>
        <div>
          <label className={label} htmlFor="service">
            {dict.contact.form.service}
          </label>
          <select
            id="service"
            name="service"
            defaultValue=""
            className={`${input} appearance-none`}
          >
            <option value="" disabled>
              {dict.contact.form.servicePlaceholder}
            </option>
            {dict.services.items.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className={label} htmlFor="description">
          {dict.contact.form.description}
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          placeholder={dict.contact.form.descriptionPh}
          className={`${input} resize-y min-h-[120px]`}
          aria-invalid={!!errors.description}
        />
        {errors.description ? (
          <p className="text-caption text-[var(--danger)] mt-1">{errors.description}</p>
        ) : null}
      </div>

      <div className="flex items-center gap-4 flex-wrap pt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--accent)] text-[var(--accent-fg)] px-5 py-3 text-body-sm font-semibold hover:-translate-y-px hover:shadow-[var(--shadow-sm)] transition-transform disabled:opacity-60"
        >
          {status === "sending" ? dict.contact.form.sending : dict.contact.form.submit}
          {status === "idle" ? <ArrowRightIcon width={16} height={16} /> : null}
        </button>
        {status === "success" ? (
          <p className="text-body-sm text-[var(--success)]">{dict.contact.form.success}</p>
        ) : null}
        {status === "error" ? (
          <p className="text-body-sm text-[var(--danger)]">{dict.contact.form.error}</p>
        ) : null}
      </div>
    </form>
  );
}
