import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const locales = ["id", "su"];

function getLocale(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    const locale = request.cookies.get("ppsi-lang")?.value;
    if (locale && locales.includes(locale)) {
      return locale;
    }
    const header = request.headers.get("accept-language") || "id";
    const preferred = header.split(",")[0]?.split("-")[0] ?? "id";
    return locales.includes(preferred) ? preferred : "id";
  }

  return undefined;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (
    pathname.startsWith("/_next") ||
    pathname === "/manifest.json" ||
    pathname === "/service-worker.js" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const locale = getLocale(request);
  if (locale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!.+\\.[\w]+$|_next).*)",
    "/",
  ],
};
