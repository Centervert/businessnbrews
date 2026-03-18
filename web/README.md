# Business & Brews Website

Modern rebuild of the Business & Brews website using Next.js and Tailwind CSS.

**Repository:** https://github.com/Centervert/businessnbrews
**Hosting:** Vercel (Centervert account)
**DNS:** Nameservers managed by Vercel

## Tech Stack

- **Framework:** Next.js 16.1.2 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Email:** Resend (stubbed)

## Local Development

```bash
git clone https://github.com/Centervert/businessnbrews.git
cd businessnbrews/web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file using `env.example` as a reference.

**Supabase (required for events and auth):**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON` — for browser auth (dashboard login)
- `SUPABASE_SERVICE_ROLE_KEY` — for server-side admin and public events API

**Email (Resend):**
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_TO_EMAIL`

**Eventbrite sync (future):**
- `EVENTBRITE_API_TOKEN`
- `EVENTBRITE_ORG_ID`

**Optional:**
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- `NEXT_PUBLIC_SITE_URL` — used for post-logout redirect

## Project Structure

```
web/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Homepage
│   │   ├── globals.css        # Brand colors, fonts, Tailwind
│   │   └── api/contact/       # Resend email endpoint (stubbed)
│   └── components/
│       ├── HeroScroll.tsx     # Scroll-driven hero animation
│       └── PhotoRail.tsx      # Photo strip component
└── public/
    ├── fonts/                 # Boska + Satoshi
    ├── gallery/               # Event highlight photos
    ├── hero-video/            # 240 animation frames
    ├── sponsors/              # Sponsor logos
    └── venues/                # Venue logos
```

## Deployment

**Live on Vercel** (Centervert account)
- Repository connected: https://github.com/Centervert/businessnbrews
- Root directory: `web`
- Framework: Next.js (auto-detected)
- DNS: Nameservers managed by Vercel
- SSL: Automatic via Vercel

## What's Built

- [x] Fixed header with navigation and CTA
- [x] Scroll-driven hero animation (240 frames)
- [x] About section
- [x] Sponsors logo strip
- [x] Past venues logo strip
- [x] Next event RSVP card (from Supabase; times in Eastern)
- [x] Past events list (auto-moves after event day passes)
- [x] Feathered photo strip
- [x] Footer with newsletter signup
- [x] **Coordinator dashboard** — `/dashboard` (Events, Signups); login at `/dashboard/login` or via discreet “Log in” in footer
- [x] Brand fonts (Boska + Satoshi)
- [x] Brand colors (Carolina, Midland, Coastal, Bayside)

**Coordinator accounts:** Create users in the [Supabase Dashboard](https://supabase.com/dashboard) → Authentication → Users (email/password). Only authenticated users can access `/dashboard` and `/api/admin/*`.

If you get **"Invalid login credentials"** after creating a user: Supabase often requires new users to confirm their email before they can sign in. Either (1) in the Dashboard, open the user and use **Confirm email** (or recreate the user with **Auto Confirm User** checked), or (2) in Authentication → Providers → Email, turn off **Confirm email** so sign-in works without confirmation. Adding `http://localhost:3000` to Authentication → URL Configuration → **Redirect URLs** is also recommended for local dev.

## Before going live

- **Vercel:** Set env vars in Project → Settings → Environment Variables (Production): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON`, `SUPABASE_SERVICE_ROLE_KEY`, and `NEXT_PUBLIC_SITE_URL` = your production URL (e.g. `https://www.businessnbrews.com`) so sign-out redirects correctly.
- **Supabase:** In Authentication → URL Configuration, add your production site to **Redirect URLs** (e.g. `https://www.businessnbrews.com/**`). Confirm coordinator users’ emails (or disable “Confirm email”) so they can sign in.
- **Supabase:** Table grants are required for `public.events` (e.g. `GRANT SELECT TO anon;` etc.). If you see “permission denied for table events” after deploy, run the same grants in the SQL editor as used in development.

## Next Steps

- [ ] Mobile navigation menu
- [ ] Eventbrite integration
- [ ] Newsletter signup (wire Resend)
- [ ] Google Maps for venues
- [ ] Full gallery page
- [ ] CMS integration for dynamic content
