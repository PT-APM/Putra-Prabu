import { defaultLocale, intlLocaleTags, type Locale } from "@/lib/i18n/config";

const formatters: Partial<Record<Locale, Intl.DateTimeFormat>> = {};

function getFormatter(locale: Locale): Intl.DateTimeFormat {
  if (!formatters[locale]) {
    formatters[locale] = new Intl.DateTimeFormat(intlLocaleTags[locale], {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }
  return formatters[locale]!;
}

export function formatDate(date: Date, locale: Locale = defaultLocale): string {
  return getFormatter(locale).format(date);
}

export function toDateInputValue(date: Date): string {
  return date.toISOString().slice(0, 10);
}
