import Image from "next/image";
import { createAdminClient } from "@/lib/supabase/admin";

const EASTERN = "America/New_York";

function formatWhen(startsAt: string, endsAt: string): string {
  const d = new Date(startsAt);
  const end = new Date(endsAt);
  const day = d.toLocaleDateString("en-US", {
    timeZone: EASTERN,
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const startTime = d.toLocaleTimeString("en-US", {
    timeZone: EASTERN,
    hour: "numeric",
    minute: "2-digit",
  });
  const endTime = end.toLocaleTimeString("en-US", {
    timeZone: EASTERN,
    hour: "numeric",
    minute: "2-digit",
  });
  return `${day} · ${startTime} – ${endTime}`;
}

function formatPastWhen(startsAt: string, endsAt: string, venueLocation: string): string {
  const when = formatWhen(startsAt, endsAt);
  const [_, timePart] = when.split(" · ");
  return `${timePart} · ${venueLocation}`;
}

function formatPastTitle(startsAt: string, venueName: string): string {
  const d = new Date(startsAt);
  const day = d.toLocaleDateString("en-US", {
    timeZone: EASTERN,
    weekday: "long",
    month: "numeric",
    day: "numeric",
  });
  return `${day} · ${venueName}`;
}

export async function EventsSection() {
  const supabase = createAdminClient();
  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .order("starts_at", { ascending: false });

  if (error) {
    return (
      <section id="next-event" className="mx-auto w-full max-w-6xl px-6 pt-12">
        <p className="text-black/70">Unable to load events. Please try again later.</p>
      </section>
    );
  }

  const now = new Date();
  const upcoming: typeof events = [];
  const past: typeof events = [];

  for (const e of events ?? []) {
    const endsAt = e.ends_at ? new Date(e.ends_at) : null;
    if (endsAt && endsAt >= now) {
      upcoming.push(e);
    } else {
      past.push(e);
    }
  }

  upcoming.reverse();
  const nextEvent = upcoming[0] ?? null;

  return (
    <section
      id="next-event"
      className="mx-auto w-full max-w-6xl px-6 pt-12"
    >
      {nextEvent ? (
        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-carolina)]">
            Join the next event
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-black/50">
            Powered by
          </p>
          <div className="mt-2 flex items-center gap-2">
            <Image
              src="/realty-one-group-freedom.png"
              alt="Realty ONE Group Freedom"
              width={220}
              height={56}
              className="h-10 w-auto max-w-[200px] object-contain object-left md:h-12 md:max-w-[220px]"
            />
          </div>
          <h2 className="mt-4 text-3xl font-black uppercase tracking-[0.08em] md:text-4xl">
            {nextEvent.title}
          </h2>
          {nextEvent.description && (
            <p className="mt-4 text-base text-black/70">
              {nextEvent.description}
            </p>
          )}

          <div className="mt-6 grid gap-4 text-sm text-black/80 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-black/50">
                When
              </p>
              <p className="mt-2 text-base">{formatWhen(nextEvent.starts_at, nextEvent.ends_at)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-black/50">
                Where
              </p>
              <p className="mt-2 text-base">{nextEvent.venue_name} · {nextEvent.venue_location}</p>
            </div>
            {(nextEvent.speaker_name || nextEvent.speaker_title) && (
              <div className="md:col-span-2">
                <p className="text-xs uppercase tracking-[0.25em] text-black/50">
                  Guest speaker
                </p>
                {nextEvent.speaker_name && (
                  <p className="mt-2 text-base font-semibold">{nextEvent.speaker_name}</p>
                )}
                {nextEvent.speaker_title && (
                  <p className="text-sm text-black/70">{nextEvent.speaker_title}</p>
                )}
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            {nextEvent.eventbrite_url ? (
              <a
                href={nextEvent.eventbrite_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full bg-[color:var(--color-midland)]/80 px-6 py-3 text-sm font-semibold text-black/90 transition hover:opacity-90"
              >
                RSVP on Eventbrite
              </a>
            ) : (
              <span
                className="inline-flex rounded-full bg-[color:var(--color-midland)]/80 px-6 py-3 text-sm font-semibold text-black/90"
                aria-label="RSVP coming soon"
              >
                RSVP on Eventbrite — Coming Soon
              </span>
            )}
            <button className="rounded-full border border-black/20 px-6 py-3 text-sm font-semibold text-black">
              Add to Calendar
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-carolina)]">
            Join the next event
          </p>
          <p className="mt-4 text-base text-black/70">
            Stay tuned for our next Business &amp; Brews event. Sign up below for news and updates.
          </p>
        </div>
      )}

      <div className="mt-10">
        <p className="text-xs uppercase tracking-[0.3em] text-black/60">
          Past events
        </p>
        {past.length === 0 ? (
          <p className="mt-4 text-sm text-black/60">No past events to show yet.</p>
        ) : (
          <ul className="mt-4 flex flex-col gap-3">
            {past.map((e) => (
              <li
                key={e.id}
                className="rounded-2xl border border-black/10 bg-white/80 px-6 py-4 shadow-sm"
              >
                <p className="font-semibold text-black">
                  {formatPastTitle(e.starts_at, e.venue_name)}
                </p>
                <p className="mt-1 text-sm text-black/70">
                  {formatPastWhen(e.starts_at, e.ends_at, e.venue_location)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
