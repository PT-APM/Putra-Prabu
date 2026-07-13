"use client";
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children } : MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background relative z-0">
      <div className="fixed inset-0 pointer-events-none bg-pattern z-[-1]"></div>
      
      <Header />
      
      {/* Main Content Area */}
      <main className="flex-grow pt-20 flex flex-col">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}
