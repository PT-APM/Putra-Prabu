import type { ReactNode } from "react";
import { verifySession, getCurrentAdmin } from "@/lib/auth/dal";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { getAdminLocale } from "@/lib/i18n/adminLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function AdminProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  await verifySession();
  const admin = await getCurrentAdmin();
  const locale = await getAdminLocale();
  const dict = getDictionary(locale);

  return (
    <div className="min-h-screen flex bg-background">
      <AdminSidebar adminEmail={admin?.email ?? ""} locale={locale} dict={dict} />
      <main className="flex-1 p-6 md:p-10 overflow-x-hidden">{children}</main>
    </div>
  );
}
