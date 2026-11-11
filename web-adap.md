# web-adap.md — Adaptive portfolio plan ("Who are you?")

Plan only. No source file was changed. All paths are relative to `my-app/` unless stated.
Scanned against Next.js 16.4.2 (`cacheComponents: true`, `partialPrefetching: true` in `next.config.ts`) and its bundled docs in `node_modules/next/dist/docs/`.

## 1. Goal and non-goals

**Goal.** On first visit the site asks "Who are you?" and then shows each visitor only what they can read and use: technical detail for developers and students, plain language for recruiters and HR, business outcomes for owners and clients. The choice is remembered, can be changed at any time, and can be preset by a link the owner pastes into job applications.

**Non-goals.**
- No server-side personalisation, no accounts, no analytics, no tracking.
- No separate site per audience and no new design language. Same pages, same components, different copy and visibility.
- No invented numbers. Every claim must already exist in `content/` or be supplied by the owner (section 7).
- No change to what crawlers and no-JS visitors get: they keep today's full page.

## 2. Findings from the scan

### 2.1 Current structure

| Area | What exists | Files |
|---|---|---|
| Layout | Server layout. Inline `THEME_INIT` script sets `data-theme` before paint; `<html suppressHydrationWarning>`. Mounts `Header`, `Footer`, `RevealRoot`, `MusicPlayer`, `Gate`, `CookieConsent`, `ImageGuard`. Canonical is `"./"` (each page names itself, query strings dropped). | `app/layout.tsx` |
| Home | Order is Hero, Work (01 Selected work), Manifesto, Services (03 What I do), Lifecycle (04 How I work), Proof (05), About (06), ContactSection. | `app/page.tsx` |
| Inner pages | `/about`, `/projects`, `/projects/[slug]` (static params from `projects`), `/contact`, `/qa-testing`, `/tech-stack`, `/certifications`, legal: `/terms`, `/privacy`, `/ai-consent`, `/cookies`. | `app/**/page.tsx` |
| Nav | Header: Home, About, Projects, Contact + theme toggle + "Get my CV". `/qa-testing`, `/tech-stack`, `/certifications` are reachable from the footer only. | `components/Header.tsx`, `MobileMenu.tsx`, `Footer.tsx` |
| Intro overlay | Client-only `role="dialog"` named "Enter portfolio", z-30, shown once per tab (`sessionStorage "gate"`). Esc or any button enters. SSR renders nothing, so no-JS visitors never see it. | `components/Gate.tsx`, `HeroMotion.tsx` |
| Cookie banner | Non-modal region, bottom-left, z-16, shown until `localStorage "cookie-consent"` is `all` or `necessary`. It sits under the Gate, so the two do not fight today. | `components/CookieConsent.tsx`, `lib/consent.ts` |
| AI chat | `/contact` only. `ConsentGate` asks AI consent on first use, every visit. Chat posts `{messages}` to `/api/chat`, which sends one fixed `systemPrompt` to Gemini. | `components/ConsentGate.tsx`, `ContactChat.tsx`, `app/api/chat/route.ts`, `lib/persona.ts` |
| Content | Plain TS objects, all server-readable. | `content/site.ts`, `projects.ts`, `services.ts`, `lifecycle.ts`, `about.ts`, `certs.ts`, `skills.ts`, `stack.ts`, `testReport.ts` |
| Storage keys | `cookie-consent`, `theme`, `snd` (localStorage); `gate` (sessionStorage). Listed in the Cookie Policy table. | `app/cookies/page.tsx`, `app/privacy/page.tsx` |
| Middleware / proxy | None (`proxy.ts` / `middleware.ts` do not exist). None is needed for this plan. | — |
| Tests | Playwright smoke + axe. Global config seeds `cookie-consent=necessary`; each smoke test seeds `sessionStorage gate=1` unless its title contains "gate". `node content/check.ts` asserts content shape. | `playwright.config.ts`, `tests/smoke.spec.ts`, `tests/a11y.spec.ts`, `content/check.ts` |

Useful existing piece: the CV form already asks "Your role" from a fixed list (`cvRoles` in `lib/validators.ts`: Recruiter / HR, Hiring manager, Client / business owner, Developer / engineer, QA / tester, Student / learner, Other). The persona can preselect it.

### 2.2 Jargon-heavy today (a recruiter or owner cannot parse these)

| Where | Quote |
|---|---|
| `components/Hero.tsx` | Badge "Full-stack Engineer / QA Specialist / AI Engineer" |
| `components/Gate.tsx` | Button "$ run portfolio"; tag "Full-stack + QA + AI" |
| `components/Marquee.tsx` | "Next.js ✦ Vue 3 ✦ Laravel ✦ .NET ✦ Playwright ✦ Selenium ✦ Docker ✦ PostgreSQL ✦ GitHub Actions ✦ n8n ✦ Gemini" |
| `components/Manifesto.tsx` | "Vue · Laravel · Next.js", "CI/CD pipelines", "n8n automation", "ESP32 sensors to a Laravel API" |
| `content/services.ts` | "CI/CD + DevOps", "Deployments run by pipelines.", keyword rows ("Docker / Actions / Jenkins / Railway / Sentry / Vercel / Claude Code") |
| `content/lifecycle.ts` | "Typed code in small PRs", "Green CI and a live URL", "Data model, API routes, wireframes" |
| `components/TestReport.tsx` + `content/testReport.ts` | "$ npm run e2e", "148/156 tests passed", "Coverage 87%", suites Unit / Integration / E2E / API |
| `content/projects.ts` | OmniPOS: "multi-tenant platform with tenant-isolated architecture ... role-based access control"; Whale Wallet: "REST API ... about 250 PHPUnit tests"; AirZen: "computes AQI with the EPA breakpoint formula"; every card shows stack tags |
| `content/about.ts` | "Twilio A2P 10DLC SMS compliance", "Selenium WebDriver (C#) and Playwright (C#) suites" |
| `app/qa-testing/page.tsx` | "Selenium (C#, NUnit) and Playwright (TypeScript) suites covering UI and API checks" |
| `app/tech-stack/page.tsx` + `content/stack.ts` | The whole page is tool names with proficiency dots |
| `components/Footer.tsx` | "Built with Next.js · Tailwind · Motion" (harmless, leave) |

Note: the examples "Next.js 16" and "RLS" named in the brief do not appear anywhere in `app/`, `components/`, `content/` or `lib/`.

### 2.3 Already persona-neutral (no rewrite needed)

- Hero h1 (the name), portrait, Message / Book me buttons.
- Manifesto headline "I don't just ship it. I prove it works." and "If it can't be tested, it isn't done."
- About card: story, timeline ("The road so far"), interests. Experience and education on `/about`.
- Certifications list (`content/certs.ts`), ContactSection, `/contact` hero and call card, all legal pages, Footer contact block.
- Project `problem` and most `result` lines are already plain ("A clean, modern board my team uses to work together day to day.").

### 2.4 Risks found in the content

| Risk | Detail |
|---|---|
| Only one hard business number exists | "Cut checkout time by about 30%" (OmniPOS, `content/projects.ts`; repeated in `Manifesto.tsx`). No baseline or source is recorded. |
| Test report is a sample | `Proof.tsx` calls it "A sample run from my own test suite". 156 / 148 / 87% must not be presented to recruiters or owners as a result metric. |
| Unconfirmed data | `content/stack.ts`: "Owner to confirm per-skill levels; default is Advanced". `content/about.ts`: "Owner to confirm soft skills". "3+ Years building" is hardcoded in `app/projects/page.tsx` and `AboutHero.tsx`. |
| Strong compliance claim | "HIPAA-compliant elderly-care web application" (`content/about.ts`). Fine on a CV; risky as a business selling point without owner confirmation. |
| No repo links | `ProjectDetail.tsx` renders only "Visit website"; `projects.ts` says repo URLs are "left undefined until the owner confirms them", yet `/projects` hero pill says "Live demos and source". The dev view wants code links. |
| Section numbers are hardcoded | `SectionHead n="01".."06"`. Hiding sections leaves gaps (there is already no 02). |
| Tests pin current copy | `smoke.spec.ts` asserts nav link lists, "Brief #07", "148/156", "Book me", dialog name "Enter portfolio", card counts 8/7/1. The default view must stay byte-compatible so these keep passing. |

## 3. Personas and role mapping

Three personas plus a default. Ids double as the share-link value.

| Persona id | Label in the picker | One line |
|---|---|---|
| `dev` | "I build software" | Technical view. Jargon welcome. |
| `recruiter` | "I'm hiring" | Plain words. Fit, experience, CV, contact. |
| `business` | "I need something built" | Outcomes, risk, time. Book a call. |
| `all` (default / skip) | "Just looking" | Today's site, unchanged. Also what crawlers and no-JS get. |

| Visitor role | Persona | Wants in 10 seconds | Language level | Primary CTA |
|---|---|---|---|---|
| Recruiter | `recruiter` | What he does, where he is, is he available, CV | Plain, zero jargon | Get my CV |
| HR manager | `recruiter` | Education, work history, certificates, how to reach him | Plain, zero jargon | Get my CV |
| Hiring manager (non-technical) | `recruiter` | Role fit, recent job, proof he finishes things | Plain | Book a call |
| Engineering lead / hiring manager (technical) | `dev` | Stack, depth, how he tests, live projects | Technical | Get my CV |
| CTO / tech lead | `dev` | Architecture choices, quality habits, range | Technical | Book a call |
| Senior developer | `dev` | Code quality signals, process, tests | Technical | GitHub |
| Junior developer | `dev` | How it was built, what to learn from it | Technical, friendly | GitHub |
| Student | `dev` | Stack, journey, how he got here | Technical, friendly | See projects |
| QA engineer | `dev` (How I work opens on the QA track) | Test approach, tooling, bug workflow | Technical | See QA & testing |
| Peer / collaborator | `dev` | What he is good at, how to reach him | Technical | Message |
| CEO / founder | `business` | What he can build, proof it worked, how to start | Outcome language | Book a call |
| Business owner (shop, clinic, org) | `business` | "Can he make my thing?", example like mine | Plain, outcome | Book a call |
| Client / freelance buyer | `business` | Past client work, process, reply time | Plain, outcome | Send a message |
| Curious visitor / friend / family | `all` | A look around | Mixed (today's site) | Message |

A fourth persona for "technical hiring lead" is deliberately skipped: the `dev` view plus the CV and Book buttons already serves them. Add it only if the owner sees those visitors bouncing (open question 1).

## 4. UX flow

### 4.1 Where the picker lives: inside the existing Gate

The Gate already is a full-screen first-touch dialog with a focus trap and Esc handling. The picker becomes the Gate's content, so there is one overlay, never two.

| Situation | What the visitor sees |
|---|---|
| First visit, no saved persona | Gate shows "Who are you?" with four choices. One click picks the view **and** enters the site. |
| New tab, persona already saved | Gate as today ("Enter the portfolio") plus a small line "Viewing as: Recruiter · change". |
| Arrives by share link `/?for=recruiter` | Persona is applied before paint. Gate is skipped (a recruiter clicking from an application should land on content). |
| Presses Esc or "Skip" | Enters with the default view. Nothing is saved, so the question returns next session. |
| No JavaScript / crawler | No Gate, no picker, full default page (unchanged from today). |

Cookie banner: unchanged. It is non-modal at z-16 and sits behind the Gate (z-30), so it appears only after the visitor has entered. It does not stack with the picker. The persona is saved regardless of the cookie choice, exactly like `theme` today: it is an essential display preference, stays in the browser and is never sent anywhere. The AI-consent modal on `/contact` is unaffected.

### 4.2 Picker wireframe

```
+------------------------------------------------------------------+
|                 Rhuzzel Paramio · portfolio                      |
|                                                                  |
|                       WHO ARE YOU?                               |
|          I'll show you the version that fits.                    |
|                                                                  |
|  +----------------+  +----------------+  +--------------------+  |
|  | I'M HIRING     |  | I NEED         |  | I BUILD SOFTWARE   |  |
|  |                |  | SOMETHING BUILT|  |                    |  |
|  | Recruiter, HR, |  | Owner, founder,|  | Developer, QA,     |  |
|  | hiring manager |  | client         |  | student, tech lead |  |
|  +----------------+  +----------------+  +--------------------+  |
|                                                                  |
|                 [ Just looking, show everything ]                |
|                                                                  |
|     [ ] Play the soundtrack ♪           Skip (Esc)               |
|     You can change this any time from the top bar.               |
+------------------------------------------------------------------+
Mobile (375px): the three cards stack in one column, each at least
44px tall; "Just looking" and Skip stay visible without scrolling.
```

The old "$ run portfolio" button text goes away for first-time visitors (it is jargon); "enter with sound" becomes the checkbox.

### 4.3 Persistent switcher

- A native `<select>` labelled "Viewing as" in the Header's right-hand group (next to the theme toggle), styled as a pill. Options: Everything, Recruiter view, Business view, Developer view.
- On mobile it sits at the top of the burger menu (`MobileMenu.tsx`).
- Native select is chosen on purpose: free keyboard support, free screen-reader support, free mobile wheel picker, no new dialog code.
- On change: set the view, save it, scroll to top, and announce "Now showing the recruiter view" in an `aria-live="polite"` region.

### 4.4 Keyboard, screen reader, motion

| Concern | Behaviour |
|---|---|
| Focus | Gate's existing trap already cycles "button, a[href]"; add `input` for the checkbox. First focus lands on the first choice. Focus returns to the opener on close (existing code). |
| Names | Dialog keeps `aria-label="Enter portfolio"` (an existing test relies on it). The heading "Who are you?" is the visible title; each card is one `<button>` whose text includes the sub-line. |
| Esc | Same as today: closes, default view. |
| Hidden content | Variants are hidden with `display:none`, so they are also removed from the accessibility tree and tab order. No `aria-hidden` juggling. |
| Reading order | Sections are hidden, never visually reordered with CSS `order`, so tab order always equals visual order. |
| Reduced motion | No new animation. The Gate's fade already collapses under the global reduced-motion rule. |
| Contrast | Picker reuses Gate colours (`island-light`), already passing axe in both themes. |

## 5. Per-persona matrix

Legend: **show** as is · **hide** · **rewrite** (new copy, same component) · **trim** (part hidden).
Default (`all`) is always "show, as today".

### 5.1 Home sections

| Section (file) | `dev` | `recruiter` | `business` |
|---|---|---|---|
| Hero (`Hero.tsx`) | rewrite sub-line, badge; CTAs: See the work, GitHub | rewrite sub-line, badge; CTAs: Get my CV, Book a call | rewrite sub-line, badge; CTAs: Book a call, See results |
| Marquee (`Marquee.tsx`) | show | hide | hide |
| Selected work (`Work.tsx`, `ProjectGrid.tsx`) | show; stack tags on cards | show; cards show a one-line plain summary instead of stack tags | show; cards show the result line instead of stack tags; OmniPOS, Eagles Portal, Whale Wallet first is a later nice-to-have |
| Manifesto (`Manifesto.tsx`) | show | trim: keep headline, intro and "Now" fact; hide the tool-name stat list and annotation labels | trim: same as recruiter; keep "Shipped" fact rewritten without tool names |
| What I do (`Services.tsx`) | show | rewrite (5.3) | rewrite (5.3) |
| How I work (`Lifecycle.tsx`) | show both tracks | hide | show the dev track only, tabs hidden, retitled "How a project runs", step text rewritten plain (owner copy, section 7) |
| Proof (`Proof.tsx`) | show test report + certs | trim: certs only, retitled "Certificates" | hide |
| About (`About.tsx`) | show | show (this is their core content) | trim: story only, hide "Beyond code" tags |
| Contact (`ContactSection.tsx`) | show | rewrite headline: "Let's talk"; primary button: Get my CV | rewrite headline: "Tell me what you need"; primary button: Book a call |

### 5.2 Inner pages

| Page | `dev` | `recruiter` | `business` |
|---|---|---|---|
| `/about` | show | hide the "Work process" card (uses dev lifecycle steps); skills panel shows group names with a plain gloss; experience points get plain rewrites | hide skills panel and leadership; keep experience headline per role + contact block |
| `/projects` | show; hero pill "Live demos and source" only once repo links exist | rewrite blurb: "Things I built, what they do and who uses them." Category filter stays | rewrite blurb: "Real systems for real people. What the problem was and what changed." |
| `/projects/[slug]` and drawer (`ProjectDetail.tsx`) | show all; add "Code" link when owner supplies repos | hide stack tags; Problem / Solution / Result use plain variants | hide stack tags; order shown as Problem, Result, then "How" (plain solution); CTA under it: Book a call |
| `/contact` | show; chat chips technical | hero eyebrow "hiring?"; chips: "Is he available?", "Summarise his experience", "Send me his CV" | hero eyebrow "got a project?" (as today); chips: "What can he build for me?", "How does a project start?", "Book a call" |
| `/qa-testing` | show | footer link hidden; if opened directly, a one-line plain intro on top ("How I check that software works before people use it") and the page stays visible | same as recruiter |
| `/tech-stack` | show | footer link hidden; direct visits still work with a one-line plain intro | same as recruiter |
| `/certifications` | show | show; add to the recruiter's visible nav path via the Proof "Certificates" card link | footer link hidden |
| Legal pages | show | show | show |

Rule for direct visits: a persona never produces an empty page or a 404. Pages hidden from a persona's navigation still render in full if someone lands on them.

### 5.3 Example copy

**Hero** (h1 stays "Rhuzzel Paramio" for everyone, so the page keeps one stable h1).

| Persona | Sub-line | Badge card |
|---|---|---|
| `all` (today) | "I build web systems, then try to break them. Shipped with proof that they pass." | Full-stack Engineer / QA Specialist / AI Engineer |
| `dev` | "Laravel with Vue or Next.js, typed end to end, tested before it ships. I build it, then try to break it." | Full-stack / QA automation / AI integration |
| `recruiter` | "I build websites and web apps from start to finish, and I check my own work for mistakes before anyone else has to." | Builds web apps / Checks they work / Adds AI helpers |
| `business` | "I build the web system your business runs on, and I test it before your customers do. One sales system I built cut checkout time by about 30%." | Web apps built / Tested before launch / Automation that saves time |

Plain-word glossary the recruiter copy must use (zero tool names):

| Term | Plain wording |
|---|---|
| Full-stack | "builds the whole thing: the screens people use and the system behind them" |
| QA | "checks that software works properly and finds mistakes before users do" |
| AI engineer | "adds AI helpers to an app, such as a chat assistant or a tool that reads receipts" |
| Automation | "makes the computer do repeated work, such as re-checking an app after every change" |

**Services** (`content/services.ts` today: "Full-stack builds / Automation + QA / CI/CD + DevOps").

| # | `dev` (unchanged) | `recruiter` — "What I can do for your team" | `business` — "What I can build for you" |
|---|---|---|---|
| 1 | Full-stack builds. "Scalable web apps on modern stacks." Vue / Next / Laravel | **Builds complete web apps.** "The screens people use and the system behind them, handled by one person." | **A web app built around your business.** "Sales, stock, bookings or member records in one place. Example: one system I built runs several shop branches from a single platform." |
| 2 | Automation + QA. "Quality through layered testing." Selenium / Playwright | **Finds problems before users do.** "Checks each feature by hand, then sets up automatic checks that run again after every change." | **Fewer bugs reaching your customers.** "Every release is tested before it goes live, so problems are found by me, not by the people paying you." |
| 3 | CI/CD + DevOps. "Deployments run by pipelines." Docker / Actions / … | **Releases updates safely.** "New versions go live through the same checked steps every time, not by hand." | **Updates without the drama.** "Changes go live through a repeatable, automated process, so updates are quick and low-risk." |

Keyword rows are hidden for `recruiter` and `business`.

### 5.4 Claims check for business and recruiter copy

| Claim used above | Source in repo | Status |
|---|---|---|
| "cut checkout time by about 30%" | `content/projects.ts` (OmniPOS `result`) | Real, but owner must confirm how it was measured |
| "runs several shop branches from a single platform" | OmniPOS `problem` / `solution` | Real |
| "built for a real client" | Eagles Fraternal Portal `result` | Real |
| "a board my team uses day to day" | DevCollab `result` | Real |
| "reads receipts, daily safe-to-spend amount" | Whale Wallet | Real |
| "fewer bugs reaching your customers" | Process statement, no number | OK as a promise; **needs owner data** for any figure |
| Delivery speed, cost, timelines, uptime, client count, revenue | Not in `content/` | **Needs owner data. Do not write until supplied.** |
| Availability, notice period, remote / on-site, work authorisation | Not in `content/` | **Needs owner data** (recruiter view) |
| "HIPAA-compliant" as a selling point | `content/about.ts` | Keep on the CV-style experience list only until the owner confirms |

## 6. Technical design

### 6.1 Options weighed

| Option | Verdict | Why |
|---|---|---|
| (a) Client-only view + `data-persona` on `<html>` + CSS | **Core of the recommendation** | Pages stay fully prerendered. Same trick as the existing theme script. No flash, no hydration error. |
| (b) Cookie + read on the server | Rejected | Next docs (`02-guides/preventing-flash-before-hydration.md`): reading `cookies()` in the root layout opts the app out of static prerendering and, under Cache Components, blocks every segment under the layout. Also turns a browser-only preference into something sent on every request. |
| (c) Route segment `/for/[persona]` | Deferred | Would need duplicate route trees for every page (or a persona-only landing page that then falls back to (a) anyway), plus canonical work to avoid duplicate-content indexing. Not needed to get shareable links. |
| (d) Hybrid: (a) + `?for=` share link read by the same inline script | **Recommended** | Shareable links for applications with zero new routes. The canonical already points at the clean URL. |

### 6.2 How it works

1. **Server HTML contains the default view plus the short alternative strings**, each tagged with `data-for`. Whole sections that a persona should not see carry `data-for` listing who may see them.
2. **An inline script in `<head>`** (next to `THEME_INIT` in `app/layout.tsx`) runs before first paint:
   - reads `for` from `location.search`; if it is one of `dev | recruiter | business | all`, saves it to `localStorage "persona"` and, for a share link, sets `sessionStorage "gate"` to `1`;
   - otherwise reads `localStorage "persona"`;
   - sets `document.documentElement.dataset.persona` unless the value is `all` or missing.
   - Wrapped in `try/catch` like the theme script. The value is checked against the fixed list, so nothing from the URL is ever written into the page.
3. **CSS in `app/globals.css`** does the showing and hiding (five rules):
   - no `data-persona`: hide every `[data-for]` that does not include `all`;
   - `data-persona="x"`: hide every `[data-for]` that does not include `x`.
4. **Client components that need the value in JS** (Gate, switcher, Lifecycle default tab, ProjectGrid card line, ContactChat chips, CvRequest preselect) use one hook, `useView()`, built on `useSyncExternalStore` + a `MutationObserver` on `data-persona`. This is a copy of the pattern already in `components/ThemeToggle.tsx`. Server snapshot is `"all"`.

No React context provider is needed: the `<html>` attribute is the single source of truth, CSS reads it for free, and the hook reads it for the few client components. A `PersonaProvider` would add a wrapper around the whole tree for no gain. (Revisit only if a component needs the value during server render, which this design rules out.)

### 6.3 Data model — `content/personas.ts` (new)

```ts
export const views = ["all", "dev", "recruiter", "business"] as const;
export type View = (typeof views)[number];

// Picker and switcher labels.
export const viewMeta: Record<View, { label: string; pick: string; who: string }>;

// One entry per string that changes. Missing key = falls back to `all`.
type Copy = Partial<Record<View, string>> & { all: string };
export const copy: {
  hero: { sub: Copy; badge: Record<View, [string, string, string]>; cta1: Copy; cta2: Copy };
  services: Record<View, { title: string; items: { title: string; promise: string }[] }>;
  contact: { headline: Copy; cta: Copy };
  chat: Record<View, { hello: string; chips: string[] }>;
  // ...one block per rewritten section in section 5
};

// Who may see each section. Absent = everyone.
export const visibleTo: Record<string, View[]> = {
  marquee: ["all", "dev"],
  lifecycle: ["all", "dev", "business"],
  testReport: ["all", "dev"],
  // ...
};
```

Per-project plain text goes on the project itself as optional fields (`plain?: { summary; solution; result }`) in `content/projects.ts`, so project facts stay in one file. Section order is not in the model because v1 does not reorder (4.4).

### 6.4 New and changed code (smallest set)

Three new files, the rest are edits (full per-phase file lists in section 8):
- `lib/visitor.ts` — `VIEW_KEY = "persona"`, `readView()`, `setView(v)` (attribute + localStorage), `useView()`. Named `visitor` because `lib/persona.ts` is already the chat prompt. Includes the dev-only `useLayoutEffect` re-apply from the Next docs (Strict Mode remount clears script-set `<html>` attributes).
- `components/ViewSwitch.tsx` — the native select + live region, used in `Header.tsx` and `MobileMenu.tsx`.
- `content/personas.ts` — the data above.
- `components/Section.tsx` (edit) — `Section` gets optional `only?: View[]` → `data-for`; add a tiny server component `Swap` that renders one `<span data-for="…">` per distinct string of a `Copy`.

### 6.5 Flash, layout shift, Cache Components

- **No flash / no CLS:** the attribute is set while the HTML is still being parsed, before any paint; CSS then lays out the right variant on the first frame. This is the approach Next's own guide recommends for stored preferences.
- **Hydration:** hidden variants are real server-rendered DOM, identical on server and client, so React has nothing to reconcile. `<html>` already has `suppressHydrationWarning` for the script-set attribute.
- **Cache Components:** nothing reads `cookies()`, `headers()` or `searchParams` on the server, so every route stays statically prerendered. `useSearchParams` is deliberately not used (on a prerendered route it needs a Suspense boundary and client-renders that subtree); the inline script reads `location.search` instead.
- **Client-side navigation:** the attribute lives on `<html>`, which persists across `<Link>` navigations, so the view carries over without re-running anything.
- **Reveal animations:** `RevealRoot.tsx` skips elements with no box and re-arms on DOM mutations, so sections that appear after a switch should animate normally. Verify in Phase 2.
- **Section numbers:** drop the `n` prop usage or switch to a CSS counter so hidden sections do not leave gaps.

### 6.6 URL strategy and SEO

| Topic | Decision |
|---|---|
| Share links | `https://rhuzz.online/?for=recruiter`, `?for=business`, `?for=dev`. Works on any path (`/projects?for=business`). |
| Canonical | Already `alternates: { canonical: "./" }` in `app/layout.tsx`, which resolves to the path without the query. No change. Verify the rendered `<link rel="canonical">` on `/?for=recruiter` in Phase 4. |
| Sitemap / robots / llms.txt | Unchanged. `?for=` URLs are not added to `app/sitemap.ts`. |
| What crawlers index | The default view: complete, same headings, same h1. Alternative strings are present but `display:none`; keep them short (sentences, not pages) so the hidden text stays a small share of the page. |
| JSON-LD, OG image, titles | Unchanged, persona-independent. |
| Later, only if wanted | A static `/for/[persona]` landing page with its own OG card for link previews. Under Cache Components its `generateStaticParams` must return at least one param. |

### 6.7 AI chat adapts to the visitor

| Piece | Change |
|---|---|
| `components/ContactChat.tsx` | Sends `{ messages, view }`. Greeting and the three chips come from `copy.chat[view]`. |
| `app/api/chat/route.ts` | Body schema gains `view: z.enum(views).default("all")`. Because it is an enum, the client cannot inject prompt text. |
| `lib/persona.ts` | `systemPrompt` becomes `systemPromptFor(view)`: the same base prompt and FACTS, plus one AUDIENCE line. |

AUDIENCE lines:
- `dev`: "The visitor is technical. Tool names and implementation detail are welcome."
- `recruiter`: "The visitor is a recruiter or HR. Use everyday words. Do not use tool or framework names unless asked; if you must, explain each in a few words. Lead with role, experience, education and how to get the CV."
- `business`: "The visitor is a business owner or client. Lead with what the work achieved for the people using it. Never quote prices, timelines or guarantees: they are not in FACTS. Offer the 30-minute call."
- `all`: no extra line (today's behaviour).

The existing rule "answer from the FACTS only, never invent numbers" stays the first rule for every view.

### 6.8 Measurement

None. The site has no analytics and this plan adds none. The only signal the owner gets is indirect: the "Your role" field on CV requests and the wording of incoming messages. If the owner later wants numbers, that is a separate decision that also touches the Cookie and Privacy policies.

### 6.9 Policy text to update

- `app/cookies/page.tsx` table: add row `persona` · "Remembers which version of the site you chose (recruiter, business, developer or everything)" · localStorage · "Until you clear it".
- `components/CookieConsent.tsx`: "remember your theme, sound and consent" → add "and view".
- `app/privacy/page.tsx` Preferences bullet: add the view choice.

## 7. Content work required from the owner

**Copy to write or approve (per persona unless noted)**

- [ ] Picker: heading, sub-line, three card labels and sub-lines, skip label.
- [ ] Hero sub-line, badge (3 short lines), two CTA labels — approve or edit the drafts in 5.3.
- [ ] Services title + 3 items — approve or edit the drafts in 5.3.
- [ ] Manifesto "Shipped" fact without tool names (recruiter, business).
- [ ] "How a project runs": six plain steps for the business view (from the dev track in `content/lifecycle.ts`).
- [ ] Per project (8 visible): one plain summary line, plain "solution", plain "result". Priority: OmniPOS, Whale Wallet, Eagles Portal, DevCollab, AirZen.
- [ ] Experience points in plain words for the four roles in `content/about.ts` (recruiter view).
- [ ] Skill group glosses (4 groups in `content/skills.ts`), one line each.
- [ ] Contact headline + primary CTA wording; chat greeting + 3 chips per view.
- [ ] One-line plain intros for `/qa-testing` and `/tech-stack`.

**Real data needed (do not ship the related copy without it)**

- [ ] OmniPOS "about 30%": how it was measured (before / after, who measured). If unknown, soften to "faster checkout".
- [ ] Any other outcome numbers: hours saved by the Prisma booking automation, users on DevCollab / Eagles / Whale Wallet, delivery time for any project.
- [ ] Recruiter facts: open to full-time / contract / freelance, remote or on-site, time-zone overlap, earliest start.
- [ ] Confirm "3+ years building" and the skill levels in `content/stack.ts`.
- [ ] Confirm the HIPAA wording, and whether client names (Prisma, Reed Elsevier) may be used in business-facing copy.
- [ ] Public repo URLs per project for the dev view (or confirm "none").

**Recruiter one-page summary** (new block, top of the recruiter Home after the Hero, also reusable in the chat FACTS):

- [ ] Current role and employer · location · languages (already in `content/`).
- [ ] Three plain sentences: what he does, what he has delivered, what he is looking for (owner).
- [ ] Education + certificates count (already in `content/`).
- [ ] Availability line (owner data above).
- [ ] Buttons: Get my CV, Book a call, Email.

## 8. Phased implementation plan

### Phase 0 — Content and decisions · Effort: M (owner time)
- [ ] Answer the open questions in section 10.
- [ ] Deliver the copy and data in section 7.
- [ ] Fill `content/personas.ts` and `plain` fields in `content/projects.ts`.
- [ ] Extend `content/check.ts`: every view has every copy key; recruiter and business strings contain none of a banned-word list (Laravel, Vue, Next.js, API, CI/CD, Playwright, Selenium, PostgreSQL, Docker, pipeline, deploy, stack, full-stack, QA, …).

Files: `content/personas.ts`, `content/projects.ts`, `content/check.ts`.
Accept: `npm test` passes; owner has signed off each copy block; no number in recruiter or business copy lacks a source in `content/`.

### Phase 1 — Picker, hook, storage · Effort: M
- [ ] `lib/visitor.ts` (key, read, set, hook).
- [ ] `PERSONA_INIT` inline script in `app/layout.tsx`; visibility rules in `app/globals.css`.
- [ ] Picker inside `components/Gate.tsx`; `components/ViewSwitch.tsx` in `Header.tsx` and `MobileMenu.tsx`.
- [ ] Policy text (6.9).

Files: `lib/visitor.ts`, `app/layout.tsx`, `app/globals.css`, `components/Gate.tsx`, `components/ViewSwitch.tsx`, `components/Header.tsx`, `components/MobileMenu.tsx`, `app/cookies/page.tsx`, `app/privacy/page.tsx`, `components/CookieConsent.tsx`.
Accept: choosing a view sets `html[data-persona]` and `localStorage.persona`; reload keeps it with no visible flash; Esc leaves the default; `/?for=recruiter` applies the view and skips the Gate; every existing test in `tests/` passes unchanged; `next build` still reports all pages as static.

### Phase 2 — Home adaptation · Effort: M
- [ ] `Section only`, `Swap` in `components/Section.tsx`.
- [ ] Apply section 5.1 to Hero, Marquee, Work / ProjectGrid, Manifesto, Services, Lifecycle, Proof, About, ContactSection.
- [ ] Fix section numbering.

Files: `components/Section.tsx`, `Hero.tsx`, `Marquee.tsx`, `ProjectGrid.tsx`, `Manifesto.tsx`, `Services.tsx`, `Lifecycle.tsx`, `Proof.tsx`, `About.tsx`, `ContactSection.tsx`, `app/page.tsx`.
Accept: recruiter Home shows no word from the banned list in visible text; business Home shows the 30% line and a Book a call button above the fold at 375px and 1280px; default Home is pixel-identical to today; reveal animations still fire after switching views.

### Phase 3 — Inner pages · Effort: M
- [ ] Apply section 5.2 to `/about`, `/projects`, project detail + drawer, `/contact`, `/qa-testing`, `/tech-stack`, `/certifications`, Footer links.
- [ ] CV form preselects "Your role" from the view (`components/CvRequest.tsx`).

Files: `components/about/AboutSections.tsx`, `AboutHero.tsx`, `SkillsPanel.tsx`, `ExperienceExplorer.tsx`, `components/ProjectDetail.tsx`, `ProjectGrid.tsx`, `components/Footer.tsx`, `components/CvRequest.tsx`, `app/projects/page.tsx`, `app/contact/page.tsx`, `app/qa-testing/page.tsx`, `app/tech-stack/page.tsx`.
Accept: no page is empty or broken in any view; direct visits to hidden-from-nav pages render; the project drawer and `/projects/[slug]` show the same variant.

### Phase 4 — Chat persona and share links · Effort: S
- [ ] `systemPromptFor(view)` in `lib/persona.ts`; `view` in the `/api/chat` schema; greeting and chips in `ContactChat.tsx`.
- [ ] Document the three share links for the owner (README or a note in `Project-task.md`).
- [ ] Verify canonical on `?for=` URLs.

Files: `lib/persona.ts`, `app/api/chat/route.ts`, `components/ContactChat.tsx`.
Accept: a request with `view: "recruiter"` returns 200 and one with `view: "x"` returns 400; the recruiter greeting has no jargon; `/?for=business` has `<link rel="canonical" href="https://rhuzz.online">`.

### Phase 5 — QA and tests · Effort: M
- [ ] `tests/persona.spec.ts` (section 9); extend the path and view loops in `tests/a11y.spec.ts`.
- [ ] Manual: VoiceOver or NVDA pass on the picker and switcher; 375px, 768px, 1280px; light and dark; reduced motion; JS disabled.

Files: `tests/persona.spec.ts`, `tests/a11y.spec.ts`.
Accept: `npm run e2e`, `npm test`, `npm run lint`, `npm run typecheck` all green; zero serious or critical axe findings for each view.

### Phase 6 — Rollout · Effort: S
- [ ] Deploy to a preview; owner clicks through all four views on a phone and a laptop.
- [ ] Ship. Put `?for=recruiter` in job applications and LinkedIn, `?for=business` in client outreach.
- [ ] After two weeks, review incoming CV-request roles and messages; adjust copy.

Accept: production `/` with a fresh browser profile shows the picker once; view source of `/` (no JS) still contains the full default content; Search Console shows no new duplicate or canonical warnings.

## 9. Test plan (Playwright)

**Seeding rules that matter**

- `playwright.config.ts` seeds only `cookie-consent`. With no `persona` key the site is in the default view, so **existing tests need no change and the global config should stay as it is**.
- `test.use({ storageState })` replaces the whole state, so a persona block must seed **both** keys for origin `http://localhost:3100`: `cookie-consent=necessary` and `persona=<view>`.
- `smoke.spec.ts` seeds `sessionStorage gate=1` for every test whose title lacks the word "gate". Picker tests therefore need "gate" in the title (or their own file without that hook).

**New file `tests/persona.spec.ts`**

| # | Case | Steps and assertions |
|---|---|---|
| 1 | gate asks who you are on first visit | Fresh state. `/` → dialog "Enter portfolio" visible, heading "Who are you?", 3 persona buttons + "Just looking". |
| 2 | gate choice is applied and remembered | Click "I'm hiring" → dialog hidden, `html[data-persona="recruiter"]`, `localStorage.persona === "recruiter"`. Reload → attribute still set. |
| 3 | gate Esc keeps the default view | Esc → no `data-persona`, no `persona` key, hero sub-line is today's text. |
| 4 | gate is keyboard-only operable | Tab cycles inside the dialog; Enter on a card picks it; focus is not lost to the page behind. |
| 5 | share link presets the view and skips the gate | `/?for=business` fresh → no dialog, `data-persona="business"`, key saved. `/?for=<script>` → ignored, default view. |
| 6 | canonical ignores the share param | `/?for=recruiter` → `link[rel=canonical]` href has no query. |
| 7 | recruiter Home has no jargon | Seed recruiter. Visible text of `main` matches none of the banned words (same list as `content/check.ts`). Marquee, How I work, test report hidden. "Get my CV" visible in the hero. |
| 8 | business Home leads with outcomes | Seed business. Hero contains "30%". "Book a call" visible. `#proof` hidden. Services heading "What I can build for you". |
| 9 | dev Home keeps the technical view | Seed dev. Stack tags visible on cards; How I work shows both tabs; "148/156" appears. |
| 10 | default view is unchanged | No seed. Hero sub-line, "What I do", "Brief #07" all present (guards against regressions). |
| 11 | header switcher changes the view live | Select "Business view" → attribute changes, live region announces it, select keeps focus. Mobile (375px): same from the burger menu. |
| 12 | view survives client navigation | Seed recruiter. Home → About → Projects via nav links; attribute stays; project drawer shows no stack tags. |
| 13 | hidden-from-nav pages still load | Seed recruiter. `goto("/tech-stack")` → h2 "Tech stack" visible plus the plain intro line. |
| 14 | chat adapts | Seed recruiter. `/contact`, accept AI consent → chips are the recruiter set; the intercepted `/api/chat` request body has `view: "recruiter"`. API: `view: "nope"` → 400. |
| 15 | CV form preselects the role | Seed recruiter. Open "Get my CV" → role select value "Recruiter / HR". |
| 16 | no layout shift on load | Seed business. Read the hero sub-line's bounding box at `domcontentloaded` and after `load`: equal. |
| 17 | no-JS fallback | `javaScriptEnabled: false`. `/` → no dialog; default hero text and all eight home sections present in the DOM and visible. |
| 18 | reduced motion | `emulateMedia({ reducedMotion: "reduce" })`, seed each view → all persona content visible (opacity 1), no stuck reveals. |

**`tests/a11y.spec.ts`**

- Add a `view` loop (`all`, `dev`, `recruiter`, `business`) around the existing theme × path loop, seeding `localStorage.persona` in the existing `addInitScript`. To keep run time sane, run all views on `/`, `/about`, `/projects`, `/contact` and only `all` on the legal pages.
- Add `/tech-stack` and `/certifications` to the path list (they are missing today).
- One extra axe run with the picker open (fresh state, no `gate` seed), light and dark.

**`content/check.ts`** — the jargon lint and copy-completeness asserts from Phase 0 run in `npm test`, so bad copy fails before any browser starts.

## 10. Risks and open questions for the owner

| # | Question / risk | Recommended default |
|---|---|---|
| 1 | Three views or four? Technical hiring leads (engineering manager, CTO) sit between `dev` and `recruiter`. | Three. Send them to `dev`, which keeps the CV and Book buttons. Add a fourth only if needed. |
| 2 | Should the picker replace the intro overlay content or be a second step after it? | Replace it for first-time visitors (one screen, one click). Returning visitors see the current intro with a "change" link. |
| 3 | Should a share link (`?for=recruiter`) skip the intro overlay? | Yes. People arriving from a job application should land on content, with the soundtrack off. |
| 4 | "About 30% faster checkout" is the only hard number and it leads the business view. Is it defensible? | Keep it only with a one-line note on how it was measured; otherwise say "faster checkout" until there is data. |
| 5 | Recruiter view needs availability facts that are not in the repo (job type, remote, start date). | Until supplied, show only what exists: current role, location, reply time, languages. |
| 6 | The Proof test report is a sample, not a live result. Show it to non-technical visitors? | No. Hide it for `recruiter` and `business`; keep it, labelled as a sample, for `dev` and the default. |
| 7 | Hide content completely, or collapse it with "show more"? Hiding risks a recruiter missing something they wanted. | Hide, with the always-visible "Viewing as" switcher that includes "Everything". No per-section toggles. |
| 8 | Alternative copy lives in the page as hidden text. Small SEO and page-weight cost; also means recruiter copy is visible in "view source". | Accept. Keep variants to short strings, never whole duplicate pages. Revisit with static `/for/[persona]` pages only if search results ever show the wrong wording. |

## Owner TODO after implementation

Implemented with the plan defaults. The items below need the owner.

- [ ] Review and approve all drafted copy in `my-app/content/personas.ts` (hero, services, manifesto, About bio, plain experience points, skill glosses, chat greetings and chips, picker labels) and the `plain` fields on the 8 projects in `my-app/content/projects.ts`. Drafted only from facts already in `content/`.
- [ ] OmniPOS "about 30%": recruiter and business copy says "faster checkout" only. Supply how it was measured before using the number outside the dev/default view.
- [ ] Recruiter availability facts (job type, remote/on-site, start date, time-zone overlap). Not shown until supplied; only role, location, reply time and languages exist.
- [ ] Recruiter one-page summary block (three plain sentences) is not built; needs owner wording.
- [ ] Business "How a project runs": the How I work section is hidden for the business view; supply six plain steps if you want it back.
- [ ] Public repo URLs per project for a "Code" link in the dev view (none added).
- [ ] Confirm "3+ years building", skill levels in `content/stack.ts`, the HIPAA wording, and whether client names may be used in business copy.
- [ ] Any other outcome numbers (hours saved, users, delivery times): none were invented.
- [ ] Share links to use: `https://rhuzz.online/?for=recruiter`, `?for=business`, `?for=dev`.
- [ ] Manual checks not automated: screen reader pass on the picker and switcher, 768px width, JS disabled on a real device.
