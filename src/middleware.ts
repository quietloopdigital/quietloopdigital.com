import { NextResponse, type NextRequest } from "next/server";

/**
 * The holding-page switch.
 *
 *   COMING_SOON=false  the real site is served
 *   anything else      every visitor lands on /coming-soon
 *
 * Note the default: only an explicit "false" opens the site up. If the
 * variable never reaches the runtime — misconfigured, marked sensitive,
 * forgotten on a new environment — we show the holding page rather than
 * an unfinished site. Failing closed is the whole point of the switch.
 *
 * To show the work-in-progress site to someone while the public still sees
 * the holding page, send them to  /?preview=<PREVIEW_TOKEN>  — that drops a
 * cookie and they can browse normally from then on.
 */

const COOKIE = "ql-preview";

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // the holding page itself, and anything Next serves from disk
  if (
    pathname.startsWith("/coming-soon") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/brand") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  if (process.env.COMING_SOON === "false") {
    return NextResponse.next();
  }

  const token = process.env.PREVIEW_TOKEN;

  // ?preview=<token> unlocks the real site for this browser
  if (token && searchParams.get("preview") === token) {
    const url = req.nextUrl.clone();
    url.searchParams.delete("preview");
    const res = NextResponse.redirect(url);
    res.cookies.set(COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return res;
  }

  if (token && req.cookies.get(COOKIE)?.value === token) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/coming-soon";
  url.search = "";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image).*)"],
};
