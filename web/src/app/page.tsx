import Image from "next/image";
import HeroScroll from "@/components/HeroScroll";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:h-20">
          <div className="flex items-center gap-3">
            <Image
              src="/bnb-logo-horz-white.png"
              alt="Business & Brews logo"
              width={220}
              height={58}
              priority
            />
          </div>
          <nav className="hidden gap-6 text-sm uppercase tracking-[0.2em] md:flex">
            <a href="#events">Events</a>
            <a href="#speakers">Speakers</a>
            <a href="#venues">Venues</a>
            <a href="#gallery">Gallery</a>
            <a href="#sponsors">Sponsors</a>
          </nav>
          <button className="rounded-full bg-[color:var(--color-midland)] px-5 py-2 text-sm font-semibold text-black">
            Get Tickets
          </button>
        </div>
      </header>

      <main className="flex flex-col gap-20 pb-0">
        <HeroScroll />

        <div className="bg-[color:var(--color-bayside)] pb-12 text-black">
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
                src: "/sponsors/Flywood Productions.png",
                alt: "Flywood Productions",
              },
              {
                src: "/sponsors/Piper Insurance Group .png",
                alt: "Piper Insurance Group",
              },
              { src: "/sponsors/Ridge Media.png", alt: "Ridge Media" },
              {
                src: "/sponsors/Williams Wealth Management.png",
                alt: "Williams Wealth Management",
              },
            ].map((logo) => (
              <div
                key={logo.src}
                className="flex h-14 flex-1 items-center justify-center"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={220}
                  height={60}
                  className="h-10 w-auto opacity-90 transition-opacity hover:opacity-100"
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
                  className="flex h-14 flex-1 items-center justify-center"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={200}
                    height={60}
                    className={`h-10 w-auto opacity-90 transition-opacity hover:opacity-100 ${
                      logo.invert ? "brightness-0 invert" : ""
                    }`}
                  />
                </div>
              ))}
            </div>
          </section>

          <section
            id="next-event"
            className="mx-auto grid w-full max-w-6xl gap-6 px-6 pt-12 md:grid-cols-[1.2fr_0.8fr]"
          >
            <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-carolina)]">
                Join the next event
              </p>
              <h2 className="mt-4 text-3xl font-black uppercase tracking-[0.08em] md:text-4xl">
                Business &amp; Brews: Greenville Social
              </h2>
              <p className="mt-4 text-base text-black/70">
                An evening of connections, conversations, and community over
                locally crafted brews.
              </p>

              <div className="mt-6 grid gap-4 text-sm text-black/80 md:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-black/50">
                    When
                  </p>
                  <p className="mt-2 text-base">Thursday, March 21 · 6:00 PM</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-black/50">
                    Where
                  </p>
                  <p className="mt-2 text-base">Hotel Hartness · Greenville, SC</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-black/50">
                    Who
                  </p>
                  <p className="mt-2 text-base">
                    Featured speaker: Pamela Evette
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-black/50">
                    Sponsored by
                  </p>
                  <p className="mt-2 text-base">Piper Insurance Group</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button className="rounded-full bg-[color:var(--color-midland)] px-6 py-3 text-sm font-semibold text-black">
                  RSVP on Eventbrite
                </button>
                <button className="rounded-full border border-black/20 px-6 py-3 text-sm font-semibold text-black">
                  Add to Calendar
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-black/60">
                Recent events
              </p>
              <div className="flex flex-col gap-3 text-sm text-black/70">
              {[
                {
                  title: "Hotel Hartness",
                  date: "Jan 21, 2025",
                  speaker: "Jim Burns",
                },
                {
                  title: "The Draper",
                  date: "Feb 18, 2025",
                  speaker: "Sam Konduras",
                },
                {
                  title: "City Club Greenville",
                  date: "Apr 29, 2025",
                  speaker: "Pamela Evette",
                },
              ].map((event) => (
                <div
                  key={event.title}
                  className="flex items-center justify-between rounded-2xl border border-black/10 bg-[color:var(--color-bayside)] px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-black">
                      {event.title}
                    </p>
                    <p className="text-xs text-black/60">{event.date}</p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-black/60">
                    {event.speaker}
                  </span>
                </div>
              ))}
              </div>
            <button className="mt-2 rounded-full border border-black/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black">
              See past events
            </button>
            </div>
          </section>

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
              src="/bnb-logo-square-white.png"
              alt="Business & Brews logo"
              width={96}
              height={96}
            />
            <p className="max-w-sm text-xs text-white/70">
              Monthly networking events connecting professionals, entrepreneurs,
              and local leaders across Greenville and Charleston.
            </p>
          </div>

          <div className="flex w-full max-w-2xl flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              Newsletter
            </p>
            <p className="text-sm text-white/70">
              Get first access to upcoming events and speaker announcements.
            </p>
            <form className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="email"
                placeholder="Email address"
                className="w-full min-w-[260px] flex-1 rounded-full border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-coastal)]"
              />
              <button
                type="submit"
                className="whitespace-nowrap rounded-full bg-[color:var(--color-midland)] px-6 py-3 text-sm font-semibold text-black"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-6 py-4">
            <Image
              src="/centervert-builtby.png"
              alt="Built by Centervert"
              width={220}
              height={36}
              className="h-5 w-auto opacity-80"
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
