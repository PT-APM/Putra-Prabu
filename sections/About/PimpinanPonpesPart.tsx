"use client";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

const PONPES_MAPS_URL = "https://maps.app.goo.gl/DYM7PN8ehdu2SMfX8";

const GALLERY_IMAGES = [
  "/img/Foto Ponpes/cover.webp",
  "/img/Foto Ponpes/1.webp",
  "/img/Foto Ponpes/2.webp",
  "/img/Foto Ponpes/3.webp",
  "/img/Foto Ponpes/4.webp",
  "/img/Foto Ponpes/5.webp",
];

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

function PonpesGallery({ alt }: { alt: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i: number) => {
    setIndex((i + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="relative rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-outline-variant/30 bg-[#0b3d2c]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative w-full aspect-[4/3] md:aspect-[16/9]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={GALLERY_IMAGES[index]}
              alt={`${alt} ${index + 1}`}
              fill
              loading={index === 0 ? "eager" : "lazy"}
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          aria-label="Previous photo"
          onClick={() => goTo(index - 1)}
          className="absolute start-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
        >
          <span className="material-symbols-outlined text-[22px]">
            chevron_left
          </span>
        </button>
        <button
          type="button"
          aria-label="Next photo"
          onClick={() => goTo(index + 1)}
          className="absolute end-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
        >
          <span className="material-symbols-outlined text-[22px]">
            chevron_right
          </span>
        </button>

        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2">
          {GALLERY_IMAGES.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Go to photo ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PimpinanPonpesPart({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const { ponpes, peopleHeading } = dict.about.pimpinanPonpes;
  const [firstPerson, secondPerson] = dict.about.pimpinanPonpes.people;

  return (
    <section className="section-gradient border-t border-outline-variant/30 relative overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-padding relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="mb-16 text-center"
        >
          <h2 className="font-headline-lg text-headline-lg text-primary mb-4">
            {dict.about.pimpinanPonpes.heading}
          </h2>
          <p className="font-body-md text-body-md text-secondary max-w-2xl mx-auto">
            {dict.about.pimpinanPonpes.intro}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          {/* Photo Slider */}
          <motion.div variants={fadeIn}>
            <PonpesGallery alt={ponpes.name} />
          </motion.div>

          {/* Ponpes Info */}
          <motion.div
            variants={fadeIn}
            className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-8 shadow-[0_4px_20px_rgb(0,0,0,0.04)] mt-8"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
              <div>
                <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-1">
                  {ponpes.name}
                </h3>
                <p className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                  {ponpes.location}
                </p>
              </div>
              <a
                href={PONPES_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-full font-label-sm text-label-sm shadow-soft hover:shadow-soft-hover transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">
                  location_on
                </span>
                {ponpes.locationButton}
              </a>
            </div>

            <p className="font-body-md text-body-md text-on-background leading-relaxed mb-6">
              {ponpes.history}
            </p>

            <div className="mb-6">
              <p className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-2">
                {ponpes.addressLabel}
              </p>
              <p className="font-body-md text-body-md text-on-background">
                {ponpes.address}
              </p>
            </div>

            <div>
              <p className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-3">
                {ponpes.facilitiesLabel}
              </p>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ponpes.facilities.map((facility) => (
                  <li key={facility} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[18px] mt-0.5 text-primary shrink-0">
                      check_circle
                    </span>
                    <span className="font-body-md text-body-md text-on-background">
                      {facility}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Pimpinan */}
          <motion.div variants={fadeIn} className="mt-10">
            <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-6 text-center">
              {peopleHeading}
            </h3>
            <div className="relative rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-outline-variant/30 bg-[#0b3d2c]">
              <div className="relative w-full aspect-[4/3] md:aspect-[16/9]">
                <Image
                  src="/img/leadership/pimpinan_ponpes.png"
                  alt="Pimpinan Pondok Pesantren Yayasan Putra Prabu Indonesia Raya"
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 896px"
                  className="object-contain"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-10">
              <div className="text-center md:text-start px-2">
                <h4 className="font-headline-lg text-[20px] leading-[28px] text-primary mb-2">
                  {firstPerson.name}
                </h4>
                <p className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                  {firstPerson.role}
                </p>
              </div>
              <div className="text-center md:text-end px-2">
                <h4 className="font-headline-lg text-[20px] leading-[28px] text-primary mb-2">
                  {secondPerson.name}
                </h4>
                <p className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                  {secondPerson.role}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
