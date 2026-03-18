"use client";

import { createClient } from "@/lib/supabase/client";
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
    <div className="mx-auto max-w-sm">
      <h1 className="text-xl font-semibold text-black">Coordinator login</h1>
      <p className="mt-1 text-sm text-black/60">
        Sign in to manage events and view signups.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-black/70">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-black/20 bg-white px-3 py-2 text-sm text-black focus:border-[color:var(--color-carolina)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-carolina)]"
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-xs font-medium text-black/70">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-black/20 bg-white px-3 py-2 text-sm text-black focus:border-[color:var(--color-carolina)] focus:outline-none focus:ring-1 focus:ring-[color:var(--color-carolina)]"
            autoComplete="current-password"
          />
        </div>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-[color:var(--color-carolina)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-70"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
