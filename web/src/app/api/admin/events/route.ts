import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("starts_at", { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    const status = message.includes("Missing Supabase") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      starts_at,
      ends_at,
      venue_name,
      venue_location,
      speaker_name,
      speaker_title,
      eventbrite_url,
      gallery_images,
    } = body;

    if (!title || !venue_name || !venue_location) {
      return NextResponse.json(
        { error: "title, venue_name, and venue_location are required" },
        { status: 400 }
      );
    }

    const startsAt = starts_at ? new Date(starts_at) : null;
    const endsAt = ends_at ? new Date(ends_at) : null;
    if (!startsAt || !endsAt || Number.isNaN(startsAt.getTime()) || Number.isNaN(endsAt.getTime())) {
      return NextResponse.json(
        { error: "Valid starts_at and ends_at (ISO 8601) are required" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("events")
      .insert({
        title: String(title).trim(),
        description: description != null ? String(description).trim() : null,
        starts_at: startsAt.toISOString(),
        ends_at: endsAt.toISOString(),
        venue_name: String(venue_name).trim(),
        venue_location: String(venue_location).trim(),
        speaker_name: speaker_name != null ? String(speaker_name).trim() : null,
        speaker_title: speaker_title != null ? String(speaker_title).trim() : null,
        eventbrite_url: eventbrite_url != null ? String(eventbrite_url).trim() || null : null,
        gallery_images: Array.isArray(gallery_images) ? gallery_images : null,
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    revalidatePath("/");
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}
