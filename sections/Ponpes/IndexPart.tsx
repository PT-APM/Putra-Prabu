"use client";
import { motion } from "motion/react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import PonpesCard from "./PonpesCard";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function PonpesIndexPart({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const { heading, intro, detailButton, list } = dict.about.pimpinanPonpes;

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
          <h1 className="font-headline-lg text-headline-lg text-primary mb-4">
            {heading}
          </h1>
          <p className="font-body-md text-body-md text-secondary max-w-2xl mx-auto">
            {intro}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {list.map((ponpes) => (
            <PonpesCard
              key={ponpes.slug}
              locale={locale}
              ponpes={ponpes}
              detailButton={detailButton}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
