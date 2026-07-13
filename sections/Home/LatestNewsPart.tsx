"use client"
import { NewsArticle } from '@/types';
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

interface LatestNewsPartProps {
    latestNews : NewsArticle[]
}

export default function LatestNewsPart({latestNews} : LatestNewsPartProps){
    return  <section className="bg-gradient-to-b from-surface-container-lowest via-surface to-surface-container-lowest py-section-padding px-gutter border-t border-outline-variant/30 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-container-max mx-auto relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
            className="flex justify-between items-end mb-12 border-b border-outline-variant/50 pb-4"
          >
            <h2 className="font-headline-lg text-headline-lg text-primary">Berita Terkini</h2>
            <Link href="/news" className="font-label-sm text-label-sm text-primary hover:text-primary-container transition-colors flex items-center gap-1 bg-surface-variant/50 px-4 py-2 rounded-full shadow-sm hover:shadow-soft">
              Lihat Semua <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {latestNews.map((news) => (
              <motion.div variants={fadeIn} key={news.id} className="h-full">
                <Link href={`/news/${news.id}`} className="group bg-surface-container-lowest border border-white/60 rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-hover hover:-translate-y-1 transition-all duration-300 block h-full flex flex-col">
                  <div className="w-full aspect-video bg-cover bg-center border-b border-outline-variant/20 relative" style={{ backgroundImage: `url('${news.imageUrl}')` }}>
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300"></div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <span className="font-label-sm text-label-sm text-secondary/80 block mb-3 bg-secondary/10 w-max px-3 py-1 rounded-full">{news.date}</span>
                    <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-3 group-hover:text-primary-container transition-colors">{news.title}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3 mt-auto">{news.summary}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
}