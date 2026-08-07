"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ImageLightboxProps {
  images: string[];
  initialIndex: number;
  alt: string;
  onClose: () => void;
}

export default function ImageLightbox({
  images,
  initialIndex,
  alt,
  onClose,
}: ImageLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [zoomed, setZoomed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (i: number) => {
      setZoomed(false);
      setIndex((i + images.length) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (images.length > 1) {
        if (e.key === "ArrowLeft") goTo(index - 1);
        if (e.key === "ArrowRight") goTo(index + 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, goTo, onClose, images.length]);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute top-4 end-4 md:top-6 md:end-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
      >
        <span className="material-symbols-outlined text-[24px]">close</span>
      </button>

      <button
        type="button"
        aria-label={zoomed ? "Zoom out" : "Zoom in"}
        onClick={(e) => {
          e.stopPropagation();
          setZoomed((z) => !z);
        }}
        className="absolute top-4 start-4 md:top-6 md:start-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
      >
        <span className="material-symbols-outlined text-[24px]">
          {zoomed ? "zoom_out" : "zoom_in"}
        </span>
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              goTo(index - 1);
            }}
            className="absolute start-3 md:start-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          >
            <span className="material-symbols-outlined text-[26px]">
              chevron_left
            </span>
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              goTo(index + 1);
            }}
            className="absolute end-3 md:end-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          >
            <span className="material-symbols-outlined text-[26px]">
              chevron_right
            </span>
          </button>
        </>
      )}

      <div
        ref={containerRef}
        className="relative w-full h-full max-w-5xl max-h-[85vh] overflow-hidden flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={index}
            src={images[index]}
            alt={`${alt} ${index + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: zoomed ? 2.2 : 1, x: 0, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            drag={zoomed}
            dragConstraints={containerRef}
            dragElastic={0.15}
            dragMomentum={false}
            onTap={() => setZoomed((z) => !z)}
            draggable={false}
            className={`max-w-full max-h-full object-contain select-none ${
              zoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
            }`}
          />
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-4 md:bottom-6 left-0 right-0 flex items-center justify-center gap-2 z-10">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Go to photo ${i + 1}`}
              onClick={(e) => {
                e.stopPropagation();
                goTo(i);
              }}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
