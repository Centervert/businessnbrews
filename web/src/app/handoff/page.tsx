"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const HANDOFF_DONE_COOKIE = "handoff_done";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function setHandoffDoneCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${HANDOFF_DONE_COOKIE}=1; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

function hasHandoffDoneCookie(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.includes(`${HANDOFF_DONE_COOKIE}=1`);
}

export default function HandoffPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (hasHandoffDoneCookie()) {
      router.replace("/");
    }
  }, [mounted, router]);

  function handleExploreClick() {
    setHandoffDoneCookie();
    setRedirecting(true);
    router.push("/");
  }

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] font-sans text-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans text-white">
      {/* ── Hero ── */}
      <header className="flex flex-col items-center gap-5 px-6 pt-16 pb-10 sm:gap-6 sm:pt-24 sm:pb-14">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
          <Image
            src="/bnb.logo.2.white.png"
            alt="Business & Brews"
            width={300}
            height={78}
            className="h-8 w-auto sm:h-10"
            priority
          />
          <span
            className="hidden h-px w-6 bg-white/30 sm:block"
            aria-hidden
          />
          <Image
            src="/images/centervert-logo-horizontal-white.png"
            alt="Centervert"
            width={360}
            height={94}
            className="h-11 w-auto mix-blend-lighten sm:h-[3.4rem]"
            priority
          />
        </div>
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/50 sm:text-sm">
          Project Handoff
        </p>
      </header>

      {/* ── Content ── */}
      <main className="mx-auto max-w-2xl px-6 pb-24">
        {/* Intro */}
        <section className="border-t border-white/10 py-12 sm:py-14">
          <p className="text-center text-lg leading-relaxed text-white/80 sm:text-xl">
            Thank you for allowing Centervert to partner with you and Business
            &amp; Brews to bring your visual identity, website, and logistics
            management to life.
          </p>
        </section>

        {/* What we built */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-[#f2b554]">
            01
          </p>
          <h2 className="mb-4 text-lg font-semibold text-white sm:text-xl">
            What we built
          </h2>
          <p className="mb-5 leading-relaxed text-white/80">
            A modern, brand-aligned website with a scroll-driven hero, about
            section, sponsors, past venues, and a dynamic events section.
            Visitors can sign up for event notifications and RSVP through
            Eventbrite. Coordinator login is discreetly placed in the footer.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
              <p className="text-sm font-medium text-white">Homepage</p>
              <p className="mt-1 text-sm text-white/60">
                Hero, about, sponsors, venues, events, newsletter signup
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
              <p className="text-sm font-medium text-white">Sign up page</p>
              <p className="mt-1 text-sm text-white/60">
                Dedicated newsletter and event notification signup
              </p>
            </div>
          </div>
        </section>

        {/* Dashboard */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-[#f2b554]">
            02
          </p>
          <h2 className="mb-4 text-lg font-semibold text-white sm:text-xl">
            Your coordinator dashboard
          </h2>
          <p className="mb-5 leading-relaxed text-white/80">
            The dashboard is where you manage everything. Log in with the
            coordinator email and password we set up for you.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-4">
              <p className="mb-2 text-sm font-semibold text-white">Events</p>
              <ul className="space-y-1.5 text-sm text-white/70">
                <li>Add, edit, or delete events</li>
                <li>All times shown in Eastern</li>
                <li>
                  Add an Eventbrite URL to make the RSVP link live on the
                  homepage
                </li>
              </ul>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-4">
              <p className="mb-2 text-sm font-semibold text-white">Signups</p>
              <ul className="space-y-1.5 text-sm text-white/70">
                <li>View everyone who signed up</li>
                <li>Filter by date range</li>
                <li>Download CSV export</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Coordinator accounts */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-[#f2b554]">
            03
          </p>
          <h2 className="mb-4 text-lg font-semibold text-white sm:text-xl">
            Need a new coordinator account?
          </h2>
          <p className="leading-relaxed text-white/80">
            Reach out to{" "}
            <strong className="font-semibold text-white">George Manley</strong>{" "}
            and we&apos;ll get a new coordinator set up for you.
          </p>
        </section>

        {/* Quick reference */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h2 className="mb-5 text-lg font-semibold text-white sm:text-xl">
            Quick reference
          </h2>
          <div className="space-y-0">
            {[
              {
                task: "Log in",
                where: 'Footer "Log in" or /dashboard/login',
              },
              { task: "Manage events", where: "Dashboard \u2192 Events" },
              {
                task: "Export signups",
                where: "Dashboard \u2192 Signups \u2192 Download CSV",
              },
              {
                task: "New coordinator",
                where: "Contact George Manley",
              },
              {
                task: "Back to public site",
                where: 'Dashboard sidebar \u2192 "\u2190 Back to site"',
              },
            ].map(({ task, where }, i, arr) => (
              <div
                key={task}
                className={`flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-4 sm:py-3.5 ${i < arr.length - 1 ? "border-b border-white/[0.08]" : ""}`}
              >
                <dt className="shrink-0 text-sm font-medium text-white sm:w-40">
                  {task}
                </dt>
                <dd className="text-sm text-white/60">{where}</dd>
              </div>
            ))}
          </div>
        </section>

        {/* Links */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h2 className="mb-5 text-lg font-semibold text-white sm:text-xl">
            Your links
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-4 text-center transition hover:bg-white/[0.06]"
            >
              <span className="text-sm font-semibold text-white">Homepage</span>
              <span className="text-xs text-white/50">Opens in new tab</span>
            </Link>
            <Link
              href="/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-4 text-center transition hover:bg-white/[0.06]"
            >
              <span className="text-sm font-semibold text-white">Sign up page</span>
              <span className="text-xs text-white/50">Opens in new tab</span>
            </Link>
            <Link
              href="/dashboard/login"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-4 text-center transition hover:bg-white/[0.06]"
            >
              <span className="text-sm font-semibold text-white">Dashboard login</span>
              <span className="text-xs text-white/50">Opens in new tab</span>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 flex flex-col items-center text-center sm:mt-16">
          <h2 className="mb-3 text-2xl font-semibold text-white sm:text-3xl">
            Let&apos;s explore your page
          </h2>
          <p className="mb-8 max-w-sm text-sm leading-relaxed text-white/60">
            You&apos;ll be taken to your live homepage. This handoff page
            won&apos;t be needed once you&apos;re set up.
          </p>
          <button
            type="button"
            onClick={handleExploreClick}
            disabled={redirecting}
            className="inline-flex items-center justify-center rounded-full bg-[#f2b554] px-10 py-4 text-base font-semibold text-[#0a0a0a] transition hover:opacity-90 disabled:opacity-70"
          >
            {redirecting ? "Taking you there\u2026" : "Go to homepage \u2192"}
          </button>
        </section>
      </main>
    </div>
  );
}
