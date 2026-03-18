import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await _request.json();

    const allowed = [
      "title", "description", "starts_at", "ends_at",
      "venue_name", "venue_location", "speaker_name", "speaker_title",
      "eventbrite_url", "gallery_images",
    ] as const;
    const updates: Record<string, unknown> = {};
    for (const key of allowed) {
      if (body[key] !== undefined) {
        if (key === "starts_at" || key === "ends_at") {
          const d = new Date(body[key]);
          if (Number.isNaN(d.getTime())) {
            return NextResponse.json(
              { error: `Invalid ${key}: use ISO 8601` },
              { status: 400 }
            );
          }
          updates[key] = d.toISOString();
        } else if (key === "gallery_images") {
          updates[key] = Array.isArray(body[key]) ? body[key] : null;
        } else {
          updates[key] = body[key] == null ? null : String(body[key]).trim();
        }
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("events")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createAdminClient();
    const { error } = await supabase.from("events").delete().eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}
