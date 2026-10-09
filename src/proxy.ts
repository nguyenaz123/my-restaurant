import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, defaultLocale, hasLocale, locales } from "@/i18n/config";

/** Unprefixed URLs go to the saved language, else Lao; Accept-Language is deliberately ignored. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasPrefix = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasPrefix) return;

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = saved && hasLocale(saved) ? saved : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals and anything that looks like a file (images, robots.txt, sitemap.xml, og image).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
