import { repository } from '@/lib/repositories';
import HeroPart from '@/sections/Home/HeroPart';
import ServicesPart from '@/sections/Home/ServicesPart';
import LatestNewsPart from '@/sections/Home/LatestNewsPart';
import LeadershipPart from '@/sections/About/LeadershipPart';
import PimpinanPonpesPart from '@/sections/About/PimpinanPonpesPart';
import MainLayout from '@/components/layout/MainLayout';
import { isLocale, defaultLocale } from '@/lib/i18n/config';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  const latestNews = await repository.news.getLatest(3, locale);
  const services = (await repository.services.getAll(locale)).slice(0, 3); // Showing a subset for the bento grid
  const [pembinaList, pengawasList, pengurusHarian] = await Promise.all([
    repository.leadership.getByGroup('pembina', locale),
    repository.leadership.getByGroup('pengawas', locale),
    repository.leadership.getByGroup('pengurus_harian', locale),
  ]);
  const pembina = pembinaList[0];
  const pengawas = pengawasList[0];

  return (
    <MainLayout locale={locale}>
      <HeroPart locale={locale} />
      <ServicesPart locale={locale} services={services} />
      {/* Leadership Section */}
      <LeadershipPart locale={locale} pembina={pembina} pengawas={pengawas} pengurusHarian={pengurusHarian} />
      {/* Pimpinan Pondok Pesantren Section */}
      <PimpinanPonpesPart locale={locale} />
      <LatestNewsPart locale={locale} latestNews={latestNews} />
    </MainLayout>
  );
}
