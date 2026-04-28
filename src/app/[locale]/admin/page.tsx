import { notFound } from "next/navigation";
import { Background } from "@/components/background";
import { Section } from "@/components/section";
import { AdminPoolClient } from "@/components/admin-pool";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const d = getDictionary(l);

  return (
    <Section className="overflow-hidden">
      <Background variant="section" />
      <div className="flex flex-col gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/[0.04] px-3 py-1 text-caption uppercase tracking-[0.14em] text-[var(--text-secondary)] w-fit">
          {d.admin.eyebrow}
        </span>
        <h1 className="text-display-lg text-[var(--text-primary)] text-balance max-w-[22ch]">
          {d.admin.title}
        </h1>
        <p className="text-body-lg text-[var(--text-secondary)] max-w-[60ch] text-pretty">
          {d.admin.subtitle}
        </p>
      </div>
      <div className="mt-10">
        <AdminPoolClient dict={d.admin} locale={l} />
      </div>
    </Section>
  );
}
