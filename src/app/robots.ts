import type { MetadataRoute } from "next";

const SITE = "https://quietloopdigital.com";

/**
 * While the holding page is up there is nothing worth crawling, so we turn
 * crawlers away at the door. The coming-soon page also carries a noindex
 * meta tag — belt and braces, because a page can still end up indexed from
 * an external link if robots.txt is the only thing stopping it.
 *
 * Same fail-closed rule as the middleware: only an explicit "false" opens
 * the site to crawlers.
 */
export default function robots(): MetadataRoute.Robots {
  const live = process.env.COMING_SOON === "false";

  if (!live) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
