"use client";
import MainLayout from "@/components/layout/MainLayout";
import ContactFormPart from "@/sections/Contact/ContactFormPart";
import ContactInfoPart from "@/sections/Contact/ContactInfoPart";
import { motion } from "motion/react";
import Image from "next/image";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function Contact() {
  return (
    <MainLayout>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-padding"
      >
        <motion.div
          variants={fadeIn}
          className="mb-section-padding text-center relative"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10 rounded-3xl blur-3xl opacity-50"></div>
          <h1 className="font-display-lg text-display-lg text-primary mb-4">
            Hubungi Kami
          </h1>
          <p className="font-body-md text-body-md text-secondary max-w-2xl mx-auto">
            Kami siap mendengarkan dan menjalin silaturahmi. Silakan hubungi
            kami melalui formulir di bawah ini atau kunjungi kantor kami.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Contact Form Area */}
          <ContactFormPart/>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <ContactInfoPart />
          </div>
        </div>

        {/* Google Maps Placeholder */}
        <motion.div
          variants={fadeIn}
          className="mt-section-padding w-full h-[400px] rounded-3xl border border-outline-variant/30 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative bg-surface-variant flex items-center justify-center group cursor-pointer hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)] transition-all duration-500"
        >
          <Image
            width={200}
            height={200}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi13XsottiEwXDK7uENcO9demKzQkgl97f0zkc7eeTsgWq1ZARdm2pGrVrXjnHcPC1HHcJsB3jGBLgruhtRx0mMQC0NjpnsjmsaedvR6ZeUGjnPX8jp9sJGOMUYcyq2h-BSIDF-3hTpZi3yzDPGFRkImgAmNFLPO18-zCVjD8jI0pm3KBSUv0U-Zuva_AwQ3K3b9C4Wi-hOmNr-Lx0O4FZAuomxssj_4Oxougm5oaYcxI-XD5GimAh"
            alt="Map Location"
            className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
          />
          <div className="relative z-10 bg-surface-container-lowest/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-outline-variant/50 text-center group-hover:-translate-y-2 transition-transform duration-300">
            <span className="material-symbols-outlined text-primary mb-2 text-4xl group-hover:scale-110 transition-transform">
              pin_drop
            </span>
            <p className="font-label-sm text-label-sm text-secondary font-semibold">
              Jl. Sejahtera No. 21, Medan
            </p>
          </div>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
