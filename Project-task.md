# project-task.md — rhuzz v4 (Next.js) — AI coding brief

Build the portfolio of **Rhuzzel Paramio** (Full-stack Engineer / QA Specialist). This file is the single source of truth for an AI coding agent. Read it fully, then work phase by phase. Visual source of truth: `mockup.html` (open it in a browser; copy its CSS values). Design rationale: `DESIGN.md`. Scope history: `PROJECT.md`.

Reference studied for attitude only: https://www.yanzcruz.com/. **Do not copy its assets, copy, name styling or palette.**

---

## 0. Ground rules
- Next.js **App Router**, TypeScript strict, Tailwind CSS. Deploy to Vercel.
- Match `mockup.html` pixel-for-pixel on desktop (≥1100px) first, then responsive.
- No placeholder lorem. Where real content is missing use the explicit `Placeholder:` strings in section 7 so they are searchable and easy to replace.
- Accessibility is required (section 12). Audio never autoplays.
- Do not add libraries not listed in section 2 without asking.
- Every phase ends with the checks in section 14 passing.

## 1. Files that already exist (do not recreate; move into the repo)
```
portfolio-v4/
  mockup.html            visual reference (single file, plain CSS/JS)
  terms.html privacy.html legal.css   legal placeholders to port to routes
  assets/rhuzz-cutout.png             hero photo, background removed (696x1207 RGBA PNG, ~590KB)
  assets/music/soundtrack.mp3         "Volatile Reaction" by Kevin MacLeod, CC BY 4.0 (5.3MB)
  assets/music/CREDITS.md             attribution text (must appear in footer)
  DESIGN.md PROJECT.md rhuzz-v4-demo.pptx
```
Optimise on import: convert the cutout to **WebP/AVIF** (keep PNG fallback), height ≤1400px, use `next/image` with `priority`. Keep the MP3 in `public/audio/` (do not import it in JS bundles).

## 2. Tech stack (final)
| Concern | Choice |
|---|---|
| Framework | Next.js 15 (App Router), React 19, TypeScript strict |
| Styling | Tailwind CSS v4 + CSS variables for tokens |
| Motion | Framer Motion (`motion/react`), always honor `prefers-reduced-motion` |
| Fonts | `next/font/google`: **Anton**, **Space Grotesk** (400/600), **JetBrains Mono** (400/500) |
| Forms | `react-hook-form` + `zod` |
| Email | Next Route Handler `POST /api/contact` + **Resend** (env `RESEND_API_KEY`, `CONTACT_TO`) |
| Spam | honeypot field + basic rate limit (in-memory per IP, 5/hour; note Vercel serverless limits) |
| Analytics | none by default (privacy page says so); optional Vercel Analytics later |
| Content | typed data files in `src/content/*.ts` (no CMS) |
| Tests | Playwright (smoke + a11y with `@axe-core/playwright`), Vitest for pure functions |
| Lint/format | ESLint (next/core-web-vitals), Prettier |
| CI | GitHub Actions: lint, typecheck, build, Playwright |
| Hosting | Vercel; domain `rhuzz.online` (confirm) |

Scaffold: `npx create-next-app@latest rhuzz-v4 --ts --tailwind --eslint --app --src-dir --import-alias "@/*"`.

## 3. Design tokens (whale blue, corporate)
```css
:root{
  --paper:#F2F6FB; --card:#FFFFFF; --ink:#0B1B33; --muted:#51627A;
  --line:rgba(11,27,51,.16); --sky:#8DBBF2; --blue:#1F5FBF; --fail:#C8553D;
}
```
Map into Tailwind theme (`paper, card, ink, muted, line, sky, blue, fail`). Contrast: `--blue` on `--paper` and white on `--blue` ≥ AA; `--muted` on paper ≥ AA. `--fail` used for FAIL markers only. Keep tokens in `globals.css`; no hardcoded hex in components.

Type: display = Anton uppercase, `line-height:.9`; body = Space Grotesk 17px/1.6; labels = JetBrains Mono 12px uppercase, `letter-spacing:.08em`.
Radius: cards 14-16px, pills 99px, dialog 18px. Borders: `1.5px solid var(--ink)`. Hover on project card: `translateY(-4px)` + `box-shadow:6px 6px 0 var(--ink)`.

## 4. Information architecture / routes
Single scrolling home with anchors, plus real routes for SEO. Home sections in order:

| # | id | Section |
|---|---|---|
| gate | – | Entry gate overlay (skippable) |
| – | – | Header, Hero (with marquee inside first viewport) |
| 01 | `work` | Selected work (filterable grid + drawer) |
| 02 | – | Behind the work (manifesto, ink bg) |
| 03 | `do` | What I do (3 services) |
| 04 | – | How I work (6-step bug lifecycle) |
| 05 | `proof` | Proof (test report + certifications) |
| 06 | `about` | About |
| 07 | `contact` | Contact (sky bg, big CTA + form) |
| – | – | Footer (legal links, credits) |

Routes: `/` · `/projects` (full grid, same component) · `/projects/[slug]` (case study page; drawer deep-links here) · `/qa-testing` · `/tech-stack` · `/about` · `/certifications` · `/contact` · `/terms` · `/privacy` · `not-found`. Add `sitemap.ts`, `robots.ts`, OG image (`opengraph-image.tsx`), `metadata` per route.

## 5. Header (fixed)
Grid `grid-template-columns: 1fr auto 1fr`, padding 16px 32px, background `linear-gradient(var(--paper), transparent)`, z-index 10.
- Left: logo `rhuzz` + blue full stop (`<i>` in `--blue`), Anton 34px. Links to `/`.
- Center (truly centered, via grid): nav **About · Projects · Contact** (mono, gap 28px) → `#about`, `#work`, `#contact`.
- Right (`justify-content:flex-end`): **Download CV** (outline pill) → `/paramio-rhuzzel-cv-updated.pdf` (place PDF in `public/`), **View projects ↗** (filled `--blue`, white text) → `#work`.
- **No "Available" badge in the header** (removed by request).
- Mobile (<800px): hide nav; keep logo + the two CTAs (shrink padding); add a menu button only if needed.

## 6. Hero (exact composition)
Wrapper `.first` = `height:100vh; min-height:600px; display:flex; flex-direction:column`. Inside: `.hero` (`flex:1; min-height:0; overflow:hidden; position:relative; display:flex; justify-content:center; align-items:flex-end`) then the **marquee inside the first viewport**.

Hero background (blue gradient):
```css
background:
  radial-gradient(55% 65% at 52% 62%, rgba(31,95,191,.30), transparent 72%),
  linear-gradient(180deg,#F2F6FB 0%,#D6E5F8 60%,#B7D0F0 100%);
```
Layers (z-index):
0. **Ghost "RP"**: Anton, `position:absolute; top:9vh; right:-1vw; font-size:min(44vw,620px); line-height:.85`, fill = `linear-gradient(var(--blue) 10%, rgba(31,95,191,0) 88%)` via `background-clip:text; color:transparent`. It sits on the **right, behind the photo**. `aria-hidden`.
1. **Photo**: cutout PNG centered, `height:92%`, `object-fit:contain; object-position:bottom`, `max-width:90vw`. Alt: "Rhuzzel Paramio in a black blazer and navy tie".
3. **Intro (left)**: `position:absolute; left:max(32px,6vw); bottom:20vh; max-width:min(32ch,30vw)`. H1 "Rhuzzel<br>Paramio" Anton `clamp(48px,6.4vw,104px)` color `--ink`. Under it: "I build web systems, then try to break them. Shipped with proof that they pass." (Space Grotesk 600, `clamp(16px,1.35vw,20px)`, margin-top 16px).
3. **Role dialog (right, overlapping the legs, intentional)**: white card, `position:absolute; right:max(32px,6vw); bottom:8%`, border 1.5px ink, radius 18px, padding 16px 24px, shadow `0 12px 32px rgba(11,27,51,.18)`, text "Full-stack Engineer /<br>QA Specialist" Space Grotesk 600 `clamp(20px,2.3vw,34px)`. **This overlap with the legs is the intended design; do not move it.**
- No CTAs in the hero (they live in the header).
- Tablet (801-1100px): photo `margin-left:24vw`, intro `max-width:27vw`, h1 `6vw`.
- Mobile (<800px): intro `left:16px; bottom:24vh; max-width:50vw`; dialog `right:16px; bottom:4%`; ghost `60vw`.

**Marquee** (inside first viewport, under hero): `background:var(--sky)`, `border-block:1.5px solid var(--ink)`, Anton 28px uppercase, items: `Next.js ✦ Vue 3 ✦ Laravel ✦ .NET ✦ Playwright ✦ Selenium ✦ Docker ✦ PostgreSQL ✦ GitHub Actions ✦` duplicated, CSS animation 28s linear infinite `translateX(-50%)`; `aria-hidden`; disabled under reduced motion.

## 7. Content (typed in `src/content/`)

### 7.1 Projects (`projects.ts`)
Type:
```ts
type Project = { slug:string; title:string; category:'Web Dev'|'QA'|'Capstone'; featured?:boolean;
  stack:string[]; code?:string; live?:string; cover?:string /*image path*/; coverBg:string; coverFg:string;
  problem:string; solution:string; result:string }
```
Rule: show the first 4 stack tags on cards, all in the drawer/case study. Cover = image if provided, else a colored tile with initials (first letters of up to 3 words, Anton) and a mono "image placeholder" tag.

| # | Title | Cat | Stack | Code | Live |
|---|---|---|---|---|---|
| 01 | Selenium Test Framework V2 (featured) | QA | Selenium, C#, NUnit, ExtentReports | github.com/CodeDecoder13/Selenium-V.2 | – |
| 02 | Playwright E2E Suite | QA | Playwright, TypeScript, GitHub Actions, Allure | TODO verify `rhuzzel/playwright-suite` | – |
| 03 | Portfolio Website V2 | Web Dev | Next.js, TypeScript, Tailwind, Framer Motion, Supabase | github.com/CodeDecoder13/Project-Webportfolio | project-rhuzzparamio.vercel.app |
| 04 | CI/CD Pipeline Templates | QA | Jenkins, GitHub Actions, Azure DevOps, Docker, Bash | TODO verify `rhuzzel/cicd-templates` | – |
| 05 | Project Airzen | Capstone | Python, Docker, Kubernetes, CodeIgniter, Flutter | **TODO: own repo (v3 linked the wrong one)** | – |
| 06 | Portfolio Website V1 | Web Dev | HTML, CSS, JavaScript | TODO | TODO |
| 07 | Construction Contractors Inc | Web Dev | Vue 3, Laravel 12, Shadcn Vue, Tailwind, PostgreSQL | – | construction-contractors-inc-production.up.railway.app |
| 08 | DevCollab | Web Dev | Vue 3, Laravel 12, Shadcn Vue, Tailwind, PostgreSQL | – | devcollab-production-9ce4.up.railway.app |
| 09 | Eagles Fraternal Portal | Web Dev | Vue 3, Laravel 12, Shadcn Vue, Tailwind, PostgreSQL | – | eagles-portal-management-production.up.railway.app/admin |

Cover colors (bg/fg): 01 `#1F5FBF/#F2F6FB`, 02 `#8DBBF2/#0B1B33`, 03 `#DCE8F7/#0B1B33`, 04 `#4E86D4/#F2F6FB`, 05 `#0B1B33/#8DBBF2`, 06 `#B8C7DD/#0B1B33`, 07 `#8DBBF2/#0B1B33`, 08 `#1F5FBF/#F2F6FB`, 09 `#DCE8F7/#0B1B33`.
`problem/solution/result` default strings: `Placeholder: what needed solving, and for whom.` / `Placeholder: what you built and the key decisions.` / `Placeholder: a measurable outcome.` (owner fills later; do not invent metrics).

### 7.2 Other data files
- `services.ts`: Full-stack builds (Vue / Next / Laravel) · Automation + QA (Selenium / Playwright) · CI/CD + DevOps (Docker / Actions / Jenkins), each with a one-line promise ("Scalable web apps on modern stacks.", "Quality through layered testing.", "Deployments run by pipelines.").
- `lifecycle.ts`: New, Assigned, In progress, Fixed, Verified, Closed (last card filled `--sky`, label "06 ✓").
- `testReport.ts`: total 156, passed 148, failed 5, duration "4m 32s", coverage 87; categories Unit 52/1, Integration 38/2, E2E 28/1, API 30/1.
- `certs.ts`: CCNA Intro to Networks (Cisco, 2023) · Intro to Cybersecurity (Cisco, 2023) · Intro to Data Science (Cisco, 2024) · Intro to Generative AI (Google Cloud badge, 2024) · IT Specialist Python (Certiport, 2022) · IT Specialist Java (Certiport, 2022).
- `stack.ts`: Frontend (Next.js, React, TypeScript, Tailwind CSS, Framer Motion, HTML5/CSS3) · Backend (Node.js, Laravel, .NET, Prisma, Express.js, GraphQL) · Database (PostgreSQL, MySQL, Supabase, MongoDB, Redis) · QA & DevOps (Selenium, Playwright, Jenkins, Azure DevOps, GitHub Actions, Docker, Git, Jira) · Other tools (VS Code, Postman, Figma, Notion, Slack, npm, pnpm, Vercel, Netlify, Linux, REST, WebSockets, OAuth, JWT, Agile/Scrum). Proficiency levels (Expert/Advanced/Intermediate) **must be assigned per skill** (owner to confirm; default Advanced) so the legend means something.
- `about.ts`: experience (QA Intern / Software Developer 2023-24; Freelance Developer 2022-present; Technical Lead, university projects 2022-24), education (BS Software Engineering, FEU Institute of Technology 2020-25; TVL ICT, Panpacific University 2018-20; Junior High, Tayug Foundational Academy 2014-18), soft skills, interests (Gaming, Coffee, Anime, Lo-fi, Photography, Learning), journey timeline. **Owner to confirm dates and current graduation status** (today is Oct 2026).
- `site.ts`: name, role, email `boyparamio@gmail.com`, GitHub `github.com/CodeDecoder13`, LinkedIn `linkedin.com/in/rhuzz-6904b7187`, location Philippines, reply time "24-48h".

## 8. Section specs

### 8.1 Entry gate
Fixed full-screen overlay, `rgba(11,27,51,.86)` + `backdrop-filter:blur(14px)`, z-index 30. Content (centered): mono "Rhuzzel Paramio · Full-stack + QA"; Anton "Enter the / **portfolio**" (`clamp(56px,11vw,128px)`, second word `--sky`); two buttons: **`$ run portfolio`** (sky fill, ink text, enters silent) and **`with sound ♪`** (outline white, enters and starts music); link "Skip intro · sound off". `Esc` also enters. Exit animation 400ms (opacity + scale 1.04) then unmount. Show once per session (`sessionStorage`, try/catch). Must not block SEO: render real content underneath; overlay is client-only and `role="dialog"`, focus-trapped, restores focus.

### 8.2 01 Selected work
Header row: mono `01 /` + Anton h2 "Selected work" (`clamp(44px,8vw,110px)`). Filter pills: All · Web Dev · QA · Capstone (`aria-pressed`; active = ink fill, paper text). Grid 3 columns (1 on mobile) gap 16px. Card = `<button>`: cover (aspect 16/10, number top-left mono `01`, initials Anton `clamp(48px,6vw,84px)`, mono "image placeholder" bottom-right at 60% opacity when no image), body: title (Anton 26px), meta (category, optional `FEATURED` pill ink/sky), up to 4 stack tags. Click opens the **drawer** (right side, `min(480px,100%)`, card bg, left border, slide-in 300ms): Close button, `NN · category`, title Anton 44px, all tags, Problem / Solution / Result, **Code** (outline) and **Live demo ↗** (filled blue) when present. `Esc` closes; focus moves to Close and returns to the card. Sync URL to `/projects/[slug]` (shallow) so it is shareable.

### 8.3 02 Behind the work
Ink background, paper text. Anton `clamp(36px,7vw,96px)`, line-height .95, uppercase: "Ship it. / Then **break it.** / Fix what broke. / Prove it **passes.** / Repeat." Highlight words in `--sky`.

### 8.4 03 What I do
3 columns divided by 1px `--line`, top border 1.5px ink. Each: big number (Anton 64px, `--blue`), title Anton 34px, one-line promise, mono keyword row.

### 8.5 04 How I work
6 equal cards (2 columns on mobile), `border:1.5px solid ink; radius:14px; min-height:140px`, number Anton 32px + mono label. Last card filled `--sky`.

### 8.6 05 Proof
2 columns (1.2fr/1fr). Left: test report card — mono "Sample test run", Anton big `148/156`, progress bar (87%, `--blue` on `--line`), mono "87% coverage · **5 failed** (in `--fail`) · 4m 32s". Count-up on first view; **must end on the true values and render them without JS** (v3 bug showed 0). Right: certifications as tags. Also render the per-category breakdown (Unit/Integration/E2E/API) on `/qa-testing`.

### 8.7 06 About
Two cards: "My story" (bio placeholder + experience list) and Education + "Beyond code" tags. Full version at `/about` with journey timeline and soft skills.

### 8.8 07 Contact
`--sky` background; mono `07 /` + "Replies in 24-48h"; Anton `clamp(56px,13vw,200px)` "Let's ship / it ↗"; button "Send a message" opens the form (inline below or `/contact`). Form fields (all required): Name, Email, Subject, Message; honeypot; zod validation; inline errors; success/error toast; `POST /api/contact`. Also show email, GitHub, LinkedIn, location, reply time, and the CV download.

### 8.9 Footer
Ink bg, mono: `© 2026 Rhuzzel Paramio` · **Terms & Conditions** · **Privacy Policy** (links `/terms`, `/privacy`) · GitHub · LinkedIn · Email (with `aria-label`s) · full-width credit line: `Music: "Volatile Reaction" by Kevin MacLeod (incompetech.com), CC BY 4.0`.

### 8.10 Music player ("Portfolio soundtrack")
Fixed bottom-right pill (right/bottom 20px, z 15): ink bg, white text, radius 99px. Left: 40px **vinyl disc** (CSS repeating radial gradient + blue center label) that spins (3s linear) while playing. Text: tiny mono `PORTFOLIO SOUNDTRACK` + state `Sound off` / `Playing` / `Add track` (if the file 404s). Click toggles play/pause. `<audio loop preload="none" src="/audio/soundtrack.mp3">`, volume .5. Persist choice in `localStorage` (`snd`), but **never autoplay**: only start after a user gesture (gate "with sound" or pill click). Pause on `visibilitychange` hidden is optional. Respect reduced motion (no spin). `aria-label="Toggle soundtrack"`, `aria-pressed`.

### 8.11 Legal pages (`/terms`, `/privacy`)
Port `terms.html` and `privacy.html` verbatim as MDX or TSX using the site header/footer. Both carry a visible "Placeholder text. Replace and have it reviewed before publishing. Not legal advice." note (`--sky` box). Privacy must reflect real data collected (contact form fields; localStorage for theme/sound; no cookies/analytics unless added) and mention the Philippine Data Privacy Act of 2012 (RA 10173). Fill `[DATE]`, `[email]`, providers before launch.

## 9. Responsive
Breakpoints: ≤800 mobile, 801-1100 tablet, ≥1100 desktop. Container paddings 32px (16px mobile). Section padding 96px 32px (64px 16px mobile). Grids collapse to 1 column; lifecycle to 2 columns. Test at 360, 768, 1024, 1360, 1840.

## 10. Motion
Use Framer Motion sparingly: gate exit, hero line rise (fade + 8px, 60ms stagger), counters on view, drawer slide, card hover. Everything off/instant under `prefers-reduced-motion` (use `useReducedMotion`). No scroll-jacking.

## 11. Folder structure
```
src/
  app/
    layout.tsx page.tsx globals.css sitemap.ts robots.ts opengraph-image.tsx not-found.tsx
    projects/page.tsx projects/[slug]/page.tsx
    qa-testing/page.tsx tech-stack/page.tsx about/page.tsx certifications/page.tsx contact/page.tsx
    terms/page.tsx privacy/page.tsx
    api/contact/route.ts
  components/
    Gate.tsx Header.tsx Hero.tsx Marquee.tsx ProjectGrid.tsx ProjectCard.tsx ProjectDrawer.tsx
    Manifesto.tsx Services.tsx Lifecycle.tsx Proof.tsx TestReport.tsx About.tsx ContactSection.tsx
    ContactForm.tsx Footer.tsx MusicPlayer.tsx TechNetwork.tsx Legal.tsx
  content/  projects.ts services.ts lifecycle.ts testReport.ts certs.ts stack.ts about.ts site.ts
  lib/  cn.ts validators.ts rateLimit.ts
public/  audio/soundtrack.mp3  images/rhuzz-cutout.webp  paramio-rhuzzel-cv-updated.pdf  favicon + og
tests/  smoke.spec.ts a11y.spec.ts
.github/workflows/ci.yml
```
Client components only where needed (`Gate`, `ProjectGrid` filter/drawer, `MusicPlayer`, `ContactForm`, counters). Keep Hero/sections as server components.

## 12. Accessibility and performance (hard requirements)
- WCAG 2.2 AA: contrast, focus ring `3px solid var(--blue)` offset 3px, keyboard-complete (gate, filters, drawer, player), skip link to `#work`, landmarks, labeled icon links, alt text, `aria-pressed` on filters, `aria-hidden` on decoration (ghost RP, marquee).
- Hero photo: `priority`, correct `sizes`, WebP/AVIF; LCP < 2.5s, CLS < 0.1, Lighthouse ≥ 95 (Perf/A11y/BP/SEO) on mobile.
- Audio lazy: `preload="none"`.
- Security: validate all contact input server-side, escape in email, honeypot, rate limit, secrets only in env, no keys in client.

## 13. Phased tasks (execute in order; commit after each)
**Phase 1 — Scaffold & tokens.** create-next-app, install `framer-motion react-hook-form zod @hookform/resolvers resend`, dev deps `playwright @axe-core/playwright vitest prettier`. Fonts via `next/font`, tokens in `globals.css`, Tailwind theme mapping, `cn` util, base layout, metadata.
**Phase 2 — Content layer.** Create all `src/content/*.ts` from section 7 with types. No UI yet. Vitest: projects have unique slugs; every project has ≥1 stack item.
**Phase 3 — Header + Hero + Marquee.** Implement sections 5 and 6 exactly. Screenshot-compare against `mockup.html` at 1360 and 1840 widths.
**Phase 4 — Gate + MusicPlayer.** Sections 8.1 and 8.10. Move assets into `public/`.
**Phase 5 — Work grid + drawer + routes.** Section 8.2, `/projects`, `/projects/[slug]` (`generateStaticParams`).
**Phase 6 — Remaining home sections.** 8.3-8.9, footer with credit and legal links.
**Phase 7 — Inner pages.** `/qa-testing` (manual/automation/CI cards, lifecycle, full test report), `/tech-stack` (grouped skills with levels + interactive network on desktop, flat list on mobile), `/about`, `/certifications`, `/contact`.
**Phase 8 — Contact API.** `ContactForm` + `/api/contact` (zod, honeypot, rate limit, Resend). Handle failure states.
**Phase 9 — Legal pages.** Section 8.11.
**Phase 10 — Polish & QA.** Reduced motion, focus order, responsive sweep, SEO (sitemap, robots, OG, JSON-LD `Person`), image optimisation.
**Phase 11 — Tests & CI.** Playwright smoke: home loads, gate can be skipped with Esc, filter changes card count (All 9, Web Dev 5, QA 3, Capstone 1), drawer opens/closes, contact validation errors, legal pages reachable. Axe: no serious/critical violations on `/`, `/privacy`, `/terms`. GitHub Actions workflow.
**Phase 12 — Deploy.** Vercel project, env vars, domain, check headers, run Lighthouse.

## 14. Definition of done (per phase and overall)
- `pnpm lint`, `pnpm tsc --noEmit`, `pnpm build`, `pnpm test`, `pnpm playwright test` all pass.
- Desktop screenshot of hero matches `mockup.html`: name + tagline left, photo centered, blue "RP" behind on the right, role dialog overlapping the legs at bottom-right, marquee visible inside the first viewport, header nav centered, no badge in header.
- Filter counts: All 9 · Web Dev 5 · QA 3 · Capstone 1 (Portfolio V1/V2, Construction, DevCollab, Eagles = 5 Web Dev; Selenium, Playwright, CI/CD = 3 QA; Airzen = 1 Capstone).
- Music never plays before a user gesture; credit line visible in the footer.
- No counter ever shows 0 where a real value exists; no broken or duplicated repo links.

## 15. Open items the owner must supply (do not guess)
1. Real Problem / Solution / Result and cover images per project.
2. Confirm repo URLs for Playwright suite, CI/CD templates, Airzen, Portfolio V1.
3. Confirm experience dates, graduation status, bio text, per-skill proficiency.
4. Final domain, CV PDF, contact email for the form destination, Resend account.
5. Legal text review (Terms, Privacy) and its placeholders (`[DATE]`, `[email]`, providers, jurisdiction).
6. Confirm the music choice and CC BY credit wording, or replace the track (keep the same path).

## 16. Reference snippets (from mockup.html)
Marquee keyframes: `@keyframes m{to{transform:translateX(-50%)}}`. Vinyl disc: `radial-gradient(circle,var(--blue) 0 18%,#0B1B33 19% 24%,transparent 25%), repeating-radial-gradient(#111 0 2px,#1d2a44 3px 4px)`. Header: `display:grid; grid-template-columns:1fr auto 1fr`. Card hover: `box-shadow:6px 6px 0 var(--ink); transform:translateY(-4px)`.