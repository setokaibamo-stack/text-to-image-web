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
    const headerLang = request.headers.get("accept-language") ?? "";
    const prefers = headerLang.toLowerCase().split(",").map((s) => s.trim().slice(0, 2));
    const detected = locales.find((l) => prefers.includes(l)) ?? defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = `/${detected}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);
  response.headers.set("x-locale", firstSegment);
  return response;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
