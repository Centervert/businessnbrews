"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DashboardLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (signInError) {
        setError(signInError.message);
        return;
      }
      router.push("/dashboard/events");
      router.refresh();
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-black">
      {/* Left: form — full width on mobile, 50% on sm+ */}
      <div className="flex w-full flex-1 flex-col justify-between px-4 py-8 sm:w-1/2 sm:px-8 sm:py-12">
        <div className="mx-auto flex w-full max-w-[360px] flex-1 flex-col justify-center pt-12 sm:pt-40">
          <div className="mb-5">
            <Image
              src="/bnb-logo-horz-white.png"
              alt="Business & Brews"
              width={320}
              height={82}
              className="h-14 w-auto opacity-90 sm:h-16"
            />
          </div>

          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/70">
                Email
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-white/20 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:border-[color:var(--color-carolina)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-carolina)]"
                  autoComplete="email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/70">
                Password
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-white/20 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:border-[color:var(--color-carolina)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-carolina)]"
                  autoComplete="current-password"
                />
              </div>
            </div>
            {error && (
              <p className="text-sm text-[color:var(--color-midland)]">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[color:var(--color-carolina)] py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-8 text-center">
            <Link
              href="/"
              className="text-xs text-white/40 transition hover:text-white/60"
            >
              ← Back to site
            </Link>
          </p>
        </div>

        {/* Centervert logo at bottom left */}
        <div className="mx-auto mt-6 w-full max-w-[360px] pb-4 sm:mt-8">
          <Image
            src="/centervert-builtby.png"
            alt="Built by Centervert"
            width={180}
            height={28}
            className="h-6 w-auto opacity-70"
          />
        </div>
      </div>

      {/* Right: hero image — 50% */}
      <div className="relative hidden flex-1 overflow-hidden bg-[color:var(--color-black)] sm:block sm:w-1/2">
        <Image
          src="/images/login-hero.webp"
          alt=""
          fill
          className="object-cover blur-md"
          sizes="50vw"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/bnb.badge.white.png"
            alt="Business & Brews"
            width={120}
            height={120}
            className="opacity-95"
          />
        </div>
      </div>
    </div>
  );
}
