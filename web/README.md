# Business & Brews Website

Modern rebuild of the Business & Brews website using Next.js and Tailwind CSS.

**Repository:** https://github.com/Centervert/businessnbrews

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

**Email (Resend):**
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_TO_EMAIL`

**Eventbrite sync (future):**
- `EVENTBRITE_API_TOKEN`
- `EVENTBRITE_ORG_ID`

**Optional:**
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- `NEXT_PUBLIC_SITE_URL`

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

Deploy to Vercel or Netlify:

1. Connect this GitHub repository
2. Set root directory to `web`
3. Framework preset: Next.js
4. Add environment variables as needed

## What's Built

- [x] Fixed header with navigation and CTA
- [x] Scroll-driven hero animation (240 frames)
- [x] About section
- [x] Sponsors logo strip
- [x] Past venues logo strip
- [x] Next event RSVP card
- [x] Recent events list
- [x] Feathered photo strip
- [x] Footer with newsletter signup
- [x] Brand fonts (Boska + Satoshi)
- [x] Brand colors (Carolina, Midland, Coastal, Bayside)

## Next Steps

- [ ] Mobile navigation menu
- [ ] Eventbrite integration
- [ ] Newsletter signup (wire Resend)
- [ ] Google Maps for venues
- [ ] Full gallery page
- [ ] CMS integration for dynamic content
