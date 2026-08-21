import { repository } from '@/lib/repositories';
import HeroPart from '@/sections/Home/HeroPart';
import ServicesPart from '@/sections/Home/ServicesPart';
import PonpesSummaryPart from '@/sections/Home/PonpesSummaryPart';
import LatestNewsPart from '@/sections/Home/LatestNewsPart';
import MainLayout from '@/components/layout/MainLayout';
import { isLocale, defaultLocale } from '@/lib/i18n/config';
import WelcomeMessagePart from '@/sections/About/WelcomeMessagePart';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
    const [pembinaList, pengawasList, pengurusHarian] = await Promise.all([
    repository.leadership.getByGroup('pembina', locale),
    repository.leadership.getByGroup('pengawas', locale),
    repository.leadership.getByGroup('pengurus_harian', locale),
  ]);
  const chairman = [pembinaList[0], pengawasList[0], ...pengurusHarian].find(
      (leader) => leader?.name === 'Ir. Muhammad Azhari, SH, MH'
    );
  const latestNews = await repository.news.getLatest(3, locale);
  const services = (await repository.services.getAll(locale)).slice(0, 3); // Showing a subset for the bento grid

  return (
    <MainLayout locale={locale}>
      <HeroPart locale={locale} />
      <ServicesPart locale={locale} services={services} />
      <WelcomeMessagePart locale={locale} chairman={chairman} />
      <PonpesSummaryPart locale={locale} />
      <LatestNewsPart locale={locale} latestNews={latestNews} />
    </MainLayout>
  );
}
