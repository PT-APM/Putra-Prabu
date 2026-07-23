import { repository } from '@/lib/repositories';
import HeroPart from '@/sections/Home/HeroPart';
import ServicesPart from '@/sections/Home/ServicesPart';
import LatestNewsPart from '@/sections/Home/LatestNewsPart';
import MainLayout from '@/components/layout/MainLayout';


export default async function Home() {
  const latestNews = await repository.news.getLatest(3);
  const services = (await repository.services.getAll()).slice(0, 3); // Showing a subset for the bento grid

  return (
    <MainLayout>
      <HeroPart/>
      <ServicesPart services={services}/>
      <LatestNewsPart latestNews={latestNews} />
    </MainLayout>
  );
}
