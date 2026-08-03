"use client";
import { motion } from 'motion/react';
import type { ContactInfo } from '@/types';
import { getDictionary } from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/config';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

interface ContactInfoPartProps {
  contactInfo: ContactInfo[];
  locale: Locale;
}

export default function ContactInfoPart({ contactInfo, locale }: ContactInfoPartProps) {
  const dict = getDictionary(locale);
  return (
    <>
      <motion.div
        variants={fadeIn}
        className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-8 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow"
      >
        <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-6">
          {dict.contact.info.heading}
        </h3>
        <div className="space-y-6">
          {contactInfo.map((item) => (
            <div key={item.id} className="flex items-start group">
              <div className="bg-surface-container-low p-3 rounded-xl me-4 group-hover:bg-primary/10 group-hover:scale-110 transition-all">
                <span className="material-symbols-outlined text-primary mt-0.5 block">
                  {item.icon}
                </span>
              </div>
              <div>
                <h4 className="font-label-sm text-label-sm text-secondary mb-1">
                  {item.label}
                </h4>
                <p className="font-body-md text-body-md text-on-background group-hover:text-primary transition-colors whitespace-pre-line">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Mission Card */}
      <motion.div
        variants={fadeIn}
        className="bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-3xl p-8 shadow-xl relative overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
      >
        <div className="absolute -top-24 -end-24 w-48 h-48 bg-white opacity-5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
        <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-inverse-primary mb-4 relative z-10 drop-shadow-sm">
          {dict.contact.info.missionHeading}
        </h3>
        <p className="font-body-md text-body-md text-white leading-relaxed relative z-10 mb-5">
          {dict.contact.info.missionText}
        </p>
        <ul className="space-y-3 relative z-10">
          {dict.contact.info.missionPoints.map((point) => (
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
    </>
  );
}
