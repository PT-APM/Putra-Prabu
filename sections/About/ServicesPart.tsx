"use client"
import { repository } from '@/lib/repositories';
import { Service } from '@/types';
import { motion } from 'motion/react';
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

interface ServicesPartProps {
  services : Service[]
}

export default function ServicesPart({services} : ServicesPartProps){
    return <section className="section-gradient border-t border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-padding">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
            className="mb-14 text-center"
          >
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Layanan & Unit Usaha</h2>
            <p className="font-body-md text-body-md text-secondary">Menyelenggarakan pendidikan berkualitas dan layanan profesional di Jl sejahtera no 21, Medan.</p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div variants={fadeIn} key={service.id} className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col group shadow-[0_4px_20px_rgb(0,0,0,0.04)]">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 z-10"></div>
                  <Image width={100} height={100} src={service.imageUrl} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 flex flex-col flex-grow relative bg-surface-container-lowest z-20">
                  <h3 className="font-headline-lg text-[24px] leading-[32px] font-semibold text-primary mb-3">{service.title}</h3>
                  <p className="font-body-md text-body-md text-secondary mt-auto">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
}