import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const NO_STORE = { "Cache-Control": "no-store" };

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
              { status: 400, headers: NO_STORE }
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
        { status: 400, headers: NO_STORE }
      );
    }

    updates.updated_at = new Date().toISOString();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "(missing)";
    console.log("[PATCH /api/admin/events/%s] url=%s updates=%j", id, supabaseUrl, updates);

    const supabase = createAdminClient();
    const { data, error, count } = await supabase
      .from("events")
      .update(updates, { count: "exact" })
      .eq("id", id)
      .select()
      .single();

    console.log("[PATCH /api/admin/events/%s] error=%j count=%s data.title=%s", id, error, count, data?.title);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500, headers: NO_STORE });
    }
    if (count === 0 || !data) {
      return NextResponse.json(
        { error: "Update failed — 0 rows modified. Check service role key." },
        { status: 500, headers: NO_STORE }
      );
    }

    revalidatePath("/");
    return NextResponse.json(data, { headers: NO_STORE });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    console.error("[PATCH /api/admin/events] catch:", message);
    const status = message.includes("Missing Supabase") ? 503 : 500;
    return NextResponse.json({ error: message }, { status, headers: NO_STORE });
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

    if (error) return NextResponse.json({ error: error.message }, { status: 500, headers: NO_STORE });
    revalidatePath("/");
    return NextResponse.json({ success: true }, { headers: NO_STORE });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    const status = message.includes("Missing Supabase") ? 503 : 500;
    return NextResponse.json({ error: message }, { status, headers: NO_STORE });
  }
}
