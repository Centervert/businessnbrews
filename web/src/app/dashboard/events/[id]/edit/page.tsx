"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const EASTERN = "America/New_York";

function formatDateOnly(iso: string): string {
  return new Date(iso).toLocaleDateString("en-CA", { timeZone: EASTERN });
}

function formatTimeOnly(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    timeZone: EASTERN,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function EditEventPage() {
  const params = useParams();
  const id = String(params.id);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    venue_name: "",
    venue_location: "",
    speaker_name: "",
    speaker_title: "",
    eventbrite_url: "",
  });

  const fetchEvent = useCallback(async () => {
    const res = await fetch("/api/admin/events");
    if (!res.ok) return;
    const events = await res.json();
    const e = events.find((x: { id: string }) => x.id === id);
    if (!e) {
      setError("Event not found");
      return;
    }
    setForm({
      title: e.title ?? "",
      description: e.description ?? "",
      date: formatDateOnly(e.starts_at),
      startTime: formatTimeOnly(e.starts_at),
      endTime: formatTimeOnly(e.ends_at),
      venue_name: e.venue_name ?? "",
      venue_location: e.venue_location ?? "",
      speaker_name: e.speaker_name ?? "",
      speaker_title: e.speaker_title ?? "",
      eventbrite_url: e.eventbrite_url ?? "",
    });
  }, [id]);

  useEffect(() => {
    fetchEvent().finally(() => setLoading(false));
  }, [fetchEvent]);

  function toEasternISO(dateStr: string, timeStr: string): string {
    const [year, month, day] = dateStr.split("-").map(Number);
    const [hour, minute] = timeStr.split(":").map(Number);
    const ref = new Date(Date.UTC(year, month - 1, day, 12, 0));
    const utcRepr = new Date(ref.toLocaleString("en-US", { timeZone: "UTC" }));
    const etRepr = new Date(ref.toLocaleString("en-US", { timeZone: EASTERN }));
    const offsetH = (utcRepr.getTime() - etRepr.getTime()) / 3_600_000;
    return new Date(Date.UTC(year, month - 1, day, hour + offsetH, minute)).toISOString();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaveLoading(true);
    try {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          description: form.description.trim() || null,
          starts_at: toEasternISO(form.date, form.startTime),
          ends_at: toEasternISO(form.date, form.endTime),
          venue_name: form.venue_name.trim(),
          venue_location: form.venue_location.trim(),
          speaker_name: form.speaker_name.trim() || null,
          speaker_title: form.speaker_title.trim() || null,
          eventbrite_url: form.eventbrite_url.trim() || null,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Failed to update");
        return;
      }
      router.push("/dashboard/events");
      router.refresh();
    } catch {
      setError("Something went wrong.");
    } finally {
      setSaveLoading(false);
    }
  }

  if (loading) return <p className="text-black/60">Loading…</p>;
  if (error && !form.title) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link
          href="/dashboard/events"
          className="text-sm text-black/60 hover:text-black"
        >
          ← Events
        </Link>
        <h1 className="text-2xl font-semibold text-black">Edit event</h1>
      </div>
      <p className="mb-4 text-xs text-black/60">Times are in Eastern (ET).</p>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <div>
          <label className="block text-xs font-medium text-black/70">Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            required
            className="mt-1 w-full rounded-lg border border-black/20 bg-white px-3 py-2 text-sm"
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
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saveLoading}
            className="rounded-lg bg-[color:var(--color-carolina)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-70"
          >
            {saveLoading ? "Saving…" : "Save changes"}
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
