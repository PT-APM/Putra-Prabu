"use client";
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

export default function PimpinanPonpesPart() {
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
            Pimpinan Pondok Pesantren
          </h2>
          <p className="font-body-md text-body-md text-secondary max-w-2xl mx-auto">
            Sosok teladan yang membimbing santri dan mengawal syiar dakwah
            Pondok Pesantren Yayasan Putra Prabu Indonesia Raya.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            variants={fadeIn}
            className="relative rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-outline-variant/30 bg-[#0b3d2c]"
          >
            <div className="relative w-full aspect-[4/3] md:aspect-[16/9]">
              <Image
                src="/img/leadership/pimpinan_ponpes.png"
                alt="Pimpinan Pondok Pesantren Yayasan Putra Prabu Indonesia Raya"
                fill
                loading="eager"
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-contain"
              />
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="grid grid-cols-2 gap-4 mt-10"
          >
            <div className="text-center md:text-left px-2">
              <h3 className="font-headline-lg text-[20px] leading-[28px] text-primary mb-2">
                Abu Kuta Krueng
              </h3>
              <p className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                Pimpinan Pondok Pesantren (Alm.)
              </p>
            </div>
            <div className="text-center md:text-right px-2">
              <h3 className="font-headline-lg text-[20px] leading-[28px] text-primary mb-2">
                Teuku Anwar Kuta Krueng
              </h3>
              <p className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                Pimpinan Pondok Pesantren
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
