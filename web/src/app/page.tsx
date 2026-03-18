import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import FooterNewsletter from "@/components/FooterNewsletter";
import HeroScroll from "@/components/HeroScroll";
import { EventsSection } from "@/components/EventsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="flex flex-col gap-20 pb-0">
        <HeroScroll />

        <div
          className="bg-[color:var(--color-bayside)] pb-12 text-black"
          style={{ contentVisibility: "auto", contain: "layout" }}
        >
          <section className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-6 pt-16 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-carolina)]">
              About Business & Brews
            </p>
            <h2 className="text-2xl font-black uppercase tracking-[0.08em] md:text-3xl">
              Monthly networking, brewed for connection.
            </h2>
            <p className="text-base text-black/70 md:text-lg">
              Business &amp; Brews is a monthly networking event bringing together
              professionals, entrepreneurs, and local leaders in Greenville and
              Charleston. Whether you&apos;re a seasoned business owner or just
              getting started, our laid-back gatherings are designed to spark
              meaningful connections over good drinks and even better
              conversations. Come for the brews, stay for the relationships that
              move your business forward.
            </p>
          </section>

          <section className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 pt-12">
            <p className="text-xs uppercase tracking-[0.3em] text-black/60">
              Sponsors
            </p>
            <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-black/10 bg-white px-6 py-3 shadow-sm">
            {[
              {
                src: "/sponsors/Centervert.png",
                alt: "Centervert",
              },
              {
                src: "/sponsors/Piper Insurance Group .png",
                alt: "Piper Insurance Group",
              },
              {
                src: "/sponsors/Williams Wealth Management.png",
                alt: "Williams Wealth Management",
              },
            ].map((logo) => (
              <div
                key={logo.src}
                className="flex min-w-0 flex-1 basis-0 items-center justify-center"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={220}
                  height={60}
                  sizes="(max-width: 768px) 80px, 220px"
                  className="h-10 w-auto max-w-full object-contain opacity-90 transition-opacity hover:opacity-100"
                />
              </div>
            ))}
            </div>
          </section>

          <section className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 pt-8">
            <p className="text-xs uppercase tracking-[0.3em] text-black/60">
              Past Venues
            </p>
            <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-black/10 bg-black px-6 py-4 shadow-sm">
              {[
                {
                  src: "/venues/city-club.svg",
                  alt: "City Club",
                  invert: true,
                },
                {
                  src: "/venues/draper-logo-white.png",
                  alt: "The Draper",
                },
                {
                  src: "/venues/Hartness.png",
                  alt: "Hotel Hartness",
                  invert: true,
                },
              ].map((logo) => (
                <div
                  key={logo.src}
                  className="flex min-w-0 flex-1 basis-0 items-center justify-center"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={200}
                    height={60}
                    sizes="(max-width: 768px) 80px, 200px"
                    className={`h-10 w-auto max-w-full object-contain opacity-90 transition-opacity hover:opacity-100 ${
                      logo.invert ? "brightness-0 invert" : ""
                    }`}
                  />
                </div>
              ))}
            </div>
          </section>

          <EventsSection />

          <section className="mx-auto w-full max-w-6xl px-6 pb-12">
            <div className="relative overflow-hidden rounded-3xl bg-white/60">
              <div className="flex gap-2 opacity-60">
                {[
                  "/gallery/2025-04-29.jpg",
                  "/gallery/2025-02-18.jpg",
                  "/gallery/2025-01-21.jpg",
                  "/gallery/2024-11-13.jpg",
                ].map((src) => (
                  <div key={src} className="h-24 w-1/4 flex-shrink-0 md:h-32">
<Image
                  src={src}
                  alt="Business & Brews event highlight"
                  width={600}
                  height={320}
                  sizes="(max-width: 768px) 25vw, 150px"
                  className="h-full w-full object-cover"
                />
                  </div>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[color:var(--color-bayside)] via-transparent to-[color:var(--color-bayside)]" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[color:var(--color-bayside)] via-transparent to-[color:var(--color-bayside)]" />
            </div>
          </section>

        </div>
      </main>

      <footer className="border-t border-white/10 bg-black text-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3">
            <Image
              src="/bnb.badge.white.png"
              alt="Business & Brews logo"
              width={96}
              height={96}
            />
            <p className="max-w-sm text-xs text-white/70">
              Monthly networking events connecting professionals, entrepreneurs,
              and local leaders across Greenville and Charleston.
            </p>
          </div>

          <FooterNewsletter />
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-2 px-6 py-4 md:flex-row md:gap-6">
            <Image
              src="/centervert-builtby.png"
              alt="Built by Centervert"
              width={220}
              height={36}
              className="h-5 w-auto opacity-80"
            />
            <Link
              href="/dashboard/login"
              className="text-xs text-white/40 transition hover:text-white/60"
            >
              Log in
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
