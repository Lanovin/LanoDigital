import type { MetadataRoute } from "next";
import { getContent } from "@/content/store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { site, systems } = await getContent();
  const now = new Date();
  const base = site.url.replace(/\/$/, "");

  const staticPages = ["", "/sluzby", "/systemy", "/weby", "/o-mne", "/kontakt"].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.7,
  }));

  const systemPages = systems.map((s) => ({
    url: `${base}/systemy/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...systemPages];
}
