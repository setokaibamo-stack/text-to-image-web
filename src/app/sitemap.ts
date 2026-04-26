import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const BASE_URL = "https://texttoimage.studio";

export default function sitemap(): MetadataRoute.Sitemap {
  const en = getDictionary("en");
  const staticPaths = [
    "",
    "/about",
    "/blog",
    "/launch",
    "/dashboard",
    "/privacy",
    "/terms",
  ];
  const blogPaths = en.blog.posts.map((p) => `/blog/${p.slug}`);
  const allPaths = [...staticPaths, ...blogPaths];

  return locales.flatMap((locale) =>
    allPaths.map((p) => ({
      url: `${BASE_URL}/${locale}${p}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.7,
    }))
  );
}
