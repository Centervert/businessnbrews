# Documentation Guide

## START HERE

**Primary Document:** [`MASTER_LIVING_DOC.md`](./MASTER_LIVING_DOC.md)

This is the single source of truth for the project. Read this first and keep it updated.

---

## Document Hierarchy

| Priority | Document | Purpose |
|----------|----------|---------|
| 1 | **MASTER_LIVING_DOC.md** | Current state, what's built, how to run, next tasks |
| 2 | **businessandbrews.vizid.pdf** | Brand identity (colors, fonts, logos) |
| 3 | **archive/PRD-Original.md** | Original requirements doc (historical reference only) |

---

## Quick Reference

### Run Locally
```bash
cd web && npm install && npm run dev
```
Open http://localhost:3000

### Deploy
Push to `main` branch → Vercel auto-deploys

### Key Paths
- **Source code:** `web/src/app/page.tsx`
- **Styles:** `web/src/app/globals.css`
- **Assets:** `web/public/`

---

## For AI Assistants (Claude, Cursor, etc.)

**READ MASTER_LIVING_DOC.md FIRST** — it contains the current project state.

Do NOT rely on:
- `archive/PRD-Original.md` — this was the original proposal/requirements doc and does NOT reflect what was actually built (it proposed WordPress, we built Next.js)

The MASTER_LIVING_DOC.md is kept up to date with:
- Current tech stack
- File locations
- Logo/asset paths
- What's deployed vs what's pending
