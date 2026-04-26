import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const BASE_URL = "https://texttoimage.studio";

export default function sitemap(): MetadataRoute.Sitemap {
  const en = getDictionary("en");
  const staticPaths = ["", "/services", "/portfolio", "/about", "/blog", "/contact", "/privacy", "/terms"];
  const servicePaths = en.services.items.map((s) => `/services/${s.slug}`);
  const projectPaths = en.portfolio.items.map((p) => `/portfolio/${p.slug}`);
  const blogPaths = en.blog.posts.map((p) => `/blog/${p.slug}`);
  const allPaths = [...staticPaths, ...servicePaths, ...projectPaths, ...blogPaths];

  return locales.flatMap((locale) =>
    allPaths.map((p) => ({
      url: `${BASE_URL}/${locale}${p}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.7,
    }))
  );
}
