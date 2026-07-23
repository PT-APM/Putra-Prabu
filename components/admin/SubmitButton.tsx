"use client";

import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";

export default function SubmitButton({
  children = "Simpan",
  pendingText = "Menyimpan...",
}: {
  children?: ReactNode;
  pendingText?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-primary text-on-primary rounded-xl px-6 py-2.5 font-semibold hover:opacity-90 transition disabled:opacity-60"
    >
      {pending ? pendingText : children}
    </button>
  );
}
