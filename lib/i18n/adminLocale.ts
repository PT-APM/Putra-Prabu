import { cookies } from "next/headers";
import { defaultLocale, isLocale, type Locale } from "./config";

export const ADMIN_LOCALE_COOKIE = "admin_locale";

/**
 * The admin panel's UI language is a personal preference stored in a
 * cookie, independent from the public site's URL-based locale routing —
 * admin routes are behind auth and aren't meant to be shared/indexed per
 * language.
 */
export async function getAdminLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(ADMIN_LOCALE_COOKIE)?.value;
  return value && isLocale(value) ? value : defaultLocale;
}
