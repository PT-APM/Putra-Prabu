import type { Locale } from "./config";
import idDict from "./dictionaries/id";

export type Dictionary = typeof idDict;

// Imported eagerly (not code-split per docs example) since each dictionary
// is a small plain object; this keeps getDictionary a sync, hook-free
// function usable from both Server and Client Components alike.
import enDict from "./dictionaries/en";
import arDict from "./dictionaries/ar";

const dictionaries: Record<Locale, Dictionary> = {
  id: idDict,
  en: enDict,
  ar: arDict,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
