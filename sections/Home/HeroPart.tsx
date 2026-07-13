"use client";
import { motion } from 'motion/react';
import Link from 'next/link';
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};
export default function HeroPart() {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-surface-container-low to-background">
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCNqxTY2up0gtlwyEP7T8hg3jo0w8SUyuxwF_piBjkRvuU4zbKPZNNN6CL_BW8Tt04TuFUqh0U1egAvedxvhuwi8cQwqmNJ_vmHvnBj5x4Bv1eSM-Y8b1VCSUQjZcqbxnlRx0JCE0ArKMYF-XIfVs3hrbZoSf9pl_T5JeT-FAiaw5trSGsjG2daT7OrxWt7zWn3TU6DxXfyxxEt7sLC80ThBeUOrMS9w4rVWf9iv0NJK0jPJ_q6ns_J')",
          }}
        ></motion.div>
        <div className="absolute inset-0 bg-background/0 md:bg-gradient-to-r md:from-background/95 md:via-background/90 md:to-background/20 backdrop-blur-[2px]"></div>
      </div>
      <div className="relative z-10 w-full max-w-container-max mx-auto px-gutter py-section-padding flex flex-col md:flex-row items-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="w-full md:w-1/2 space-y-6"
        >
          <motion.h1
            variants={fadeIn}
            className="font-display-lg text-display-lg text-primary drop-shadow-sm"
          >
            Membangun Generasi Unggul Berlandaskan Nilai Islam
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="font-body-md text-body-md text-on-surface-variant max-w-lg"
          >
            Yayasan Putra Prabu Indonesia Raya berkomitmen untuk menyediakan
            pendidikan berkualitas, inovasi teknologi, dan layanan masyarakat
            yang berintegritas tinggi.
          </motion.p>
          <motion.div variants={fadeIn} className="flex gap-4 pt-4">
            <Link
              href="/about"
              className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-sm text-label-sm shadow-soft hover:shadow-soft-hover transition-all border border-transparent inline-block"
            >
              Jelajahi Program
            </Link>
            <Link
              href="/about"
              className="bg-surface-container-lowest/50 backdrop-blur-sm text-primary px-8 py-3 rounded-full font-label-sm text-label-sm hover:bg-surface-variant/80 transition-all border border-primary/20 hover:border-primary shadow-sm inline-block"
            >
              Tentang Kami
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
