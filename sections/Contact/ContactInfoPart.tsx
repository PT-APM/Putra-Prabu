
import { motion } from 'motion/react';
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function ContactInfoPart() {
  return (
    <>
      <motion.div
        variants={fadeIn}
        className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-8 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow"
      >
        <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-6">
          Informasi Kontak
        </h3>
        <div className="space-y-6">
          <div className="flex items-start group">
            <div className="bg-surface-container-low p-3 rounded-xl mr-4 group-hover:bg-primary/10 group-hover:scale-110 transition-all">
              <span className="material-symbols-outlined text-primary mt-0.5 block">
                location_on
              </span>
            </div>
            <div>
              <h4 className="font-label-sm text-label-sm text-secondary mb-1">
                ALAMAT KANTOR
              </h4>
              <p className="font-body-md text-body-md text-on-background group-hover:text-primary transition-colors">
                Jl. Sejahtera No. 21
                <br />
                Medan, Sumatera Utara
              </p>
            </div>
          </div>
          <div className="flex items-start group">
            <div className="bg-surface-container-low p-3 rounded-xl mr-4 group-hover:bg-primary/10 group-hover:scale-110 transition-all">
              <span className="material-symbols-outlined text-primary mt-0.5 block">
                mail
              </span>
            </div>
            <div>
              <h4 className="font-label-sm text-label-sm text-secondary mb-1">
                EMAIL
              </h4>
              <p className="font-body-md text-body-md text-on-background group-hover:text-primary transition-colors">
                info@yayasputraprabu.or.id
              </p>
            </div>
          </div>
          <div className="flex items-start group">
            <div className="bg-surface-container-low p-3 rounded-xl mr-4 group-hover:bg-primary/10 group-hover:scale-110 transition-all">
              <span className="material-symbols-outlined text-primary mt-0.5 block">
                call
              </span>
            </div>
            <div>
              <h4 className="font-label-sm text-label-sm text-secondary mb-1">
                TELEPON
              </h4>
              <p className="font-body-md text-body-md text-on-background group-hover:text-primary transition-colors">
                +62 61 1234 5678
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mission Card */}
      <motion.div
        variants={fadeIn}
        className="bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-3xl p-8 shadow-xl relative overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 10px, #fff 10px, #fff 20px)",
          }}
        ></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white opacity-5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
        <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-inverse-primary mb-4 relative z-10 drop-shadow-sm">
          Misi Kami
        </h3>
        <p className="font-body-md text-body-md text-white/95 relative z-10">
          Membangun generasi cerdas berakhlak mulia melalui pendidikan yang
          berlandaskan nilai-nilai integritas dan warisan luhur, demi masa depan
          Indonesia yang gemilang dan bermartabat.
        </p>
      </motion.div>
    </>
  );
}
