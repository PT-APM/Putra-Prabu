"use client";
import { motion } from "motion/react";
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
export default function HeroPart() {
  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-16 md:py-24 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10 rounded-3xl blur-3xl opacity-50"></div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.h1
          variants={fadeIn}
          className="font-display-lg text-display-lg text-primary mb-6"
        >
          Membangun Masa Depan Umat
        </motion.h1>
        <motion.p
          variants={fadeIn}
          className="font-body-md text-body-md text-secondary max-w-2xl mx-auto"
        >
          Berdedikasi dalam pendidikan, penelitian, dan pelayanan masyarakat
          dengan landasan nilai-nilai Islam yang kokoh dan integritas yang
          tinggi.
        </motion.p>
      </motion.div>
    </section>
  );
}
