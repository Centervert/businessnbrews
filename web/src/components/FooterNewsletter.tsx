"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}${digits.length === 3 ? ") " : ""}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function FooterNewsletter() {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!value) return;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(value)) {
      setError("Please enter a valid email.");
      return;
    }
    setEmail(value);
    setError(null);
    setModalOpen(true);
  }

  async function handleModalSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    if (!name) {
      setError("Name is required.");
      setLoading(false);
      return;
    }
    const data = {
      name,
      email: email.trim(),
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value.trim() || null,
      business: (form.elements.namedItem("business") as HTMLInputElement).value.trim() || null,
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
      setTimeout(() => {
        setModalOpen(false);
        setSubmitted(false);
        setEmail("");
        setPhone("");
      }, 2000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function closeModal() {
    if (!loading) {
      setModalOpen(false);
      // Return focus to email input when modal closes (avoids aria-hidden + focused descendant)
      requestAnimationFrame(() => emailInputRef.current?.focus());
    }
  }

  return (
    <>
      <div className="flex w-full max-w-2xl flex-col gap-3">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">
          News &amp; event notifications
        </p>
        <p className="text-sm text-white/70">
          Get first access to upcoming events and speaker announcements.
        </p>
        <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            ref={emailInputRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-coastal)]"
            aria-label="Email for news and event notifications"
          />
          <button
            type="submit"
            className="whitespace-nowrap rounded-full bg-[color:var(--color-midland)] px-6 py-3 text-sm font-semibold text-black"
          >
            Sign up
          </button>
        </form>
        {error && !modalOpen && (
          <p className="text-xs text-red-400">{error}</p>
        )}
      </div>

      {/* Modal - only mount when open to avoid aria-hidden on focused descendant */}
      {mounted &&
        modalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            role="presentation"
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={closeModal}
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="newsletter-modal-title"
              className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-black p-6 shadow-xl"
            >
              {submitted ? (
                <div className="py-4 text-center">
                  <p className="text-lg font-semibold text-[color:var(--color-coastal)]">
                    You&apos;re signed up!
                  </p>
                  <p className="mt-2 text-sm text-white/70">
                    We&apos;ll be in touch with news and event updates.
                  </p>
                </div>
              ) : (
                <>
                  <h2 id="newsletter-modal-title" className="text-lg font-bold text-white">
                    Complete your signup
                  </h2>
                  <p className="mt-1 text-sm text-white/60">
                    {email}
                  </p>
                  <form onSubmit={handleModalSubmit} className="mt-6 flex flex-col gap-4">
                    {error && (
                      <p className="rounded-lg bg-red-500/20 px-3 py-2 text-sm text-red-300">
                        {error}
                      </p>
                    )}
                    <div>
                      <label htmlFor="footer-name" className="block text-xs uppercase tracking-[0.2em] text-white/60">
                        Name
                      </label>
                      <input
                        id="footer-name"
                        name="name"
                        type="text"
                        required
                        autoFocus
                        className="mt-1.5 w-full rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-coastal)]"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="footer-phone" className="block text-xs uppercase tracking-[0.2em] text-white/60">
                        Phone <span className="text-white/40">(optional)</span>
                      </label>
                      <input
                        id="footer-phone"
                        name="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(formatPhone(e.target.value))}
                        className="mt-1.5 w-full rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-coastal)]"
                        placeholder="(864) 555-1234"
                      />
                    </div>
                    <div>
                      <label htmlFor="footer-business" className="block text-xs uppercase tracking-[0.2em] text-white/60">
                        Business
                      </label>
                      <input
                        id="footer-business"
                        name="business"
                        type="text"
                        className="mt-1.5 w-full rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-coastal)]"
                        placeholder="Company or business name"
                      />
                    </div>
                    <p className="text-xs text-white/50">
                      We will not spam. You can unsubscribe at any time.
                    </p>
                    <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:justify-end">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="rounded-full bg-[color:var(--color-midland)] px-5 py-2.5 text-sm font-semibold text-black disabled:opacity-60"
                      >
                        {loading ? "Signing up…" : "Sign up"}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
