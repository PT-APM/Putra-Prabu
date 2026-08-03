"use client"
import { motion } from 'motion/react';
import Link from 'next/link';
import {Service} from '@/types'
import { getDictionary } from '@/lib/i18n/dictionaries';
import { localeHref } from '@/lib/i18n/path';
import type { Locale } from '@/lib/i18n/config';

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

interface ServicesProps {
    services : Service[]
    locale: Locale
}

export default function ServicesPart({services, locale} : ServicesProps){
    const dict = getDictionary(locale);
    const { cards } = dict.home.services;
    return       <section className="py-section-padding px-margin-mobile md:px-12 xl:px-20 w-full max-w-none relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent -z-10 rounded-3xl mx-4 md:mx-0"></div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="text-center mb-16 space-y-4 pt-8"
        >
          <h2 className="font-headline-lg text-headline-lg text-primary">{dict.home.services.heading}</h2>
          <p className="font-body-md text-body-md text-secondary max-w-2xl mx-auto">{dict.home.services.intro}</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]"
        >
          {/* Main Service Card */}
          <motion.div variants={fadeIn} className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden group cursor-pointer border border-white/40 shadow-soft hover:shadow-soft-hover transition-all duration-500 block h-full">
            <Link href={localeHref(locale, '/about')} className="block w-full h-full">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${services[1]?.imageUrl || ''}')` }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-10 w-full">
                <div className="flex items-center gap-2 mb-3 bg-white/10 w-max px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20 shadow-sm">
                  <span className="material-symbols-outlined text-on-primary text-sm">school</span>
                  <span className="font-label-sm text-label-sm text-on-primary uppercase tracking-wider">{cards.education.tag}</span>
                </div>
                <h3 className="font-headline-lg text-headline-lg text-on-primary mb-3 drop-shadow-md">{cards.education.title}</h3>
                <p className="font-body-md text-body-md text-on-primary/90 line-clamp-2 md:line-clamp-none max-w-md drop-shadow-sm">{cards.education.description}</p>
              </div>
            </Link>
          </motion.div>

          {/* Secondary Service Card 1 */}
          <motion.div variants={fadeIn} className="relative rounded-3xl overflow-hidden group cursor-pointer border border-white/40 shadow-soft hover:shadow-soft-hover transition-all duration-500 block h-full">
            <Link href={localeHref(locale, '/about')} className="block w-full h-full">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${services[2]?.imageUrl || ''}')` }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 to-primary/20"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex items-center gap-2 mb-3 bg-white/10 w-max p-2 rounded-full backdrop-blur-md border border-white/20 shadow-sm">
                  <span className="material-symbols-outlined text-on-primary">biotech</span>
                </div>
                <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-primary mb-2 drop-shadow-md">{cards.research.title}</h3>
                <p className="font-body-md text-body-md text-on-primary/90 text-sm drop-shadow-sm">{cards.research.description}</p>
              </div>
            </Link>
          </motion.div>

          {/* Secondary Service Card 2 */}
          <motion.div variants={fadeIn} className="relative rounded-3xl overflow-hidden group cursor-pointer border border-white/40 shadow-soft hover:shadow-soft-hover transition-all duration-500 block h-full">
            <Link href={localeHref(locale, '/about')} className="block w-full h-full">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBft8uM98L59FUmhX3CvlL24IleobWviJxPHAJ5lX9eHkPMQQLneDn6UUQECHVt9_ng1YZp8bADFpMqFGD_k0134VT0Fbjg86m96j9aykfH-7YbXf_02D1sWKxSkVk9y5YNpqD-g88sJ6ucyrciw9RdwGkYNNn2zboxygpkC_lJ6GXeSMkhnQH3-6cGI7Fp40POyg1AsFJpYgmXSDo4zAONoxVbQm51NzeOSIvOwegFwlo3N4NwwAWb')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 to-primary/20"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex items-center gap-2 mb-3 bg-white/10 w-max p-2 rounded-full backdrop-blur-md border border-white/20 shadow-sm">
                  <span className="material-symbols-outlined text-on-primary">restaurant</span>
                </div>
                <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-primary mb-2 drop-shadow-md">{cards.catering.title}</h3>
                <p className="font-body-md text-body-md text-on-primary/90 text-sm drop-shadow-sm">{cards.catering.description}</p>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </section>
}