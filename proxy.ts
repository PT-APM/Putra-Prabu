import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth/token";
import { defaultLocale } from "@/lib/i18n/config";
import { getLocaleFromPathname } from "@/lib/i18n/path";

function adminProxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const isLoginRoute = pathname === "/admin/login";

  const session = verifySessionToken(request.cookies.get(SESSION_COOKIE_NAME)?.value);

  if (!session && !isLoginRoute) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (session && isLoginRoute) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

// The default locale ("id") is served unprefixed to keep existing URLs
// (e.g. "/about") working; "en"/"ar" use an explicit "/en", "/ar" prefix.
// This rewrites unprefixed requests internally to `/id/...` (URL bar stays
// unchanged) and redirects any explicit "/id/..." request to its canonical
// unprefixed form, so a page never has two indexable URLs.
function localeProxy(request: NextRequest): NextResponse {
  const { pathname, search } = request.nextUrl;
  const localeInPath = getLocaleFromPathname(pathname);

  if (localeInPath === defaultLocale) {
    const rest = pathname.slice(`/${defaultLocale}`.length) || "/";
    return NextResponse.redirect(new URL(rest + search, request.url));
  }

  if (!localeInPath) {
    return NextResponse.rewrite(new URL(`/${defaultLocale}${pathname}${search}`, request.url));
  }

  return NextResponse.next();
}

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return adminProxy(request);
  }
  return localeProxy(request);
}

export const config = {
  // Excludes API routes, Next internals, and any path with a file
  // extension (favicon.ico, icon.svg, apple-icon.png, /public assets, ...).
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
