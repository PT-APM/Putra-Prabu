"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import type { Leader } from "@/types";
import Link from "next/link";
import { localeHref } from "@/lib/i18n/path";

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

function PersonTag({ name, role }: { name: string; role: string }) {
  return (
    <div className="text-center">
      <p className="font-headline-lg-mobile text-[18px] leading-[24px] text-on-primary mb-1">
        {name}
      </p>
      <p className="font-label-sm text-label-sm text-on-primary/70 uppercase tracking-widest">
        {role}
      </p>
    </div>
  );
}

export default function HeroPart({
  locale,
  chairman,
}: {
  locale: Locale;
  chairman?: Leader;
}) {
  
  const dict = getDictionary(locale);
  const { detailButton, list: ponpesList } = dict.about.pimpinanPonpes;
  return (
    <section className="relative w-full min-h-[90vh] flex items-end justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/leadership/hari_pimpinan_ponpes_new.png"
          alt={dict.about.hero.title}
          fill
          priority
          sizes="100vw"
          style={{ objectPosition: "center top" }}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/55 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-gutter pt-40 pb-14 md:pb-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.h1
            variants={fadeIn}
            className="font-display-lg text-display-lg text-on-primary drop-shadow-sm mb-6"
          >
            {dict.about.hero.title}
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="font-body-md text-body-md text-on-primary/85"
          >
            {dict.about.hero.description}
          </motion.p>

          {chairman && (
            <motion.div
              variants={fadeIn}
              className="flex justify-center mt-10 pt-8 border-t border-on-primary/20"
            >
              <PersonTag name={chairman.name} role={chairman.role} />
            </motion.div>
          )}

          <motion.div
            variants={fadeIn}
            className={`grid gap-5 mt-8 ${
              ponpesList.length > 1 ? "sm:grid-cols-2" : "grid-cols-1"
            }`}
          >
            {ponpesList.map((ponpes) => (
              <div
                key={ponpes.slug}
                className="flex flex-col items-center gap-4 bg-on-primary/10 border border-on-primary/15 rounded-2xl p-6"
              >
                <p className="font-headline-lg-mobile text-[16px] leading-[22px] text-on-primary text-center">
                  {ponpes.name}
                </p>
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                  {ponpes.people.map((person) => (
                    <PersonTag key={person.name} name={person.name} role={person.role} />
                  ))}
                </div>
                <Link
                  href={localeHref(locale, `/ponpes/${ponpes.slug}`)}
                  className="mt-1 inline-flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-full font-label-sm text-label-sm shadow-soft hover:shadow-soft-hover transition-all"
                >
                  {detailButton}
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </Link>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
