import MainLayout from '@/components/layout/MainLayout';
import { repository } from '@/lib/repositories';
import HeroPart from '@/sections/About/HeroPart';
import LeadershipPart from '@/sections/About/LeadershipPart';
import PimpinanPonpesPart from '@/sections/About/PimpinanPonpesPart';
import ServicesPart from '@/sections/About/ServicesPart';
import { isLocale, defaultLocale } from '@/lib/i18n/config';

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  const services = await repository.services.getAll(locale);
  const [pembinaList, pengawasList, pengurusHarian] = await Promise.all([
    repository.leadership.getByGroup('pembina', locale),
    repository.leadership.getByGroup('pengawas', locale),
    repository.leadership.getByGroup('pengurus_harian', locale),
  ]);
  const pembina = pembinaList[0];
  const pengawas = pengawasList[0];

  return (
    <MainLayout locale={locale}>
      {/* Hero Section */}
      <HeroPart locale={locale} />

      {/* Business Section */}
      <ServicesPart locale={locale} services={services} />
      {/* Leadership Section */}
      <LeadershipPart locale={locale} pembina={pembina} pengawas={pengawas} pengurusHarian={pengurusHarian} />

      {/* Pimpinan Pondok Pesantren Section */}
      <PimpinanPonpesPart locale={locale} />

    </MainLayout>
  );
}
