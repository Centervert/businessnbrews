"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type EventRow = {
  id: string;
  title: string;
  starts_at: string;
  ends_at: string;
  venue_name: string;
  venue_location: string;
  speaker_name: string | null;
  speaker_title: string | null;
  eventbrite_url: string | null;
};

const EASTERN = "America/New_York";

function formatEventDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    timeZone: EASTERN,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatEventTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", {
    timeZone: EASTERN,
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function DashboardEventsPage() {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/events");
      if (!res.ok) throw new Error("Failed to load events");
      const data = await res.json();
      setEvents(data);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load events");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this event?")) return;
    const res = await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      alert(j.error || "Delete failed");
      return;
    }
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  if (loading) return <p className="text-black/60">Loading events…</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-black">Events</h1>
        <Link
          href="/dashboard/events/new"
          className="rounded-lg bg-[color:var(--color-carolina)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          Add event
        </Link>
      </div>
      <div className="mt-6 overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
        {events.length === 0 ? (
          <div className="p-8 text-center text-black/60">
            No events yet. Add one to get started.
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-black/10 bg-black/5">
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">When</th>
                <th className="px-4 py-3 font-medium">Venue</th>
                <th className="px-4 py-3 font-medium">Speaker</th>
                <th className="w-24 px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.id} className="border-b border-black/5 hover:bg-black/5">
                  <td className="px-4 py-3 font-medium">{e.title}</td>
                  <td className="px-4 py-3 text-black/80">
                    {formatEventDate(e.starts_at)} – {formatEventTime(e.ends_at)}
                  </td>
                  <td className="px-4 py-3 text-black/80">
                    {e.venue_name}, {e.venue_location}
                  </td>
                  <td className="px-4 py-3 text-black/80">
                    {e.speaker_name ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        href={`/dashboard/events/${e.id}/edit`}
                        className="text-[color:var(--color-carolina)] hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(e.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
