"use client"
import { NewsArticle } from '@/types';
import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';

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

interface NewsDetailPartProps {
    article : NewsArticle,
    relatedNews : NewsArticle[],
    paragraphs : string[]
}

export default function NewsDetailPart({article, relatedNews, paragraphs} : NewsDetailPartProps){
      return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-padding w-full"
    >
      
      {/* Article Header */}
      <motion.header variants={fadeIn} className="max-w-3xl mx-auto mb-12 text-center">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider bg-surface-container-highest px-3 py-1 rounded-full shadow-sm">{article.category}</span>
          <span className="text-outline mx-2">•</span>
          <time className="font-label-sm text-label-sm text-secondary">{article.date}</time>
        </div>
        <h1 className="font-display-lg text-display-lg text-on-background mb-6 leading-tight drop-shadow-sm">{article.title}</h1>
        <p className="text-secondary text-lg">{article.summary}</p>
      </motion.header>

      {/* Hero Image */}
      <motion.div variants={fadeIn} className="w-full mb-16 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative group">
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 z-10"></div>
        <Image width={200} height={200} src={article.imageUrl} alt={article.title} className="w-full h-auto object-cover max-h-[600px] group-hover:scale-105 transition-transform duration-700" />
      </motion.div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Article Body */}
        <motion.article variants={fadeIn} className="lg:col-span-8 prose prose-lg prose-slate prose-headings:font-display-lg prose-headings:text-primary max-w-none prose-a:text-primary hover:prose-a:text-primary-container prose-img:rounded-3xl">
          {paragraphs.map((para, index) => {
            // Simple heuristic to style subheadings in plain text
            if (para.length < 60 && !para.endsWith('.')) {
              return <h2 key={index} className="text-2xl font-semibold mt-10 mb-6 text-on-background">{para}</h2>;
            }
            if (index === 0) {
               return <p key={index} className="lead text-xl text-on-surface-variant font-medium mb-8">{para}</p>;
            }
            // Blockquote styling simulation
            if (para.startsWith('"') && para.endsWith('"')) {
              return (
                <div key={index} className="bg-surface-container-low border border-outline-variant p-8 rounded-2xl my-10 geometric-bg relative overflow-hidden shadow-sm">
                  <span className="material-symbols-outlined text-4xl text-primary opacity-20 absolute top-4 right-4">format_quote</span>
                  <p className="text-xl italic text-on-surface-variant relative z-10 m-0">{para}</p>
                </div>
              );
            }
            return <p key={index} className="mb-6 text-secondary leading-relaxed">{para}</p>;
          })}

          {/* Share Section */}
          <div className="flex items-center space-x-6 border-t border-outline-variant pt-8 mt-12">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Bagikan Artikel Ini:</span>
            <div className="flex space-x-4">
              <button className="w-10 h-10 rounded-full border border-outline-variant/60 flex items-center justify-center text-secondary hover:text-primary hover:border-primary transition-all bg-surface-container-lowest shadow-sm hover:shadow-md active:scale-95">
                <span className="material-symbols-outlined">share</span>
              </button>
              <button className="w-10 h-10 rounded-full border border-outline-variant/60 flex items-center justify-center text-secondary hover:text-primary hover:border-primary transition-all bg-surface-container-lowest shadow-sm hover:shadow-md active:scale-95">
                <span className="material-symbols-outlined">link</span>
              </button>
            </div>
          </div>
        </motion.article>

        {/* Sidebar / Related News */}
        <aside className="lg:col-span-4">
          <motion.div variants={fadeIn} className="sticky top-28 bg-surface-container-lowest border border-outline-variant/40 rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.04)]">
            <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-primary border-b border-outline-variant/50 pb-4 mb-6">Berita Terkait</h3>
            <div className="space-y-6">
              {relatedNews.map(news => (
                <Link href={`/news/${news.id}`} key={news.id} className="group block">
                  <article className="flex gap-4">
                    <div className="w-24 h-24 shrink-0 rounded-xl bg-surface-variant overflow-hidden relative">
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 z-10"></div>
                      <div className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url('${news.imageUrl}')` }}></div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="font-label-sm text-label-sm text-secondary mb-1">{news.date}</span>
                      <h4 className="font-body-md text-body-md font-semibold text-on-background group-hover:text-primary transition-colors line-clamp-2">{news.title}</h4>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </motion.div>
        </aside>
      </div>
    </motion.div>
      )
}