"use client";
import { motion } from "motion/react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import PonpesCard from "@/sections/Ponpes/PonpesCard";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function PonpesSummaryPart({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const { heading, intro, detailButton, list } = dict.about.pimpinanPonpes;

  return (
    <section className="section-gradient-reverse border-t border-outline-variant/30 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDQ1MjgiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NEgwdjJoNHY0aDJ2LTRoNHYtMkg2ek02IDRWMEg0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50 pointer-events-none"></div>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-padding relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="mb-16 text-center"
        >
          <h2 className="font-headline-lg text-headline-lg text-primary mb-4">
            {heading}
          </h2>
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
