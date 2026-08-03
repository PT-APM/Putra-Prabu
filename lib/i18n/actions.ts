"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { isLocale } from "./config";
import { ADMIN_LOCALE_COOKIE } from "./adminLocale";

export async function setAdminLocale(formData: FormData) {
  const locale = String(formData.get("locale") || "");
  if (!isLocale(locale)) return;

  const store = await cookies();
  store.set(ADMIN_LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  revalidatePath("/admin");
}
