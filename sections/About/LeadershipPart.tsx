"use client";
import { motion } from "motion/react";
import { Leader } from "@/types";
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

interface LeadershipPartProps {
  pembina: Leader;
  pengawas: Leader;
  pengurusHarian: Leader[];
}

export default function LeadershipPart({
  pembina,
  pengawas,
  pengurusHarian,
}: LeadershipPartProps) {
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
            Struktur Kepemimpinan
          </h2>
          <p className="font-body-md text-body-md text-secondary max-w-2xl mx-auto">
            Tokoh-tokoh berdedikasi yang mengarahkan Yayasan Putra Prabu
            Indonesia Raya dengan amanah dan profesionalisme.
          </p>
        </motion.div>

        {/* Pembina & Pengawas (Top Tier) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto"
        >
          {[pembina, pengawas].map((leader) => {
            return (
              leader && (
                <motion.div
                  variants={fadeIn}
                  key={leader.id}
                  className="group relative overflow-hidden rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    <Image
                      width={200}
                      height={200}
                      src={leader.imageUrl}
                      loading="eager"
                      alt={leader.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="inline-block px-4 py-1.5 bg-surface-container-lowest/90 backdrop-blur-md text-primary rounded-full font-label-sm text-label-sm shadow-sm border border-outline-variant/20">
                        Dewan {leader.group}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 text-center bg-surface-container-lowest relative z-20">
                    <h3 className="font-headline-lg text-[22px] leading-[28px] text-primary mb-2">
                      {leader.name}
                    </h3>
                    <p className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                      {leader.role}
                    </p>
                  </div>
                </motion.div>
              )
            );
          })}
        </motion.div>

        {/* Pengurus Harian */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {pengurusHarian.map((leader) => {
            return (
              <motion.div
                variants={fadeIn}
                key={leader.id}
                className="group relative overflow-hidden rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <Image
                    width={200}
                    height={200}
                    src={leader.imageUrl}
                    loading="eager"
                    alt={leader.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="inline-block px-4 py-1.5 bg-surface-container-lowest/90 backdrop-blur-md text-primary rounded-full font-label-sm text-label-sm shadow-sm border border-outline-variant/20">
                      {leader.group}
                    </span>
                  </div>
                </div>
                <div className="p-6 text-center bg-surface-container-lowest relative z-20">
                  <h3 className="font-headline-lg text-[20px] leading-[28px] text-primary mb-2">
                    {leader.name}
                  </h3>
                  <p className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                    {leader.role}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
