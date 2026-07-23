import type { ReactNode } from "react";
import { verifySession, getCurrentAdmin } from "@/lib/auth/dal";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  await verifySession();
  const admin = await getCurrentAdmin();

  return (
    <div className="min-h-screen flex bg-background">
      <AdminSidebar adminEmail={admin?.email ?? ""} />
      <main className="flex-1 p-6 md:p-10 overflow-x-hidden">{children}</main>
    </div>
  );
}
