import MainLayout from "@/components/layout/MainLayout";
import ContactAnimatedWrapper, { FadeInSection } from "@/sections/Contact/ContactAnimatedWrapper";
import ContactFormPart from "@/sections/Contact/ContactFormPart";
import ContactInfoPart from "@/sections/Contact/ContactInfoPart";
import { repository } from "@/lib/repositories";

export default async function Contact() {
  const contactInfo = await repository.contact.getAll();
  const address = contactInfo.find((c) => c.icon === "location_on") ?? contactInfo[0];
  const mapQuery = address?.value.replace(/\n/g, ", ") ?? "Yayasan Putra Prabu Indonesia Raya";
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;

  return (
    <MainLayout>
      <ContactAnimatedWrapper>
        <FadeInSection className="mb-section-padding text-center relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10 rounded-3xl blur-3xl opacity-50"></div>
          <h1 className="font-display-lg text-display-lg text-primary mb-4">
            Hubungi Kami
          </h1>
          <p className="font-body-md text-body-md text-secondary max-w-2xl mx-auto">
            Kami siap mendengarkan dan menjalin silaturahmi. Silakan hubungi
            kami melalui formulir di bawah ini atau kunjungi kantor kami.
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Contact Form Area */}
          <ContactFormPart/>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <ContactInfoPart contactInfo={contactInfo} />
          </div>
        </div>

        {/* Google Maps */}
        <FadeInSection className="mt-section-padding w-full h-[400px] rounded-3xl border border-outline-variant/30 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)] transition-shadow duration-500">
          <iframe
            src={mapSrc}
            title="Lokasi Yayasan Putra Prabu Indonesia Raya"
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </FadeInSection>
      </ContactAnimatedWrapper>
    </MainLayout>
  );
}
