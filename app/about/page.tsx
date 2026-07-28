import MainLayout from '@/components/layout/MainLayout';
import { repository } from '@/lib/repositories';
import HeroPart from '@/sections/About/HeroPart';
import LeadershipPart from '@/sections/About/LeadershipPart';
import PimpinanPonpesPart from '@/sections/About/PimpinanPonpesPart';
import ServicesPart from '@/sections/About/ServicesPart';


export default async function About() {
  const services = await repository.services.getAll();
  const [pembinaList, pengawasList, pengurusHarian] = await Promise.all([
    repository.leadership.getByGroup('Pembina'),
    repository.leadership.getByGroup('Pengawas'),
    repository.leadership.getByGroup('Pengurus Harian'),
  ]);
  const pembina = pembinaList[0];
  const pengawas = pengawasList[0];

  return (
    <MainLayout>
      {/* Hero Section */}
      <HeroPart/>

      {/* Business Section */}
      <ServicesPart services={services}/>
      {/* Leadership Section */}
      <LeadershipPart pembina={pembina} pengawas={pengawas} pengurusHarian={pengurusHarian}/>

      {/* Pimpinan Pondok Pesantren Section */}
      <PimpinanPonpesPart/>

    </MainLayout>
  );
}
