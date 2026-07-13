import MainLayout from '@/components/layout/MainLayout';
import { repository } from '@/lib/repositories';
import HeroPart from '@/sections/About/HeroPart';
import LeadershipPart from '@/sections/About/LeadershipPart';
import ServicesPart from '@/sections/About/ServicesPart';


export default function About() {
  const services = repository.services.getAll();
  const pembina = repository.leadership.getByGroup('Pembina')[0];
  const pengawas = repository.leadership.getByGroup('Pengawas')[0];
  const pengurusHarian = repository.leadership.getByGroup('Pengurus Harian');

  return (
    <MainLayout>
      {/* Hero Section */}
      <HeroPart/>

      {/* Business Section */}
      <ServicesPart services={services}/>

      {/* Leadership Section */}
      <LeadershipPart pembina={pembina} pengawas={pengawas} pengurusHarian={pengurusHarian}/>
    </MainLayout>
  );
}
