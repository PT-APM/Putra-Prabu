import Header from './Header';
import Footer from './Footer';
import { repository } from '@/lib/repositories';
import type { Locale } from '@/lib/i18n/config';

interface MainLayoutProps {
  children: React.ReactNode;
  locale: Locale;
}

export default async function MainLayout({ children, locale }: MainLayoutProps) {
  const contactInfo = await repository.contact.getAll(locale);

  return (
    <div className="min-h-screen flex flex-col bg-background relative z-0">
      <div className="fixed inset-0 pointer-events-none bg-pattern z-[-1]"></div>

      <Header locale={locale} />

      {/* Main Content Area */}
      <main className="flex-grow pt-20 flex flex-col">
        {children}
      </main>

      <Footer locale={locale} contactInfo={contactInfo} />
    </div>
  );
}
