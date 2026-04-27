import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Inter, JetBrains_Mono } from "next/font/google";
import { headers } from "next/headers";
import { defaultLocale, getDirection, isLocale } from "@/i18n/config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const ibmArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "text to image — AI image studio",
    template: "%s · text to image",
  },
  description:
    "text to image is an AI image studio that ships prompt-to-picture apps, design systems, and marketing sites. Based in London, Dubai and Riyadh.",
  metadataBase: new URL("https://texttoimage.studio"),
  openGraph: {
    type: "website",
    title: "text to image — AI image studio",
    description:
      "Prompt-to-picture apps, design systems and marketing sites for ambitious teams.",
    siteName: "text to image",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const h = await headers();
  const locale = h.get("x-locale") ?? undefined;
  const activeLocale = isLocale(locale) ? locale : defaultLocale;
  const dir = getDirection(activeLocale);

  return (
    <html lang={activeLocale} dir={dir} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${ibmArabic.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
