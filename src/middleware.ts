import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "./i18n/config";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const firstSegment = pathname.split("/")[1];

  if (!isLocale(firstSegment)) {
    // Parse Accept-Language preserving the user's preference order.
    // Browsers send e.g. "ar,en-US;q=0.9,en;q=0.8" — the first entry is the user's top choice.
    const headerLang = request.headers.get("accept-language") ?? "";
    const prefers = headerLang
      .toLowerCase()
      .split(",")
      .map((part) => part.trim().split(";")[0])
      .map((tag) => tag.split("-")[0])
      .filter(Boolean);
    const detected =
      prefers.find((p): p is (typeof locales)[number] =>
        (locales as readonly string[]).includes(p),
      ) ?? defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = `/${detected}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  // Forward the resolved locale + pathname to the server handler as *request*
  // headers so server components (`headers()`) can read them — e.g. the
  // [locale]/not-found.tsx page needs to resolve the current locale when the
  // route params are unavailable.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  requestHeaders.set("x-locale", firstSegment);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("x-pathname", pathname);
  response.headers.set("x-locale", firstSegment);
  return response;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
