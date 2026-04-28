import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={locale as Locale} dict={dict} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
