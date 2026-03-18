"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const EVENTBRITE_URL = "https://www.eventbrite.com/o/109127867981";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [eventbriteModalOpen, setEventbriteModalOpen] = useState(false);
  const eventbriteButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (eventbriteModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [eventbriteModalOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  function openEventbriteModal() {
    closeMenu();
    setEventbriteModalOpen(true);
  }

  function closeEventbriteModal() {
    setEventbriteModalOpen(false);
    requestAnimationFrame(() => eventbriteButtonRef.current?.focus());
  }

  function goToEventbrite() {
    setEventbriteModalOpen(false);
    window.open(EVENTBRITE_URL, "_blank", "noopener,noreferrer");
    requestAnimationFrame(() => eventbriteButtonRef.current?.focus());
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:h-20">
        <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
          <Image
            src="/bnb.logo.2.white.png"
            alt="Business & Brews logo"
            width={220}
            height={58}
            priority
            className="h-7 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden gap-6 text-sm uppercase tracking-[0.2em] md:flex">
          <Link href="/" className="text-white/90 hover:text-white">
            Home
          </Link>
          <Link href="/#next-event" className="text-white/90 hover:text-white">
            Events
          </Link>
          <Link href="/signup" className="text-white/90 hover:text-white">
            Sign up
          </Link>
        </nav>
        <button
          ref={eventbriteButtonRef}
          type="button"
          onClick={openEventbriteModal}
          className="hidden rounded-full bg-[color:var(--color-midland)] px-5 py-2 text-sm font-semibold text-black md:block"
        >
          Get Tickets
        </button>

        {/* Hamburger: visible only on mobile */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
          className="flex flex-col gap-1.5 p-2 md:hidden"
        >
          <span className="h-0.5 w-6 bg-white" />
          <span className="h-0.5 w-6 bg-white" />
          <span className="h-0.5 w-6 bg-white" />
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-sm transition-opacity duration-200 md:hidden ${menuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!menuOpen}
        onClick={closeMenu}
      />
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col gap-1 border-l border-white/10 bg-black/95 p-6 pt-24 shadow-xl transition-transform duration-200 ease-out md:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={closeMenu}
          className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white"
        >
          <span className="sr-only">Close</span>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <Link
          href="/"
          onClick={closeMenu}
          className="rounded-lg px-4 py-3 text-left text-sm uppercase tracking-[0.2em] text-white hover:bg-white/10"
        >
          Home
        </Link>
        <Link
          href="/#next-event"
          onClick={closeMenu}
          className="rounded-lg px-4 py-3 text-left text-sm uppercase tracking-[0.2em] text-white hover:bg-white/10"
        >
          Events
        </Link>
        <Link
          href="/signup"
          onClick={closeMenu}
          className="rounded-lg px-4 py-3 text-left text-sm uppercase tracking-[0.2em] text-white hover:bg-white/10"
        >
          Sign up
        </Link>
        <button
          type="button"
          onClick={openEventbriteModal}
          className="mt-4 rounded-full bg-[color:var(--color-midland)] px-5 py-3 text-center text-sm font-semibold text-black"
        >
          Get Tickets
        </button>
      </div>

      {/* Eventbrite redirect modal - only mount when open to avoid aria-hidden + focused descendant */}
      {mounted &&
        eventbriteModalOpen &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="presentation">
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={closeEventbriteModal}
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="eventbrite-modal-title"
              className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-black p-6 shadow-xl"
            >
              <h2 id="eventbrite-modal-title" className="text-lg font-bold text-white">
                Get Tickets
              </h2>
              <p className="mt-3 text-sm text-white/80">
                We use Eventbrite to manage events. This will redirect you to our Eventbrite page where you can see upcoming events and reserve your spot.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeEventbriteModal}
                  className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Stay
                </button>
                <button
                  type="button"
                  onClick={goToEventbrite}
                  className="rounded-full bg-[color:var(--color-midland)] px-5 py-2.5 text-sm font-semibold text-black"
                >
                  Go to Eventbrite
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
}
