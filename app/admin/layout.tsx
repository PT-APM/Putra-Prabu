import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import 'material-symbols/outlined.css';
import "../globals.css";
import { isRtl } from "@/lib/i18n/config";
import { getAdminLocale } from "@/lib/i18n/adminLocale";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin - Yayasan Putra Prabu Indonesia Raya",
  description: "Panel admin Yayasan Putra Prabu Indonesia Raya",
};

export default async function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adminLocale = await getAdminLocale();

  return (
    <html
      lang={adminLocale}
      dir={isRtl(adminLocale) ? "rtl" : "ltr"}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
