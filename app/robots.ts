import type { MetadataRoute } from "next";

// AI crawlers are deliberately allowed alongside search engines (see SITE.md).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://enghausen.com/sitemap.xml",
  };
}
