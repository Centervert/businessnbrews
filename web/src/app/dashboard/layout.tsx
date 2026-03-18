import Link from "next/link";

export default function DashboardLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[color:var(--color-bayside)] text-[color:var(--color-black)]">
      <aside className="flex w-52 flex-shrink-0 flex-col border-r border-black/10 bg-white">
        <div className="flex h-14 items-center border-b border-black/10 px-4">
          <Link href="/dashboard" className="font-semibold tracking-wide text-[color:var(--color-carolina)]">
            B&B Admin
          </Link>
        </div>
        <nav className="flex flex-col gap-0.5 p-3">
          <Link
            href="/dashboard/events"
            className="rounded-lg px-3 py-2 text-sm font-medium text-black/80 transition hover:bg-black/5 hover:text-black"
          >
            Events
          </Link>
          <Link
            href="/dashboard/signups"
            className="rounded-lg px-3 py-2 text-sm font-medium text-black/80 transition hover:bg-black/5 hover:text-black"
          >
            Signups
          </Link>
        </nav>
        <div className="mt-auto border-t border-black/10 p-3">
          <Link
            href="/"
            className="block rounded-lg px-3 py-2 text-sm text-black/60 transition hover:bg-black/5 hover:text-black"
          >
            ← Back to site
          </Link>
          <form action="/api/auth/signout" method="post" className="mt-1">
            <button
              type="submit"
              className="w-full rounded-lg px-3 py-2 text-left text-sm text-black/60 transition hover:bg-black/5 hover:text-black"
            >
              Log out
            </button>
          </form>
        </div>
      </aside>
      <main className="min-w-0 flex-1 p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
