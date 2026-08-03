"use client";
import { motion } from "motion/react";
import { useContactForm } from "@/hooks/useContactForm";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ContactFormPart({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const { formData, status, errorMessage, handleChange, handleSubmit } = useContactForm(locale);

  return (
    <motion.div
      variants={fadeIn}
      className="lg:col-span-8 bg-surface-container-lowest rounded-3xl border border-outline-variant/30 p-8 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow"
    >
      <h2 className="font-headline-lg text-headline-lg text-primary mb-6 border-b border-outline-variant/50 pb-4">
        {dict.contact.form.heading}
      </h2>

      {status === "success" && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-xl">
          {dict.contact.form.success}
        </div>
      )}
      {status === "error" && (
        <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-xl">
          {errorMessage}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col group">
            <label htmlFor="name" className="font-label-sm text-label-sm text-secondary mb-2 group-focus-within:text-primary transition-colors">
              {dict.contact.form.labels.name}
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder={dict.contact.form.placeholders.name}
              className="border border-outline-variant/60 rounded-xl p-4 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-surface-container-lowest shadow-sm hover:border-primary/50"
            />
          </div>
          <div className="flex flex-col group">
            <label htmlFor="email" className="font-label-sm text-label-sm text-secondary mb-2 group-focus-within:text-primary transition-colors">
              {dict.contact.form.labels.email}
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder={dict.contact.form.placeholders.email}
              className="border border-outline-variant/60 rounded-xl p-4 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-surface-container-lowest shadow-sm hover:border-primary/50"
            />
          </div>
        </div>
        <div className="flex flex-col group">
          <label htmlFor="subject" className="font-label-sm text-label-sm text-secondary mb-2 group-focus-within:text-primary transition-colors">
            {dict.contact.form.labels.subject}
          </label>
          <input
            type="text"
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder={dict.contact.form.placeholders.subject}
            className="border border-outline-variant/60 rounded-xl p-4 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-surface-container-lowest shadow-sm hover:border-primary/50"
          />
        </div>
        <div className="flex flex-col group">
          <label htmlFor="message" className="font-label-sm text-label-sm text-secondary mb-2 group-focus-within:text-primary transition-colors">
            {dict.contact.form.labels.message}
          </label>
          <textarea
            id="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            placeholder={dict.contact.form.placeholders.message}
            className="border border-outline-variant/60 rounded-xl p-4 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all bg-surface-container-lowest shadow-sm hover:border-primary/50 resize-y"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-gradient-to-r from-primary to-primary-container text-on-primary font-label-sm text-label-sm px-8 py-4 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:scale-95 w-full md:w-auto relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span className="relative z-10">
            {status === "loading" ? dict.contact.form.submitting : dict.contact.form.submit}
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
        </button>
      </form>
    </motion.div>
  );
}
