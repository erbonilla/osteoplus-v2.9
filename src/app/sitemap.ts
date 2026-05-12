import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: `https://osteoplus.es/${locale}`,
    lastModified: new Date("2026-05-09"),
    changeFrequency: "weekly",
    priority: locale === routing.defaultLocale ? 1 : 0.9,
  }));
}
