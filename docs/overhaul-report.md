# Overhaul report

Brief: [`docs/plan.md`](./plan.md). Two branches, one commit per numbered item. Any item can be reverted on its own with `git revert <sha>`.

| Branch | Phases | Pull request |
| --- | --- | --- |
| `overhaul/foundation` | 0–3 | [akashjindal423/akashjindal-portfolio#1](https://github.com/akashjindal423/akashjindal-portfolio/pull/1) |
| `overhaul/interactive` (from foundation) | 4 + this report | opened alongside this report |

`npm run lint` and `npm run build` pass at the end of every phase. Before starting, `main` had 60 lint errors; the Phase 0 gate commit fixes them.

---

## What changed

### Phase 0 — Setup
| Item | Commit | Change |
| --- | --- | --- |
| 0.1 | `5105fbe` | Brief saved as `docs/plan.md`. |
| 0.2 | `5e9873b` | `CLAUDE.md` rewritten for Next.js 16, Tailwind 4, React 19 and content in `lib/content.ts` (no CMS). Duplicated sections and the patch-only / short-response rules removed. |
| 0.3 | `3c53887` | Package renamed to `akashjindal-portfolio`. New README. `next-sitemap`, `rehype-shiki` and `reading-time` removed (none were imported). The five create-next-app SVGs in `public/` deleted (none referenced). |
| 0.4 | `8e97f5c` | `next` and `eslint-config-next` upgraded 16.1.6 → **16.3.8**, then `npm audit fix` (31 → 8 advisories). |
| gate | `a8d2c73` | Fixed the 60 lint errors already on `main`: 57 unescaped quotes, unused imports, and 3 `setState`-in-effect cases (MobileNav, ThemeToggle, TypingHeadline). |

### Phase 1 — Correctness and SEO
| Item | Commit | Change |
| --- | --- | --- |
| 1.1 | `db35fed` | `akashjindal.dev` → `akashjindal.com` in layout, robots and sitemap. Added `lib/site.ts` (`SITE_URL`). |
| 1.2 | `cab834c` | Root title and description set exactly as briefed. Keywords no longer include Monzo, Barclays or London. |
| 1.3 prep | `14a9325` | **Deleted `/projects/[slug]`** (see decisions). |
| 1.3 | `1aa9681` | Every route has its own title, description and canonical URL via `lib/seo.ts`. Client pages get theirs from a server wrapper (`/projects`) or a layout (`/blog`, `/projects/promptlab`, `/toolkit`). Fixed doubled "\| Akash Jindal \| Akash Jindal" titles. |
| 1.4 | `a49ef4c` | Sitemap is built from the real routes: all static pages (incl. toolkit, training, recommendations), every project page, Lab pages (Phase 4), and only blog posts with a body. |
| 1.5 | `1ff6a57` | `next/og` images: a default plus one each for PromptLab, the Google Maps teardown and AI Health Companion (`lib/og.tsx` template). The `/og-image.png` reference is gone. Routes that set their own `openGraph` inherit the default image instead of losing it. |
| 1.6 | `eb9fde4` | JSON-LD: `Person` on the homepage and About, `Article` on the teardown, `BreadcrumbList` with visible breadcrumbs on all three project pages (and later the Lab pages). No FAQ schema. |
| 1.7 | `05d9f14` | `/blog/[slug]` pre-renders only posts with a non-empty `body` and sets `dynamicParams = false`. Today every slug returns 404 and the cards still link to LinkedIn. Removed the unused `content/blog` MDX lookup, `lib/mdx.ts` and `gray-matter`. |
| 1.8 | `2b555cb` | Footer GitHub link now points to github.com/akashjindal423 (it was `#`). Added Toolkit, Training and Recommendations to the footer (Lab added in Phase 4). New `app/not-found.tsx`. |
| 1.9 | `2c6bc67`, `5d42973` | Checked the built HTML: exactly one `h1` on every page. The only `<img>` (About portrait) gets descriptive alt text. Decorative SVGs are `aria-hidden`; lock icons and the toolkit search field get accessible names. |
| 1.10 | `d0c958c` | Opportunity Solution Tree → **Impact-Effort Matrix**, 1-Page Brief → **Feedback Synthesis**, Comms Plan → **AARRR Pirate Metrics**, each re-described from the PDF's actual content. Fake download counts deleted. |

### Phase 2 — Positioning and content
| Item | Commit | Change |
| --- | --- | --- |
| 2.1 | `1472acc` | Hero eyebrow "AI Product Owner". The typing headline is replaced with the fixed line "Generative AI and Gen BI in banking" (component deleted). Brief card: `title` "AI Product Owner", `open_to` "AI Product Manager roles", availability unchanged. |
| 2.1 follow-up | `49adbc8` | "Open to" copy on About, Contact and Footer aligned with the brief card. |
| 2.2 | `94881b0` | Stat tiles: 9+ years in tech, 6+ years as a Product Owner, 4 industries (banking, energy, gaming, consumer tech), 9 certifications (counted from `getTraining()`). Google Cloud and PSPO II tiles kept. Every other "8+ years" replaced. |
| 2.3 | `748900c` | Lloyds summary kept and the three Gen BI achievements added. The Lloyds project card matches. The Experience page now shows every achievement; before, it cut off at two and the third bullet would have been hidden. |
| 2.4 | `9636cad` | Homepage features Lloyds Gen BI, PromptLab and the Google Maps teardown, driven by `lib/content.ts`. AI Health Companion is off the homepage. |
| 2.5 | `301413d` | 48 emoji tiles → 17 lucide-icon tiles in AI and Data / Product and Strategy / Delivery. Blue group accent removed. |
| 2.6 | `e6055d5` | Toolkit copy describes the files as one-page worksheets and starting templates. "battle-tested" removed. |

### Phase 3 — Accessibility and polish
| Item | Commit | Change |
| --- | --- | --- |
| 3.1 | `0fe3f36`, `d1b8725` | New `text-subtle` token **#8A88B0** replaces every text use of #4F4D70 (contrast table below). Also found and fixed: `--text-secondary` was never defined, so the `text-text-secondary` class (111 uses) silently rendered in the primary colour. |
| 3.2 | `7957870` | `prefers-reduced-motion`: the cursor glow is hidden and never attaches its listener; the bouncing arrow and live dot stop; every framer-motion entrance skips movement via `MotionConfig reducedMotion="user"`; smooth scroll is off; the testimonial carousel stops auto-advancing (it also pauses on keyboard focus). |
| 3.3 | `d4af9ab` | Contact: the mailto form stays. Added the address as visible text with a copy button and a manual-copy fallback message. Form fields now have labels. |
| 3.4 | `179763b`, `15295af` | Checked all routes at 375/768/1440 (details below) and fixed the layout breaks. The site now also renders correctly with JavaScript disabled. |

**3.1 contrast (WCAG 2.x relative luminance):**

| Colour | on #0D0D1A | on #13132A | on #1A1A38 | Result |
| --- | --- | --- | --- | --- |
| #4F4D70 (old) | 2.41:1 | 2.28:1 | 2.10:1 | fails AA |
| #3D3B60 (old, also used for text) | 1.83:1 | 1.73:1 | 1.60:1 | fails AA |
| #6B69A0 (old, tag text) | 3.81:1 | 3.60:1 | 3.33:1 | fails AA |
| **#8A88B0 (new `text-subtle`)** | **5.72:1** | **5.40:1** | **4.99:1** | passes AA |
| #A09EC0 (`text-secondary`, now defined) | 7.48:1 | 7.06:1 | 6.52:1 | passes AA |

**3.4 method:** a Playwright script loaded all 17 routes (including 404 and the Lab pages) at 375, 768 and 1440px, with scroll-reveal triggered, and checked `scrollWidth` against the viewport. **Result: no horizontal overflow on any route at any width.** I also reviewed screenshots of home, about, contact, experience, toolkit, PromptLab and the Lab pages. Fixes:
- doubled section padding (~190px gap) on inner pages
- hero container misaligned with the rest of the site on wide screens
- nav too tight at 768px
- cramped About stats at 768px
- wasted timeline gutter on phones
- sticky sidebars hidden under the sticky navbar
- section header rows colliding
- the closed mobile drawer leaving its links in the tab order
- the hero and every scroll-reveal block invisible with JS disabled, and the navbar in light mode, because only a script added the `dark` class

### Phase 4 — Interactive (branch `overhaul/interactive`)
| Item | Commit | Change |
| --- | --- | --- |
| prep | `b91f41d` | `/lab` index, linked from the nav, footer and sitemap. It renders from `LAB_ITEMS` in `lib/lab/items.ts`. |
| 4.1 | `c297831` | **Gen BI demo** at `/lab/gen-bi`, also featured on the homepage ("From the Lab", pre-rendered, works without JS). Details below. |
| 4.2 | `703e8a8`, `9bf852f` | **Terminal card**: the hero `product_brief.md` accepts `help, about, projects, experience, skills, contact, why-hire, clear`. Details below. |
| 4.3 | `ff4b1f1` | **Backlog game** at `/lab/backlog-game`. Details below. |

**4.1 Gen BI demo.** Larkfield Home is a fictional homeware retailer with synthetic 2025 data (`lib/lab/genbi.ts`).
- **Six suggested questions:** regional revenue in Q4, monthly trend, top categories, return rates, online share, average order value.
- **Matching:** deterministic keyword rules. Distinctive terms score 3, supporting terms 1, and a match needs 3. Region and category names in the question act as filters.
- **Fallback:** unmatched or empty input gets a clear message and suggested questions.
- **Transparency:** "How this was answered" shows the matched terms and an illustrative SQL query.
- **Charts:** hand-rolled SVG, no new dependencies. One violet hue plus a highlight. Base #7461C9 and highlight #C4B5FD both clear 3:1 on the #13132A surface, and their colour-blind and normal-vision separation passed the palette validator. The highlighted mark is also directly labelled. Hover and keyboard tooltips, plus a data-table view.
- **Disclaimer:** the required note appears on both the demo page and the homepage feature: "Demo with synthetic data. Not connected to any employer's data or systems."

**4.2 Terminal card.**
- The brief is static markup, so it renders with JS off. The command line and quick-command buttons appear only after hydration.
- Keyboard: the input is a normal tab stop, ↑/↓ recall history, Esc clears the line.
- Output is a `role="log"` live region.
- All output is generated from `lib/content.ts` (`lib/terminal.ts`).

**4.3 Backlog game.**
- **Setup:** 60 seconds, eight items for Pantry (a fictional grocery-delivery app), 10 person-weeks of capacity.
- **Scoring:** expected impact is R×I×C, and the score is your plan's share of the optimum. The optimum is found exactly over all 256 subsets and is unique.
- **The lesson:** greedy-by-RICE scores 96% and leaves a week unused. Reach-first scores 82% and value-first 78%; each strategy gets its own explanation.
- **Also:** copy-my-score, a results table showing the numbers behind each item, and the timer announced to screen readers at 30, 10 and 5 seconds.

---

## Finish checks

**Search:** `grep -rnI "akashjindal\.dev\|Monzo\|Barclays" . --exclude-dir={node_modules,.next,.git}`

- **Matches outside `docs/`: none.**
- **Matches inside `docs/`:** five lines in `docs/plan.md` (the brief, saved verbatim as item 0.1 asks) and this report, which quotes the search terms.

If you want the search to return literally nothing, the only way is to paraphrase those lines in the plan. I didn't, because 0.1 asked for the brief as written.

**Remaining audit warnings** (`npm audit`, after `npm audit fix`):
- **Production dependencies** (`npm audit --omit=dev`): **0 vulnerabilities**.
- **All dependencies:** **8 high**, all one chain in dev tooling: `braces` (GHSA-vfj7-8cjw-p6xm, stack-exhaustion DoS from deeply nested patterns) → `micromatch` → `fast-glob`. Two packages pull it in:
  - `eslint-config-next` → `@next/eslint-plugin-next`. This affects linting only and needs an upstream release.
  - The `shadcn` CLI (devDependency) → `ts-morph`/`fast-glob`.
- `npm audit fix --force` would downgrade `shadcn` to 1.0.0 (breaking), so I didn't run it.
- **Suggestion:** the `shadcn` CLI is only needed when adding new UI primitives. Removing it from `devDependencies` would clear its half of the chain; reinstall it with `npx shadcn@latest` when needed.

---

## Skipped or partial, and why

- **Nothing in the brief was skipped.**
- **FAQ schema:** not added, as instructed.
- **3.4:** the automated overflow check covered every route at every width. I reviewed screenshots of the main and new pages, not every page at every width. Long-form pages (teardown, AI Health Companion) passed the overflow check but I didn't review them visually in full.
- **OG images** use the bundled default font rather than Fraunces/Inter. Embedding the brand fonts would mean committing font files or fetching them at build time. I left that for you to decide.
- **Factual London mentions are kept:** Sony and Toastmasters locations in the experience data, and "Bristol / London, open to hybrid" on About. The brief said to remove London from description and keywords, and those aren't either.

---

## Decisions for you to review

1. **Deleted `/projects/[slug]`** (`14a9325`). It rendered invented numbers ("↑ 41% efficiency gain", "+42 NPS", "0 compliance breaches", "20+ research participants") and generic boilerplate on `/projects/lloyds-gen-bi`, `/projects/dyson-cleantrace` and `/projects/sony-ps5`. Nothing linked to it, but the URLs were live and crawlable. Revert if you want those pages back, but they need real content.
2. **Other unbacked claims removed:**
   - "20+ products and features shipped" and "4 Agile certifications" stat tiles (2.2)
   - "⭐ Most Popular" toolkit badges (1.10)
   - unused `linkedinHook` strings, including "I interviewed at 4 companies and got offers at all of them" (1.10)
   - "Built at Lloyds, Dyson & Sony" on the toolkit, since the PDFs weren't built at those employers (2.6)
   - "The PRD I use for every feature I ship", softened to a description of the template (2.6)
3. **Brief card location** changed from "Bristol · London, UK" to "Bristol, UK" to match the site description (2.1).
4. **"Open to" copy** on About, Contact and Footer now says "AI Product Manager roles" (separate commit `49adbc8`, easy to revert).
5. **"Technical Product Owner" → "AI Product Owner"** in the footer, toolkit byline and teardown author box. I kept "Team Product Owner" where it reads as your actual title (hero tagline, About, brief `current:`). Confirm which title you want to lead with.
6. **Skills: 17 tiles, not 15.** I added Scrum and Backlog Management so Delivery isn't a single tile.
7. **Toolkit "Metrics Dashboard" renamed "North Star Metrics"** to match its PDF and avoid duplicating the new AARRR entry.
8. **Secondary text is now visibly greyer site-wide.** `--text-secondary` was undefined, so secondary copy had been rendering in the primary colour. It now shows the intended #A09EC0. Look at a few pages; if you preferred the brighter look, the design tokens should say so explicitly.
9. **Dark is forced on the server** (`class="dark"` on `<html>`) so the site renders correctly without JS. The theme toggle was already hidden. If you ever re-enable light mode, revisit `15295af`.
10. **"fintech" removed from the Experience subtitle**, since no employer in the data is a fintech.
11. **Article schema:** `datePublished` is `2026-03` (month precision, matching "Published · March 2026" on the page), and the publisher is you as a Person. Add an exact date if you have one.
12. **Lab content is fictional by design:**
    - Gen BI demo: "Larkfield Home", year 2025. The SQL shown is illustrative, not from any real system.
    - Backlog game: "Pantry", plus the scoring definition (expected impact R×I×C, the optimum maximises impact within capacity).
    - Check you're happy with the names and framing.
13. **Terminal `why-hire` copy** (`lib/terminal.ts`) is assembled only from site facts, but it is new phrasing ("Builds things too: PromptLab…"). Worth reading in your own voice.
14. **Homepage section order:** Hero → About → Featured projects → **From the Lab** → Experience → Recommendations → Skills → Certifications → Writing.
15. **Mobile nav** doesn't list Training or Recommendations. The footer and the new homepage section links cover them.
16. **Copy tweaks made while fixing layout:** the homepage certifications and recommendations sections gained "All certifications →" and "All recommendations →" links.
