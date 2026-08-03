import { revalidatePath } from "next/cache";
import { locales } from "./config";
import { localeHref } from "./path";

/**
 * Revalidates a public path across every locale variant (unprefixed "id",
 * "/en", "/ar", ...) since admin edits should show up immediately
 * regardless of which locale a visitor is browsing.
 */
export function revalidateLocalizedPath(path: string) {
  for (const locale of locales) {
    revalidatePath(localeHref(locale, path));
  }
}
