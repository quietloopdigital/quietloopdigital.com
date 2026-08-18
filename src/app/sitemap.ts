import type { MetadataRoute } from "next";

// Same reasoning as robots.ts: this has to be evaluated per request, not
// baked in at build time.
export const dynamic = "force-dynamic";

const SITE = "https://quietloopdigital.com";

/**
 * Only lists pages that actually exist. Add entries here as pages are built
 * — a sitemap listing routes that 404 is worse than a short one.
 *
 * robots.txt only points at this once the site is live; while the holding
 * page is up, crawlers are turned away before they get here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
