import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data: events, error } = await supabase
      .from("events")
      .select("*")
      .order("starts_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500, headers: { "Cache-Control": "no-store" } });
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
    }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    const status = message.includes("Missing Supabase") ? 503 : 500;
    return NextResponse.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } });
  }
}
