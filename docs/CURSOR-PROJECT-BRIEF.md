# Business & Brews Website Rebuild
## Cursor Project Brief

**Project Owner:** Tyler Amos / Centervert
**Client:** Business & Brews (All Things Greenville LLC)
**Date:** January 16, 2026
**Repository:** https://github.com/Centervert/businessnbrews
**Hosting:** Vercel (Centervert account)
**DNS:** Nameservers managed by Vercel
**Status:** Deployed

---

## Quick Start for Cursor

This project has comprehensive documentation. Start by reading these files in order:

1. `docs/Website Recreation Detailed Overview Request.md` - Full PRD with technical specs
2. `docs/businessandbrews.vizid.pdf` - Visual identity guide (colors, fonts, logos)
3. `docs/CURSOR-PROJECT-BRIEF.md` - This file (photo/asset locations)

---

## Project Summary

Rebuild the Business & Brews website from a static WordPress site to a modern, dynamic platform with:
- Automated Eventbrite integration for events
- Custom Post Types for Speakers, Venues, Sponsors
- Dark mode aesthetic matching brewery/nightlife venues
- Mobile-first responsive design

**Current site:** https://businessandbrewssc.com/brewsgreenville/

---

## Tech Stack (Decided)

**Chosen:** Next.js (App Router) + Tailwind CSS

| Component | Technology |
|-----------|------------|
| Framework | Next.js 16.1.2 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Email | Resend (stubbed) |
| React | 19.2.3 |

The JAMstack approach was selected for better performance, developer experience, and modern deployment options (Vercel/Netlify).

---

## Brand Identity (from vizid.pdf)

### Colors
| Name | Hex | Usage |
|------|-----|-------|
| Carolina | #003D71 | Primary blue |
| Midland | #F2B554 | Accent/CTA (amber/gold) |
| Coastal | #78F0E8 | Secondary accent |
| Bayside | #F2F1EE | Light background |
| Black | #0F0F0F | Dark background |
| White | #FFFFFF | Text on dark |

### Typography
- **Headings:** Boska (Light, Regular, Medium, Bold, Black)
- **Body:** Satoshi (Light, Regular, Medium, Bold, Black)

### Logos
Located in `/assets/brand/`:
- `bnb.logo.horz.black.png` - Horizontal, black
- `bnb.logo.horz.white.png` - Horizontal, white (for dark backgrounds)
- `bnb.logo.vert.black.png` - Vertical, black
- `bnb.logo.vert.white.png` - Vertical, white
- `bnb.logo.square.black.png` - Square, black
- `bnb.logo.square.white.png` - Square, white

**Note:** Delete duplicate file `bnb.logo.square.black (1).png`

---

## Asset Inventory

### Directory Structure
```
/BusinessAndBrews/
├── assets/
│   ├── brand/           # 8 logo files
│   ├── hero-video/      # 240 JPG frames + 1 stock image
│   └── photos/          # 20 event folders (~1,500+ photos)
├── docs/
│   ├── Website Recreation Detailed Overview Request.md
│   ├── businessandbrews.vizid.pdf
│   └── CURSOR-PROJECT-BRIEF.md (this file)
```

### Photo Albums (20 Events)

| Folder | Date | Venue | Status |
|--------|------|-------|--------|
| 2023-01-17_Zen | Jan 17, 2023 | Zen | ✓ |
| 2023-02-15_AC-Hotel-Spartanburg | Feb 15, 2023 | AC Hotel Marriott | ✓ |
| 2023-03-21_Riverdogs-Charleston | Mar 21, 2023 | Riverdogs Charleston | ✓ |
| 2023-04-11_Silos-Brewing | Apr 11, 2023 | Silos Brewing | ✓ |
| 2023-05-16 | May 16, 2023 | **UNKNOWN** | ⚠️ Needs venue |
| 2023-06-13_Six-and-Twenty | Jun 13, 2023 | Six & Twenty | ✓ |
| 2023-08-09_Zen | Aug 9, 2023 | Zen | ✓ |
| 2023-09-13 | Sep 13, 2023 | **UNKNOWN** | ⚠️ Needs venue |
| 2023-10-10_South-Wind-Ranch | Oct 10, 2023 | South Wind Ranch | ✓ |
| 2023-11-15 | Nov 15, 2023 | **UNKNOWN** | ⚠️ Needs venue |
| 2023-12-12_Six-Twenty | Dec 12, 2023 | Six & Twenty | ✓ |
| 2024-03-12_Smileys-on-the-Roxx | Mar 12, 2024 | Smileys on the Roxx | ✓ |
| 2024-05-21_Spartanburg | May 21, 2024 | Fr8 Yard | ✓ |
| 2024-06-18_Aloft | Jun 18, 2024 | Aloft Hotel | ✓ |
| 2024-09-10_CityClub | Sep 10, 2024 | City Club of Greenville | ✓ |
| 2024-10-22_Cambria-Hotel | Oct 22, 2024 | Cambria Hotels | ✓ |
| 2024-11-13_Radio-Room | Nov 13, 2024 | Radio Room | ✓ |
| 2025-01-21_Hotel-Hartness | Jan 21, 2025 | Hotel Hartness | ✓ |
| 2025-02-18_The-Draper | Feb 18, 2025 | The Draper | ✓ |
| 2025-04-29_City-Club-Greenville | Apr 29, 2025 | City Club of Greenville | ✓ |

### Hero Video
- **Location:** `/assets/hero-video/`
- **Contents:** 240 sequential JPG frames (ezgif-frame-001.jpg through ezgif-frame-240.jpg)
- **Additional:** 1 Adobe Stock image (AdobeStock_612341096-Custom.jpeg)
- **Note:** These frames can be reassembled into video or used for animated hero backgrounds

---

## Data Models (from PRD)

### CPT: Events
- Title (event name)
- Date/Time
- Venue (relationship to Venue CPT)
- Speaker (relationship to Speaker CPT)
- Description
- Ticket URL (Eventbrite link)
- Status (upcoming/past)
- Photos (gallery)

### CPT: Speakers
- Name
- Job Title
- Organization
- Headshot
- LinkedIn URL
- Bio
- Events (relationship)

### CPT: Venues
- Name
- Address
- Type (Brewery, Hotel, Event Hall, etc.)
- Website
- Logo
- Photos
- Capacity (optional)

### CPT: Sponsors
- Company Name
- Logo
- Tier (Title, Venue Partner, Media Partner)
- Website
- Active (yes/no)

---

## Eventbrite Integration

**Organizer:** All Things Greenville LLC  
**Profile:** https://www.eventbrite.com/o/business-brews-109127867981

### API Strategy
1. Authenticate with Eventbrite API
2. Poll `/v3/organizations/{org_id}/events/` hourly
3. Map Eventbrite fields to WordPress/CMS fields
4. Auto-archive past events (don't delete)
5. Use embedded checkout widget for seamless ticket purchase

---

## Speaker Data for Migration

From the website's Past Speakers section:

**2025:**
- Jim Burns (Jan 21) - Hotel Hartness
- Sam Konduras (Feb 18) - The Draper
- Jason Zacher (Mar 11) - Jack & Diane's
- Pamela Evette (Apr 29) - City Club

**2024:**
- Tim Vieira (Jan 10) - Bon Secours
- Heath Dillard (Mar 12) - Smileys
- Tyson Jeffers (May 21) - Fr8 Yard
- Joe Erwin (Jun 18) - City Club
- Michael Grozier (Jul 16) - New Realm
- Terry Merritt (Aug 20) - Bridgeway
- Knox White (Sep 10) - City Club
- Kamber Parker Bowden (Oct 22) - Cambria
- Benton Blount (Nov 15) - Radio Room

**2023:**
- Knox White (Jan 17) - Zen
- Nick Kremydas (Feb 15) - AC Hotel
- Eric Weissman (Mar 14) - Swanson's Warehouse
- Campbell Mills (Apr 11) - Silos
- Carl Sobincinski (Jun 13) - Six & Twenty
- Ray Tanner (Aug 9) - Zen
- Brandy Amidon (Oct 10) - South Wind Ranch

---

## Venue Database

**Breweries:**
- Bridgeway Brewing Co.
- Fireforge
- New Realm Brewing
- Silos Brewing
- Six & Twenty
- Southernside Brewing
- Yeehaw Brewing

**Hotels/Event Spaces:**
- AC Hotel Spartanburg
- Aloft Hotel
- Cambria Hotels
- City Club of Greenville
- Hotel Hartness
- The Draper
- Zen

**Other Venues:**
- Bon Secours Wellness Arena
- Fr8 Yard
- Jack & Diane's Dueling Piano Bar
- Radio Room
- Smileys on the Roxx
- South Wind Ranch
- Swanson's Warehouse

---

## Open Questions for Client

1. ~~**Tech Stack:** WordPress as specified, or consider modern alternatives (Next.js, Astro)?~~
   **RESOLVED:** Next.js + Tailwind CSS

2. **Missing Venues:** What venues were used for:
   - May 16, 2023
   - September 13, 2023
   - November 15, 2023

3. **Charleston:** Include Charleston chapter in this build or separate project?

4. ~~**Hosting:** Where will this be deployed?~~
   **RESOLVED:** Vercel (Centervert account), nameservers managed by Vercel

5. **Gallery Feature:** Photo gallery with search/filter by event date and venue?

6. **Newsletter:** Which platform? Mailchimp, Constant Contact, or other? (Resend stubbed in code)

---

## Files to Clean Up

After client approval, delete:
- `/businessandbrews-photo-download-1of1/` (empty folder)
- `/businessandbrews-photo-download-1of1.zip` (original download)
- `/assets/brand/bnb.logo.square.black (1).png` (duplicate)

---

## Next Steps

1. [x] ~~Get client answers to open questions~~
2. [x] ~~Finalize tech stack decision~~ → Next.js + Tailwind
3. [x] ~~Create wireframes/mockups based on PRD specs~~
4. [x] ~~Set up development environment~~
5. [x] ~~Build component library with brand colors/fonts~~
6. [ ] Implement data models (CMS integration)
7. [ ] Build Eventbrite integration
8. [ ] Migrate speaker/venue data
9. [ ] Import photo galleries (full gallery page)
10. [x] ~~Deploy to production~~ → Vercel (Centervert account)
11. [ ] QA and launch
