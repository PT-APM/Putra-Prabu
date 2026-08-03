export const locales = ["id", "en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "id";

export const rtlLocales: Locale[] = ["ar"];

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const localeNames: Record<Locale, string> = {
  id: "Indonesia",
  en: "English",
  ar: "العربية",
};

export const localeShortNames: Record<Locale, string> = {
  id: "ID",
  en: "EN",
  ar: "AR",
};

// Maps a locale to the Intl locale tag used for date formatting.
// The `-u-nu-latn` extension keeps digits in Latin numerals for Arabic,
// matching the rest of the (Latin-numeral) UI instead of switching to ٠١٢.
export const intlLocaleTags: Record<Locale, string> = {
  id: "id-ID",
  en: "en-US",
  ar: "ar-SA-u-nu-latn",
};
