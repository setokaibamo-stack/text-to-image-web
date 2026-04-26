import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import { Card, Section, SectionHeader } from "@/components/section";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale);
  return { title: d.contact.title };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const d = getDictionary(l);

  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHeader
            eyebrow={d.contact.eyebrow}
            title={d.contact.title}
            subtitle={d.contact.subtitle}
          />
          <dl className="mt-8 space-y-4 text-body-md">
            {[
              { k: d.contact.info.emailLabel, v: d.contact.info.email, href: `mailto:${d.contact.info.email}` },
              { k: d.contact.info.phoneLabel, v: d.contact.info.phone, href: `tel:${d.contact.info.phone.replace(/\s/g, "")}` },
              { k: d.contact.info.addressLabel, v: d.contact.info.address },
              { k: d.contact.info.hoursLabel, v: d.contact.info.hours },
            ].map((x) => (
              <div
                key={x.k}
                className="flex items-start gap-4 border-b border-[var(--border)] pb-4"
              >
                <dt className="w-16 shrink-0 text-caption uppercase tracking-[0.12em] text-[var(--text-muted)] pt-1">
                  {x.k}
                </dt>
                <dd className="text-body-md text-[var(--text-primary)]">
                  {x.href ? (
                    <a href={x.href} className="hover:underline underline-offset-4">
                      {x.v}
                    </a>
                  ) : (
                    x.v
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <Card>
          <ContactForm dict={d} />
        </Card>
      </div>
    </Section>
  );
}
