import MainLayout from '@/components/layout/MainLayout';
import { repository } from '@/lib/repositories';
import HeroPart from '@/sections/About/HeroPart';
import ServicesPart from '@/sections/About/ServicesPart';
import VisiMisiPart from '@/sections/About/VisiMisiPart';
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
  const chairman = [pembinaList[0], pengawasList[0], ...pengurusHarian].find(
    (leader) => leader?.name === 'Hari Mulyono'
  );

  return (
    <MainLayout locale={locale}>
      {/* Hero Section */}
      <HeroPart locale={locale} chairman={chairman} />
      {/* Welcome Message Section */}
      
      {/* Visi & Misi Section */}
      <VisiMisiPart locale={locale} />

      {/* Business Section */}
      <ServicesPart locale={locale} services={services} />

    </MainLayout>
  );
}
