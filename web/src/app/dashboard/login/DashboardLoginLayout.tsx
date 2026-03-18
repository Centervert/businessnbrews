"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function NavContent({ onLinkClick }: { onLinkClick?: () => void }) {
  return (
    <>
      <div className="flex h-14 items-center border-b border-black/10 px-4">
        <Link
          href="/dashboard"
          className="font-semibold tracking-wide text-[color:var(--color-carolina)]"
          onClick={onLinkClick}
        >
          B&B Admin
        </Link>
      </div>
      <nav className="flex flex-col gap-0.5 p-3">
        <Link
          href="/dashboard/events"
          className="rounded-lg px-3 py-2 text-sm font-medium text-black/80 transition hover:bg-black/5 hover:text-black"
          onClick={onLinkClick}
        >
          Events
        </Link>
        <Link
          href="/dashboard/signups"
          className="rounded-lg px-3 py-2 text-sm font-medium text-black/80 transition hover:bg-black/5 hover:text-black"
          onClick={onLinkClick}
        >
          Signups
        </Link>
      </nav>
      <div className="mt-auto border-t border-black/10 p-3">
        <Link
          href="/"
          className="block rounded-lg px-3 py-2 text-sm text-black/60 transition hover:bg-black/5 hover:text-black"
          onClick={onLinkClick}
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
    </>
  );
}

export default function DashboardLoginLayout({
  children,
}: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/dashboard/login";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[color:var(--color-bayside)] text-[color:var(--color-black)]">
      {/* Mobile: menu button + overlay */}
      <div className="fixed left-0 top-0 z-40 flex h-14 w-full items-center border-b border-black/10 bg-white px-4 md:hidden">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-black/80 transition hover:bg-black/5"
          aria-label="Open menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <span className="ml-2 font-semibold text-[color:var(--color-carolina)]">B&B Admin</span>
      </div>

      {/* Mobile drawer overlay */}
      {mobileMenuOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-black/10 bg-white shadow-xl md:hidden">
            <div className="flex h-14 items-center justify-between border-b border-black/10 px-4">
              <span className="font-semibold text-[color:var(--color-carolina)]">Menu</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-black/80 transition hover:bg-black/5"
                aria-label="Close menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 flex-col overflow-auto">
              <NavContent onLinkClick={() => setMobileMenuOpen(false)} />
            </div>
          </aside>
        </>
      )}

      {/* Desktop: persistent sidebar */}
      <aside className="hidden w-52 flex-shrink-0 flex-col border-r border-black/10 bg-white md:flex">
        <NavContent />
      </aside>

      {/* Main content — account for mobile header */}
      <main className="min-w-0 flex-1 p-4 pt-16 md:pt-6 md:p-6 md:pt-8 lg:p-8">
        {children}
      </main>
    </div>
  );
}
