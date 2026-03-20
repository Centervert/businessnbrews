# Business & Brews — Master Living Doc

> **THIS IS THE PRIMARY DOCUMENT** — Read this first. Keep it updated.
>
> Single source of truth for what exists, what's done, and what's next.

---

## Project Snapshot

| Field | Value |
|-------|-------|
| **Client** | Business & Brews (All Things Greenville LLC) |
| **Repository** | https://github.com/Centervert/businessnbrews |
| **Live Site** | https://www.businessnbrews.com |
| **Hosting** | Vercel (Centervert account) |
| **Database** | Supabase (project `byjvbyfgdidaggqlpftn`) |
| **DNS** | Nameservers managed by Vercel |
| **Status** | **DEPLOYED** — Production |

**Goal:** Modern rebuild of the Business & Brews site with premium dark hero, lighter content sections, clean sponsor/venue presence, and a coordinator dashboard for event management.

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 16.x (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| React | 19.x |
| Hosting | Vercel |
| Database | Supabase (Postgres + Auth + RLS) |
| Auth | Supabase SSR (`@supabase/ssr`) |

---

## Project Structure

```
BusinessAndBrews/
├── web/                              # <- MAIN APP DIRECTORY
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx              # Home page (public)
│   │   │   ├── signup/page.tsx       # Contact signup page
│   │   │   ├── handoff/              # Unlisted client handoff page
│   │   │   ├── dashboard/
│   │   │   │   ├── login/page.tsx    # Coordinator login
│   │   │   │   ├── events/           # Event list, add, edit
│   │   │   │   ├── signups/          # Contact signups list
│   │   │   │   └── layout.tsx        # Dashboard shell (sidebar nav)
│   │   │   ├── api/
│   │   │   │   ├── events/route.ts   # Public GET (upcoming/past)
│   │   │   │   └── admin/
│   │   │   │       ├── events/       # CRUD (GET, POST, PATCH, DELETE)
│   │   │   │       └── contacts/     # GET contacts list
│   │   │   ├── layout.tsx            # Root layout
│   │   │   └── globals.css           # Global styles + fonts
│   │   ├── components/
│   │   │   ├── Header.tsx            # Fixed nav + Eventbrite modal
│   │   │   ├── HeroScroll.tsx        # Hero animation (240 frames)
│   │   │   ├── EventsSection.tsx     # Next event + past events
│   │   │   └── FooterNewsletter.tsx  # Footer + newsletter modal
│   │   └── lib/
│   │       └── supabase/
│   │           ├── admin.ts          # Service role client (server-only)
│   │           ├── client.ts         # Browser client
│   │           ├── server.ts         # Server component client
│   │           └── middleware.ts      # Auth + route protection
│   ├── public/                       # Static assets
│   │   ├── fonts/                    # Boska + Satoshi fonts
│   │   ├── hero-video/               # 240 hero frames
│   │   ├── gallery/                  # Event photos
│   │   ├── sponsors/                 # Sponsor logos
│   │   └── venues/                   # Venue logos
│   ├── package.json
│   └── next.config.ts
├── assets/                           # Source assets (not deployed)
└── docs/                             # Documentation
```

---

## Authentication & Authorization

| Role | Access |
|------|--------|
| **Public (anon)** | Homepage, signup page, `GET /api/events` |
| **Coordinator (authenticated)** | Dashboard: events CRUD, signups list |
| **Service role** | Used by admin API routes server-side |

- Middleware protects `/dashboard/*` and `/api/admin/*` routes
- Coordinators log in at `/dashboard/login` via Supabase email/password auth
- Admin API routes use `createAdminClient()` with the service role key

---

## Database Schema (Supabase)

### `public.events`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| title | text | Event name |
| description | text | Nullable |
| starts_at | timestamptz | UTC |
| ends_at | timestamptz | UTC |
| venue_name | text | |
| venue_location | text | |
| speaker_name | text | Nullable |
| speaker_title | text | Nullable |
| eventbrite_url | text | Nullable; when set, "RSVP" link appears |
| gallery_images | jsonb | Nullable |
| created_at | timestamptz | Auto |
| updated_at | timestamptz | Set explicitly by PATCH handler (no DB trigger) |

**RLS:** Public SELECT for anon; full access for authenticated and service_role.

### `public.contacts`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| name | text | |
| email | text | |
| phone | text | Nullable |
| business | text | Nullable |
| created_at | timestamptz | Auto |

**RLS:** Service role only (no public read).

---

## Environment Variables

See `web/env.example` for the full list. Critical ones:

| Variable | Where | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Vercel + .env.local | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON` | Vercel + .env.local | Supabase anon key (public) |
| `SUPABASE_SERVICE_ROLE_KEY` | Vercel + .env.local | Service role key (server-only, **must match Supabase dashboard**) |

> **Important:** If the service role key is wrong or missing in Vercel, event saves will silently fail. The PATCH handler now detects this and returns a 500 with "0 rows modified" instead of failing silently.

---

## Brand Assets

### Logos (Current)
| Usage | File | Location |
|-------|------|----------|
| Header | `bnb.logo.2.white.png` | `web/public/` |
| Footer | `bnb.badge.white.png` | `web/public/` |
| Footer credit | `centervert-builtby.png` | `web/public/` |
| Favicon | `bnb-favicon.png` | `web/public/` |

### Colors
| Name | Hex | Usage |
|------|-----|-------|
| Carolina | `#003D71` | Primary blue |
| Midland | `#F2B554` | Accent/CTA (amber) |
| Coastal | `#78F0E8` | Secondary accent |
| Bayside | `#F2F1EE` | Light background |
| Black | `#0F0F0F` | Dark background |
| White | `#FFFFFF` | Text on dark |

### Fonts
- **Headings:** Boska Black
- **Body:** Satoshi Regular
- **Location:** `web/public/fonts/`
- **Defined in:** `web/src/app/globals.css`

---

## How to Run Locally

```bash
git clone https://github.com/Centervert/businessnbrews.git
cd businessnbrews/web
cp env.example .env.local   # fill in Supabase keys
npm install
npm run dev
```

Open http://localhost:3000

---

## Deployment

**Auto-deploys from `main` branch via Vercel**

| Setting | Value |
|---------|-------|
| Repository | https://github.com/Centervert/businessnbrews |
| Root directory | `web` |
| Framework | Next.js (auto-detected) |
| Build command | `next build` |
| Environment | See `web/env.example` |

---

## API Caching Strategy

All API routes use `export const dynamic = "force-dynamic"` and return `Cache-Control: no-store` headers to ensure fresh data on every request. Event mutations (POST, PATCH, DELETE) call `revalidatePath("/")` to regenerate the homepage immediately.

---

## Task Status

### Completed
- [x] Deploy to Vercel
- [x] Configure custom domain + SSL
- [x] Configure nameservers
- [x] Update logos (Jan 20, 2026)
- [x] Coordinator dashboard (events CRUD, signups list)
- [x] Supabase auth + RLS + middleware
- [x] Public event display from database
- [x] Signup page + contacts API
- [x] Login page redesign (split layout, hero image)
- [x] Mobile responsive dashboard (drawer nav, horizontal scroll tables)
- [x] Handoff page for client onboarding
- [x] Fix event save persistence (service role key + count check + cache headers)
- [x] Fix EDT/EST timezone handling in event forms
- [x] Lazy-loaded hero frames (55MB → 2.3MB initial load)

### Pending

**Integrations**
- [ ] Eventbrite sync + embedded checkout
- [ ] Newsletter platform (Resend/Mailchimp)
- [ ] Google Maps for venues

**Content**
- [ ] Expand venue logos list

---

## Changelog

| Date | Change |
|------|--------|
| Mar 20, 2026 | **Fix event save persistence:** Service role key was not applying updates on Vercel production. Added `{ count: "exact" }` to detect silent failures, explicit `updated_at` on every PATCH, diagnostic logging, and `Cache-Control: no-store` on all API responses. Fixed `toEasternISO` timezone bug (hardcoded EST +5 → dynamic EDT/EST offset). |
| Mar 18, 2026 | Added `force-dynamic` to all API GET routes to prevent Next.js static caching. Added `revalidatePath("/")` to event mutation routes. |
| Mar 18, 2026 | Coordinator dashboard, events from Supabase, lint fixes, go-live checklist. Login redesign, env var rename, middleware fix, mobile responsive portal. |
| Mar 17, 2026 | Add unlisted /handoff page for client project handoff. |
| Mar 16, 2026 | Add signup page, Supabase contacts API, newsletter/signup links. Add event backend and coordinator dashboard. |
| Feb 21, 2026 | Lazy load hero frames, update event to March 3 at City Club. |
| Jan 20, 2026 | Updated logos. Reorganized docs. |
| Jan 17, 2026 | Deployed to Vercel, configured DNS. |
| Jan 16, 2026 | Initial build complete. |

---

## Known Issues & Mitigations

| Issue | Mitigation |
|-------|------------|
| `updated_at` has no DB trigger | PATCH handler sets it explicitly on every update |
| Supabase `.update()` silently returns stale data if key is wrong | PATCH uses `count: "exact"` and returns 500 if count is 0 |
| Next.js App Router caches GET handlers by default | All routes use `force-dynamic` + `no-store` headers |
| EDT/EST offset changes with daylight saving | `toEasternISO` dynamically detects offset via `Intl.DateTimeFormat` |

---

## Other Documentation

| Document | Purpose |
|----------|---------|
| `businessandbrews.vizid.pdf` | Visual identity guide (colors, fonts, logo specs) |
| `archive/PRD-Original.md` | Original requirements doc (historical — proposed WordPress, we built Next.js) |

---

## Notes for AI Assistants

1. **Read this document first** — it reflects the actual current state
2. **Do NOT use** `archive/PRD-Original.md` as a guide — it was the original proposal and doesn't match what was built
3. **Code location:** `web/src/app/page.tsx` is the main page
4. **Assets location:** `web/public/` for deployed assets
5. **Database:** Supabase project `byjvbyfgdidaggqlpftn` — events and contacts tables
6. **Admin client:** `web/src/lib/supabase/admin.ts` uses `SUPABASE_SERVICE_ROLE_KEY`
7. **To deploy:** commit to `main` and push — Vercel auto-deploys
