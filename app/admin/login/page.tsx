"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm bg-surface-container-lowest rounded-3xl border border-outline-variant/30 shadow-[0_4px_20px_rgb(0,0,0,0.06)] p-8">
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-1">
          Admin Login
        </h1>
        <p className="text-secondary text-sm mb-6">Yayasan Putra Prabu Indonesia Raya</p>

        <form action={formAction} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block font-label-sm text-label-sm text-secondary mb-1 uppercase tracking-wide"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              className="w-full rounded-xl border border-outline-variant/50 px-4 py-2.5 text-on-background focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block font-label-sm text-label-sm text-secondary mb-1 uppercase tracking-wide"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-outline-variant/50 px-4 py-2.5 text-on-background focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          {state?.error && <p className="text-error text-sm">{state.error}</p>}

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-primary text-on-primary rounded-xl py-2.5 font-semibold hover:opacity-90 transition disabled:opacity-60"
          >
            {pending ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
