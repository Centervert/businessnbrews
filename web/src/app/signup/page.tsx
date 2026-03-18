"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}${digits.length === 3 ? ") " : ""}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function SignupPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value.trim() || null,
      business: (form.elements.namedItem("business") as HTMLInputElement).value,
    };
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error || "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="pt-28 pb-20">
        <div className="mx-auto w-full max-w-md px-6">
          <h1 className="text-2xl font-black uppercase tracking-[0.08em] md:text-3xl">
            Sign up for news &amp; event notifications
          </h1>
          <p className="mt-2 text-sm text-white/70">
            Get first access to upcoming events and speaker announcements.
          </p>

          {submitted ? (
            <div className="mt-10 rounded-2xl border border-white/20 bg-white/5 p-8 text-center">
              <p className="text-lg font-semibold text-[color:var(--color-coastal)]">
                Thanks for signing up!
              </p>
              <p className="mt-2 text-sm text-white/70">
                We&apos;ll be in touch with news and event updates.
              </p>
            </div>
          ) : (
            <>
              {error && (
                <p className="mt-4 rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-300">
                  {error}
                </p>
              )}
              <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-[0.2em] text-white/60">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-2 w-full rounded-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-coastal)]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-[0.2em] text-white/60">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-2 w-full rounded-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-coastal)]"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-xs uppercase tracking-[0.2em] text-white/60">
                  Phone <span className="text-white/40">(optional)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  className="mt-2 w-full rounded-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-coastal)]"
                  placeholder="(864) 555-1234"
                />
              </div>
              <div>
                <label htmlFor="business" className="block text-xs uppercase tracking-[0.2em] text-white/60">
                  Business
                </label>
                <input
                  id="business"
                  name="business"
                  type="text"
                  className="mt-2 w-full rounded-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-coastal)]"
                  placeholder="Company or business name"
                />
              </div>
              <p className="text-xs text-white/50">
                We will not spam. You can unsubscribe at any time.
              </p>
              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-full bg-[color:var(--color-midland)] py-3 text-sm font-semibold text-black disabled:opacity-60"
              >
                {loading ? "Signing up…" : "Sign up"}
              </button>
            </form>
            </>
          )}
        </div>
      </main>

      <footer className="border-t border-white/10 py-6">
        <div className="mx-auto flex w-full max-w-6xl justify-center px-6">
          <Link
            href="/"
            className="text-sm text-white/60 hover:text-white"
          >
            ← Back to home
          </Link>
        </div>
      </footer>
    </div>
  );
}
