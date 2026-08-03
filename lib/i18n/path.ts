import { defaultLocale, isLocale, locales, type Locale } from "./config";

/**
 * Builds a path prefixed with the given locale, except for the default
 * locale which is served unprefixed (e.g. "/about" stays "/about" for
 * "id", but becomes "/en/about" for "en"). `path` must start with "/".
 */
export function localeHref(locale: Locale, path: string): string {
  if (locale === defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/**
 * Strips a known locale prefix from a pathname, returning the
 * locale-independent path (always starting with "/").
 */
export function stripLocaleFromPathname(pathname: string): string {
  const segments = pathname.split("/");
  const maybeLocale = segments[1];
  if (maybeLocale && isLocale(maybeLocale)) {
    const rest = "/" + segments.slice(2).join("/");
    return rest === "/" ? "/" : rest.replace(/\/+$/, "") || "/";
  }
  return pathname;
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const maybeLocale = pathname.split("/")[1];
  return maybeLocale && isLocale(maybeLocale) ? maybeLocale : null;
}

export { locales };
