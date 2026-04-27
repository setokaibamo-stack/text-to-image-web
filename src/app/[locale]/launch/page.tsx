import { notFound } from "next/navigation";
import { LaunchSplash } from "@/components/launch-splash";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function LaunchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const d = getDictionary(l);

  return <LaunchSplash locale={l} dict={d} durationMs={3000} />;
}
