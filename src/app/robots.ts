import type { MetadataRoute } from "next";
import { getContent } from "@/content/store";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const base = (await getContent()).site.url.replace(/\/$/, "");
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/admin"] },
    sitemap: `${base}/sitemap.xml`,
  };
}
