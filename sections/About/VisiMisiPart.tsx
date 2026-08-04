"use client";
import { motion } from "motion/react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

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

export default function VisiMisiPart({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const { visiMisi } = dict.about;

  return (
    <section className="section-gradient border-t border-outline-variant/30">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-padding">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="mb-14 text-center"
        >
          <h2 className="font-headline-lg text-headline-lg text-primary mb-4">
            {visiMisi.heading}
          </h2>
          <p className="font-body-md text-body-md text-secondary max-w-2xl mx-auto">
            {visiMisi.intro}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {/* Visi Card */}
          <motion.div
            variants={fadeIn}
            className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-8 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow"
          >
            <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-4">
              {visiMisi.visiLabel}
            </h3>
            <p className="font-body-md text-body-md text-on-background leading-relaxed">
              {visiMisi.visiText}
            </p>
          </motion.div>

          {/* Misi Card */}
          <motion.div
            variants={fadeIn}
            className="bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-3xl p-8 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-300"
          >
            <div className="absolute -top-24 -end-24 w-48 h-48 bg-white opacity-5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-inverse-primary mb-4 relative z-10 drop-shadow-sm">
              {visiMisi.misiLabel}
            </h3>
            <ul className="space-y-3 relative z-10">
              {visiMisi.misiPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[20px] mt-0.5 text-white/90 shrink-0">
                    check_circle
                  </span>
                  <span className="font-body-md text-body-md text-white/95">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
