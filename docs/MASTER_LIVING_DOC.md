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
| **Live Site** | Deployed on Vercel (Centervert account) |
| **DNS** | Nameservers managed by Vercel |
| **Status** | **DEPLOYED** — Production |

**Goal:** Modern rebuild of the Business & Brews site with premium dark hero, lighter content sections, and clean sponsor/venue presence.

**Current Scope:** Front-end only. No Eventbrite/Resend integrations wired yet.

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 16.x (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| React | 19.x |
| Hosting | Vercel |

---

## Project Structure

```
BusinessAndBrews/
├── web/                          # <- MAIN APP DIRECTORY
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx          # Home page
│   │   │   ├── layout.tsx        # Root layout
│   │   │   └── globals.css       # Global styles + fonts
│   │   └── components/
│   │       └── HeroScroll.tsx    # Hero animation component
│   ├── public/                   # Static assets
│   │   ├── bnb.logo.2.white.png  # Header logo
│   │   ├── bnb.badge.white.png   # Footer logo
│   │   ├── fonts/                # Boska + Satoshi fonts
│   │   ├── hero-video/           # 240 hero frames
│   │   ├── gallery/              # Event photos
│   │   ├── sponsors/             # Sponsor logos
│   │   └── venues/               # Venue logos
│   ├── package.json
│   └── next.config.ts
├── assets/                       # Source assets (not deployed)
│   ├── brand/                    # Logo source files
│   │   └── Updated_Jan202026/    # Latest logo versions
│   ├── hero-video/               # Original hero frames
│   └── photos/                   # All event photos
└── docs/                         # Documentation
    ├── README.md                 # Doc guide (start here)
    ├── MASTER_LIVING_DOC.md      # This file
    ├── businessandbrews.vizid.pdf # Brand identity
    └── archive/                  # Historical docs
```

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

## What's Built (Current UI)

### Header
- Fixed, semi-transparent dark bar
- Horizontal white logo (left)
- Nav: Events | Speakers | Venues | Gallery | Sponsors
- "Get Tickets" CTA button (right)

### Hero
- Full-bleed scroll-driven animation (240 frames)
- Headline: "SOUTH CAROLINA'S BEST NETWORKING GROUP"
- Scroll-fade/scale effect

### About Section
- Light background (Bayside)
- About text block
- Sponsor logos strip (light card)
- Past venues strip (dark card)

### Next Event Section
- RSVP card: When/Where/Who/Sponsored by
- "RSVP on Eventbrite" + "Add to Calendar" buttons
- Recent events sidebar

### Photo Strip
- Feathered photo strip below RSVP section

### Footer
- Dark background
- Badge logo + description
- Newsletter signup (email input + button)
- "Built by Centervert" credit

---

## How to Run Locally

```bash
git clone https://github.com/Centervert/businessnbrews.git
cd businessnbrews/web
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

## Task Status

### Completed
- [x] Deploy to Vercel
- [x] Configure custom domain
- [x] SSL certificate (automatic)
- [x] Configure nameservers
- [x] Update logos (Jan 20, 2026)

### In Progress / Pending

**Front-end Polish**
- [ ] Mobile navigation menu (hamburger)
- [ ] Tune hero overlay/contrast
- [ ] Adjust sponsor/venue logo sizing

**Integrations**
- [ ] Eventbrite sync + embedded checkout
- [ ] Newsletter platform (Resend/Mailchimp)
- [ ] Google Maps for venues

**Content**
- [ ] Replace placeholder event data with real data
- [ ] Expand venue logos list

---

## Changelog

| Date | Change |
|------|--------|
| Jan 20, 2026 | Updated header logo to `bnb.logo.2.white.png`, footer logo to `bnb.badge.white.png`. Reorganized docs: created README.md, rewrote master doc, archived old PRD and cursor brief. |
| Jan 17, 2026 | Deployed to Vercel, configured DNS |
| Jan 16, 2026 | Initial build complete |

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
5. **To deploy:** commit to `main` and push — Vercel auto-deploys
