import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

/** Public: list upcoming and past events. Event times are stored in UTC, display in Eastern (America/New_York). */
export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data: events, error } = await supabase
      .from("events")
      .select("*")
      .order("starts_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
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

    // Upcoming: ascending (next first); past: already desc by starts_at
    upcoming.reverse();

    return NextResponse.json({
      nextEvent: upcoming[0] ?? null,
      pastEvents: past,
      upcomingEvents: upcoming,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    const status = message.includes("Missing Supabase") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
