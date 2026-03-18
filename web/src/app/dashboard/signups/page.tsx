"use client";

import { useCallback, useEffect, useState } from "react";

type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  business: string | null;
  created_at: string;
};

function escapeCsvCell(value: string | null): string {
  if (value == null) return "";
  const s = String(value).replace(/"/g, '""');
  return s.includes(",") || s.includes('"') || s.includes("\n") ? `"${s}"` : s;
}

export default function DashboardSignupsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const fetchContacts = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/contacts");
      if (!res.ok) throw new Error("Failed to load signups");
      const data = await res.json();
      setContacts(data);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load signups");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function getFilteredContacts(): Contact[] {
    if (!dateFrom && !dateTo) return contacts;
    const fromTime = dateFrom ? new Date(dateFrom + "T00:00:00").getTime() : 0;
    const toTime = dateTo ? new Date(dateTo + "T23:59:59.999").getTime() : Number.MAX_SAFE_INTEGER;
    return contacts.filter((c) => {
      const t = new Date(c.created_at).getTime();
      return t >= fromTime && t <= toTime;
    });
  }

  function downloadCsv() {
    const filtered = getFilteredContacts();
    const headers = ["Name", "Email", "Phone", "Business", "Signed up"];
    const rows = filtered.map((c) => [
      escapeCsvCell(c.name),
      escapeCsvCell(c.email),
      escapeCsvCell(c.phone),
      escapeCsvCell(c.business),
      escapeCsvCell(formatDate(c.created_at)),
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = dateFrom || dateTo ? `signups-${dateFrom || "start"}-${dateTo || "end"}.csv` : "signups.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) return <p className="text-black/60">Loading signups…</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  const filtered = getFilteredContacts();

  return (
    <div>
      <h1 className="text-xl font-semibold text-black sm:text-2xl">Signups</h1>
      <p className="mt-1 text-sm text-black/60">
        Newsletter and event notification signups from the website.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <label className="text-sm text-black/70">
            From
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="ml-1.5 rounded border border-black/20 px-2 py-1.5 text-sm"
            />
          </label>
          <label className="text-sm text-black/70">
            To
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="ml-1.5 rounded border border-black/20 px-2 py-1.5 text-sm"
            />
          </label>
        </div>
        <button
          type="button"
          onClick={downloadCsv}
          className="w-fit rounded border border-black/20 bg-white px-3 py-1.5 text-sm font-medium text-black hover:bg-black/5"
        >
          Download CSV
        </button>
      </div>
      <p className="mt-1 text-xs text-black/50">
        {filtered.length} signup{filtered.length !== 1 ? "s" : ""}
        {(dateFrom || dateTo) && " in selected range"}
      </p>
      <div className="mt-4 overflow-x-auto rounded-xl border border-black/10 bg-white shadow-sm sm:mt-6">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-black/60">
            {contacts.length === 0 ? "No signups yet." : "No signups in selected date range."}
          </div>
        ) : (
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-black/10 bg-black/5">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Business</th>
                <th className="px-4 py-3 font-medium">Signed up</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-black/5 hover:bg-black/5">
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-black/80">{c.email}</td>
                  <td className="px-4 py-3 text-black/80">{c.phone ?? "—"}</td>
                  <td className="px-4 py-3 text-black/80">{c.business ?? "—"}</td>
                  <td className="px-4 py-3 text-black/60">{formatDate(c.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
