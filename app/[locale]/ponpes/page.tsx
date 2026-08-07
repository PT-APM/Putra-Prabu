import MainLayout from '@/components/layout/MainLayout';
import PonpesIndexPart from '@/sections/Ponpes/IndexPart';
import { isLocale, defaultLocale } from '@/lib/i18n/config';

export default async function Ponpes({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  return (
    <MainLayout locale={locale}>
      <PonpesIndexPart locale={locale} />
    </MainLayout>
  );
}
