"use client";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { localeHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/config";
import type { PonpesInfo } from "@/types";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function PonpesCard({
  locale,
  ponpes,
  detailButton,
}: {
  locale: Locale;
  ponpes: PonpesInfo;
  detailButton: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeIn}
      className="overflow-hidden rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col"
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <Image
          src={ponpes.images[0]}
          alt={ponpes.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="p-8 flex flex-col flex-1">
        <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-1">
          {ponpes.name}
        </h3>
        <p className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-4">
          {ponpes.location}
        </p>
        {ponpes.history && (
          <p className="font-body-md text-body-md text-on-background leading-relaxed mb-6">
            {ponpes.history}
          </p>
        )}
        <Link
          href={localeHref(locale, `/ponpes/${ponpes.slug}`)}
          className="self-start mt-auto inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-full font-label-sm text-label-sm shadow-soft hover:shadow-soft-hover transition-all"
        >
          {detailButton}
          <span className="material-symbols-outlined text-[20px]">
            arrow_forward
          </span>
        </Link>
      </div>
    </motion.div>
  );
}
