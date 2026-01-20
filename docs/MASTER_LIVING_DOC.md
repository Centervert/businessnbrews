# Business & Brews — Master Living Doc

Purpose: single source of truth for what exists, what's done, and what's next.
This doc should let anyone pick up the project immediately.

---

## Project Snapshot
- **Client:** Business & Brews (All Things Greenville LLC)
- **Goal:** modern rebuild of the Business & Brews site with a premium dark hero, lighter content sections, and clean sponsor/venue presence. Integrations come later.
- **Scope today:** front-end only; no Eventbrite/Resend/etc. wired.
- **Repository:** https://github.com/Centervert/businessnbrews
- **Hosting:** Vercel (Centervert account)
- **DNS:** Nameservers managed by Vercel
- **Status:** Deployed

---

## Tech Stack (current)
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind (via `@import "tailwindcss"`)
- **Assets:** Local images in `web/public/`
- **Dev:** `npm run dev` in `web/`
- **Dev UI disabled:** `devIndicators: false` in `web/next.config.ts`

---

## Project Structure (important)
- **App root:** `web/`
- **Home page:** `web/src/app/page.tsx`
- **Global styles:** `web/src/app/globals.css`
- **Hero animation:** `web/src/components/HeroScroll.tsx`
- **API stub:** `web/src/app/api/contact/route.ts` (Resend placeholder, not used)
- **Public assets:** `web/public/`

---

## Brand Assets & Fonts
- **Logo usage**
  - Header: `web/public/bnb.logo.2.white.png`
  - Footer: `web/public/bnb.badge.white.png`
  - Footer credit: `web/public/centervert-builtby.png`
- **Colors** (from `docs/businessandbrews.vizid.pdf`):
  - Carolina `#003D71`
  - Midland `#F2B554`
  - Coastal `#78F0E8`
  - Bayside `#F2F1EE`
  - Black `#0F0F0F`
  - White `#FFFFFF`
- **Fonts**
  - Boska Black + Satoshi Regular via `@font-face` in `web/src/app/globals.css`
  - Files in `web/public/fonts/` (copied from `assets/Fonts/.../OTF`)

---

## What’s Built (current UI)
**Header**
- Fixed, semi‑transparent dark bar with horizontal white logo and CTA.

**Hero**
- Full‑bleed, scroll‑driven animation cycling 240 hero frames.
- Centered headline: “SOUTH CAROLINA’S BEST NETWORKING GROUP.”
- Subtle scroll‑fade/scale on the hero copy.

**About + Sponsors + Venues**
- About block (light background).
- Sponsor logos strip (light card).
- Past venues strip (dark card) under sponsors.

**Next Event**
- RSVP card with When/Where/Who/Sponsored by + RSVP/Calendar buttons.
- Recent events list with “See past events” CTA.

**Photo Strip**
- Feathered photo strip **below RSVP** (kept per latest request).

**Footer**
- Dark footer, smaller height.
- Newsletter input + CTA (inline).
- Centered “Built by Centervert” image credit at bottom.

---

## Assets & Data Changes
- **Hero frames** copied to `web/public/hero-video/`
- **Gallery highlights** images copied to `web/public/gallery/`
- **Sponsors** copied to `web/public/sponsors/`
- **Venues** copied to `web/public/venues/`
- **City Club** uses `web/public/venues/city-club.svg`
- **Logo cleanup:** Sponsor + Venue logo files were processed for transparency and trimmed. `Hartness.jpg` converted to `Hartness.png`.

---

## What Was Removed / Disabled
- Full gallery page/section (replaced by small feathered strip only).
- Large “Explore Business & Brews” card grid (removed).
- Next.js dev indicator bubble (disabled).
- Default Next.js favicon replaced with Business & Brews icon.

---

## Known Issues / Notes
- Local dev sharing (tunnels) can be slow; localtunnel was stopped.
- If a logo looks off, the underlying image may need manual cleanup beyond the auto transparency pass.

---

## How to Run Locally
```bash
git clone https://github.com/Centervert/businessnbrews.git
cd businessnbrews/web
npm install
npm run dev
```
Open `http://localhost:3000`

## Deployment
**Live on Vercel** (Centervert account)
- **Repository:** https://github.com/Centervert/businessnbrews
- **Root directory:** `web`
- **Framework:** Next.js (auto-detected)
- **DNS:** Nameservers managed by Vercel
- **Environment variables:** See `web/env.example`

---

## Next Tasks (shortlist)
**Deployment**
- [x] Deploy to Vercel
- [x] Configure custom domain
- [x] Set up SSL certificate (automatic via Vercel)
- [x] Configure nameservers with Vercel

**Front-end polish**
- [ ] Tune hero overlay/contrast if needed for vizid balance
- [ ] Adjust sponsor/venue logo sizing as new logos are added
- [ ] Confirm the feathered photo strip placement & density
- [ ] Mobile navigation menu (hamburger)

**Integrations**
- [ ] Eventbrite sync + embedded checkout
- [ ] Newsletter platform hookup (Resend/Mailchimp)
- [ ] Google Maps for venues

**Content**
- [ ] Replace RSVP placeholder content with real upcoming event data
- [ ] Expand venue logos list (as provided)

---

## References
- PRD: `docs/Website Recreation Detailed Overview Request.md`
- Visual Identity: `docs/businessandbrews.vizid.pdf`
- Asset inventory: `docs/CURSOR-PROJECT-BRIEF.md`
