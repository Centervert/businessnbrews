# Business & Brews Website

Modern rebuild of the Business & Brews Greenville website using Next.js,
headless CMS (TBD), and an automated Eventbrite sync.

## Local Development

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a local `.env.local` using `env.example` as a reference.

Required for email:
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_TO_EMAIL`

Required for Eventbrite sync (future):
- `EVENTBRITE_API_TOKEN`
- `EVENTBRITE_ORG_ID`

Optional:
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- `NEXT_PUBLIC_SITE_URL`

## Project Structure

- `src/app` App Router pages + API routes
- `src/app/api/contact` Resend-powered contact endpoint
- `src/app/globals.css` Brand colors and typography tokens

## Next Steps

- Add CMS schema definitions for Events, Speakers, Venues, Sponsors, Photos
- Implement Eventbrite sync job
- Build gallery ingestion pipeline for event photos
