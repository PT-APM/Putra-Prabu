import { repository } from '@/lib/repositories';
import HeroPart from '@/sections/Home/HeroPart';
import ServicesPart from '@/sections/Home/ServicesPart';
import LatestNewsPart from '@/sections/Home/LatestNewsPart';
import MainLayout from '@/components/layout/MainLayout';
import { isLocale, defaultLocale } from '@/lib/i18n/config';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  const latestNews = await repository.news.getLatest(3, locale);
  const services = (await repository.services.getAll(locale)).slice(0, 3); // Showing a subset for the bento grid

  return (
    <MainLayout locale={locale}>
      <HeroPart locale={locale} />
      <ServicesPart locale={locale} services={services} />
      <LatestNewsPart locale={locale} latestNews={latestNews} />
    </MainLayout>
  );
}
