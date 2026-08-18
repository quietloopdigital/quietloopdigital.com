import type { MetadataRoute } from "next";

// robots.txt has to reflect the CURRENT value of COMING_SOON, not whatever
// it happened to be when `next build` ran. Without this, Next.js prerenders
// the route once at build time and serves that forever — so a build made
// before launch would keep saying "Disallow" even after the real site went
// live (safe direction, but still wrong), and worse, a build made with
// COMING_SOON=false baked in would keep saying "Allow" even if the site
// were later put back behind the holding page.
export const dynamic = "force-dynamic";

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
