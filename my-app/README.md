# rhuzz v4

Portfolio of Rhuzzel Paramio. Next.js 16 (App Router, Cache Components), React 19, Tailwind v4. The brief is `../Project-task.md`.

```bash
npm install --legacy-peer-deps   # @hookform/resolvers has optional peers npm can't resolve
npm run dev
npm run lint && npm run typecheck && npm test && npm run build
npm run e2e                      # Playwright smoke + axe; builds and serves on :3100
```

Read `AGENTS.md` and `node_modules/next/dist/docs/` before changing Next APIs: this version differs from Next 15.

## Environment

Set in `.env.local` for dev and in Vercel for production:

- `RESEND_API_KEY`: Resend API key (required)
- `CONTACT_TO`: inbox that receives contact-form messages (required)
- `CONTACT_FROM`: optional verified sender, e.g. `Portfolio <hi@yourdomain>`; defaults to Resend's onboarding sender

Without the first two the contact form returns "not configured".

## Content still owed by the owner

- Real problem/solution/result and cover images per project (`content/projects.ts`)
- Repo URLs for the Playwright suite and CI/CD templates
- Bio, dates, graduation status, per-skill levels (`content/about.ts`, `content/stack.ts`)
- `public/paramio-rhuzzel-cv-updated.pdf` (the header and contact links point to it)
- Legal text review: `[DATE]`, `[12 months]`, `[30 days]`, jurisdiction in `app/terms` and `app/privacy`
- Final domain: `metadataBase` in `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts` use `https://rhuzz.online`

## Deploy (Vercel)

1. Import the repo, set **Root Directory** to `my-app`.
2. Add the env vars above; set Install Command to `npm install --legacy-peer-deps`.
3. Add the domain, then run Lighthouse on mobile (target 95+ for Performance/Accessibility/Best Practices/SEO).
