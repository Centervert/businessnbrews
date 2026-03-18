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

export default function DashboardSignupsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <p className="text-black/60">Loading signups…</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h1 className="text-xl font-semibold text-black sm:text-2xl">Signups</h1>
      <p className="mt-1 text-sm text-black/60">
        Newsletter and event notification signups from the website.
      </p>
      <div className="mt-4 overflow-x-auto rounded-xl border border-black/10 bg-white shadow-sm sm:mt-6">
        {contacts.length === 0 ? (
          <div className="p-8 text-center text-black/60">
            No signups yet.
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
              {contacts.map((c) => (
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
