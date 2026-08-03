import { useState } from "react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

export function useContactForm(locale: Locale) {
  const dict = getDictionary(locale);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, locale }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || dict.contact.form.errorGeneric);
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

    } catch (error: unknown) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : dict.contact.form.errorGeneric);
    }
  };

  return {
    formData,
    status,
    errorMessage,
    handleChange,
    handleSubmit,
  };
}
