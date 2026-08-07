import { notFound } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import PonpesDetailPart from '@/sections/Ponpes/DetailPart';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { isLocale, defaultLocale } from '@/lib/i18n/config';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function PonpesDetail({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  const dict = getDictionary(locale);
  const ponpes = dict.about.pimpinanPonpes.list.find((p) => p.slug === slug);
  if (!ponpes) notFound();

  return (
    <MainLayout locale={locale}>
      <PonpesDetailPart locale={locale} ponpes={ponpes} />
    </MainLayout>
  );
}
