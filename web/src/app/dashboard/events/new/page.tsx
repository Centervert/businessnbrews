"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const EASTERN = "America/New_York";

function toEasternISO(dateStr: string, timeStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const [hour, minute] = timeStr.split(":").map(Number);
  const ref = new Date(Date.UTC(year, month - 1, day, 12, 0));
  const utcRepr = new Date(ref.toLocaleString("en-US", { timeZone: "UTC" }));
  const etRepr = new Date(ref.toLocaleString("en-US", { timeZone: EASTERN }));
  const offsetH = (utcRepr.getTime() - etRepr.getTime()) / 3_600_000;
  return new Date(Date.UTC(year, month - 1, day, hour + offsetH, minute)).toISOString();
}

export default function NewEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "17:00",
    endTime: "19:30",
    venue_name: "",
    venue_location: "",
    speaker_name: "",
    speaker_title: "",
    eventbrite_url: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const starts_at = toEasternISO(form.date, form.startTime);
      const ends_at = toEasternISO(form.date, form.endTime);
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim() || "Business & Brews",
          description: form.description.trim() || null,
          starts_at,
          ends_at,
          venue_name: form.venue_name.trim(),
          venue_location: form.venue_location.trim(),
          speaker_name: form.speaker_name.trim() || null,
          speaker_title: form.speaker_title.trim() || null,
          eventbrite_url: form.eventbrite_url.trim() || null,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Failed to create event");
        return;
      }
      router.push("/dashboard/events");
      router.refresh();
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link
          href="/dashboard/events"
          className="text-sm text-black/60 hover:text-black"
        >
          ← Events
        </Link>
        <h1 className="text-2xl font-semibold text-black">Add event</h1>
      </div>
      <p className="mb-4 text-xs text-black/60">
        Times are in Eastern (ET).
      </p>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <div>
          <label className="block text-xs font-medium text-black/70">Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-black/20 bg-white px-3 py-2 text-sm"
            placeholder="Business & Brews"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-black/70">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            rows={3}
            className="mt-1 w-full rounded-lg border border-black/20 bg-white px-3 py-2 text-sm"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-medium text-black/70">Date *</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              required
              className="mt-1 w-full rounded-lg border border-black/20 bg-white px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-black/70">Start time (ET)</label>
            <input
              type="time"
              value={form.startTime}
              onChange={(e) => setForm((f) => ({ ...f, startTime: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-black/20 bg-white px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-black/70">End time (ET)</label>
            <input
              type="time"
              value={form.endTime}
              onChange={(e) => setForm((f) => ({ ...f, endTime: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-black/20 bg-white px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-black/70">Venue name *</label>
            <input
              type="text"
              value={form.venue_name}
              onChange={(e) => setForm((f) => ({ ...f, venue_name: e.target.value }))}
              required
              className="mt-1 w-full rounded-lg border border-black/20 bg-white px-3 py-2 text-sm"
              placeholder="Six & Twenty Distillery"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-black/70">Venue location *</label>
            <input
              type="text"
              value={form.venue_location}
              onChange={(e) => setForm((f) => ({ ...f, venue_location: e.target.value }))}
              required
              className="mt-1 w-full rounded-lg border border-black/20 bg-white px-3 py-2 text-sm"
              placeholder="Greenville, SC"
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-black/70">Speaker name</label>
            <input
              type="text"
              value={form.speaker_name}
              onChange={(e) => setForm((f) => ({ ...f, speaker_name: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-black/20 bg-white px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-black/70">Speaker title</label>
            <input
              type="text"
              value={form.speaker_title}
              onChange={(e) => setForm((f) => ({ ...f, speaker_title: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-black/20 bg-white px-3 py-2 text-sm"
              placeholder="CEO & President of Visit Greenville"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-black/70">Eventbrite URL</label>
          <input
            type="url"
            value={form.eventbrite_url}
            onChange={(e) => setForm((f) => ({ ...f, eventbrite_url: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-black/20 bg-white px-3 py-2 text-sm"
            placeholder="https://..."
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-[color:var(--color-carolina)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-70"
          >
            {loading ? "Saving…" : "Create event"}
          </button>
          <Link
            href="/dashboard/events"
            className="rounded-lg border border-black/20 px-4 py-2 text-sm font-medium text-black"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
