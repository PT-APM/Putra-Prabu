"use client"
import Link from "next/link";
import { motion } from "motion/react";
import { NewsArticle } from '@/types';
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

interface ArticlesPartProps {
    featuredArticle : NewsArticle,
    regularArticles : NewsArticle[]

}

export default function ArticlesPart({featuredArticle, regularArticles} : ArticlesPartProps){
    return <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-padding">
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <h1 className="font-display-lg text-display-lg text-primary mb-6 drop-shadow-sm">Berita & Artikel</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Menyajikan informasi terkini mengenai kegiatan yayasan, perkembangan pendidikan Islam, kesejahteraan umat, serta inovasi teknologi yang selaras dengan nilai-nilai luhur.
          </p>
        </motion.section>

        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-section-padding"
        >
          {/* Featured Article */}
          {featuredArticle && (
            <motion.article variants={fadeIn} className="md:col-span-8 bg-surface-container-lowest rounded-3xl border border-outline-variant/30 overflow-hidden flex flex-col relative group transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <Link href={`/news/${featuredArticle.id}`} className="block h-full w-full flex flex-col">
                <div className="h-80 w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 z-10"></div>
                  <Image width={100} height={100} src={featuredArticle.imageUrl} alt={featuredArticle.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 bg-primary text-on-primary px-4 py-1.5 rounded-full font-label-sm text-label-sm shadow-md z-20">{featuredArticle.category}</div>
                </div>
                <div className="p-8 flex flex-col flex-grow justify-between relative z-20">
                  <div>
                    <time className="font-label-sm text-label-sm text-secondary mb-3 block bg-secondary/10 w-max px-3 py-1 rounded-full">{featuredArticle.date}</time>
                    <h2 className="font-headline-lg text-headline-lg md:font-display-lg md:text-headline-lg text-primary mb-4 leading-tight group-hover:text-primary-container transition-colors">{featuredArticle.title}</h2>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-3">{featuredArticle.summary}</p>
                  </div>
                  <span className="inline-flex items-center text-primary font-label-sm text-label-sm mt-auto group-hover:gap-2 transition-all">
                    Baca Selengkapnya
                    <span className="material-symbols-outlined ml-1 text-[16px]">arrow_forward</span>
                  </span>
                </div>
              </Link>
            </motion.article>
          )}

          {/* Secondary Articles */}
          <div className="md:col-span-4 flex flex-col gap-gutter">
             {regularArticles.slice(0,1).map(article => (
              <motion.article variants={fadeIn} key={article.id} className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 overflow-hidden flex flex-col group h-full transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <Link href={`/news/${article.id}`} className="block h-full w-full flex flex-col">
                  <div className="h-48 w-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 z-10"></div>
                    <Image width={100} height={100} src={article.imageUrl} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-4 left-4 bg-secondary text-on-primary px-3 py-1.5 rounded-full font-label-sm text-label-sm shadow-sm z-20">{article.category}</div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow justify-between relative z-20">
                    <div>
                      <time className="font-label-sm text-label-sm text-secondary mb-2 block">{article.date}</time>
                      <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-3 group-hover:text-primary-container transition-colors">{article.title}</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-3">{article.summary}</p>
                    </div>
                    <span className="inline-flex items-center text-primary font-label-sm text-label-sm mt-auto group-hover:gap-2 transition-all">
                      Baca Selengkapnya
                      <span className="material-symbols-outlined ml-1 text-[16px]">arrow_forward</span>
                    </span>
                  </div>
                </Link>
              </motion.article>
             ))}
          </div>

          {/* Remaining Articles */}
          {regularArticles.slice(1).map(article => (
            <motion.article variants={fadeIn} key={article.id} className="md:col-span-4 bg-surface-container-lowest rounded-3xl border border-outline-variant/30 overflow-hidden flex flex-col group mt-4 md:mt-0 transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <Link href={`/news/${article.id}`} className="block h-full w-full flex flex-col">
                <div className="h-48 w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 z-10"></div>
                  <Image width={100} height={100} src={article.imageUrl} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 bg-tertiary text-on-primary px-3 py-1.5 rounded-full font-label-sm text-label-sm shadow-sm z-20">{article.category}</div>
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between relative z-20">
                  <div>
                    <time className="font-label-sm text-label-sm text-secondary mb-2 block">{article.date}</time>
                    <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-3 group-hover:text-primary-container transition-colors">{article.title}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-3">{article.summary}</p>
                  </div>
                  <span className="inline-flex items-center text-primary font-label-sm text-label-sm mt-auto group-hover:gap-2 transition-all">
                    Baca Selengkapnya
                    <span className="material-symbols-outlined ml-1 text-[16px]">arrow_forward</span>
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.section>

        {/* Pagination */}
        <section className="flex justify-center items-center space-x-2 mt-8">
          <button className="w-10 h-10 rounded-full border border-outline-variant/60 flex items-center justify-center text-secondary disabled:opacity-50 transition-colors shadow-sm bg-surface-container-lowest" disabled>
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-label-sm text-label-sm flex items-center justify-center shadow-md">1</button>
          <button className="w-10 h-10 rounded-full border border-outline-variant/60 text-on-surface-variant font-label-sm text-label-sm flex items-center justify-center hover:bg-surface-variant transition-all shadow-sm bg-surface-container-lowest">2</button>
          <span className="text-secondary px-2">...</span>
          <button className="w-10 h-10 rounded-full border border-outline-variant/60 flex items-center justify-center text-secondary hover:text-primary hover:border-primary transition-all shadow-sm bg-surface-container-lowest hover:bg-surface-variant">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </section>
      </div>
}