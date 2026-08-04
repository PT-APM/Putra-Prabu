"use client";
import { motion } from "motion/react";
import { Leader } from "@/types";
import Image from "next/image";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

interface LeadershipPartProps {
  pembina: Leader;
  pengawas: Leader;
  pengurusHarian: Leader[];
  locale: Locale;
}

export default function LeadershipPart({
  pembina,
  pengawas,
  pengurusHarian,
  locale,
}: LeadershipPartProps) {
  const dict = getDictionary(locale);

  const chairman = [pembina, pengawas, ...pengurusHarian].find(
    (leader) => leader?.name === "Hari Mulyono"
  );

  if (!chairman) return null;

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
            {dict.about.leadership.heading}
          </h2>
          <p className="font-body-md text-body-md text-secondary max-w-2xl mx-auto">
            {dict.about.leadership.intro}
          </p>
        </motion.div>

        {/* Ketua - Welcome Message */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            <div className="aspect-[4/3] md:aspect-auto relative overflow-hidden">
              <Image
                width={400}
                height={400}
                src={chairman.imageUrl}
                loading="eager"
                alt={chairman.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <span className="inline-block mb-3 font-label-sm text-label-sm text-primary uppercase tracking-widest">
                {dict.about.leadership.welcomeLabel}
              </span>
              <p className="font-body-md text-body-md text-secondary leading-relaxed mb-6">
                {dict.about.leadership.welcomeMessage}
              </p>
              <div>
                <h3 className="font-headline-lg text-[22px] leading-[28px] text-primary mb-1">
                  {chairman.name}
                </h3>
                <p className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                  {chairman.role}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
