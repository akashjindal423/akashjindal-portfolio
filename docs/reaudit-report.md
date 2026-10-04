# Re-audit report

Brief: [`docs/plan-2.md`](./plan-2.md). Branch `fix/reaudit`, one pull request into `main`. Every numbered item has its own commit, so any item can be reverted on its own with `git revert <sha>`.

After every section I ran `npm run lint`, `npm run build` and `npm test`, and fixed failures before moving on. All three pass on the final commit.

---

## Status

| Item | Status | Commit |
| --- | --- | --- |
| Brief saved | Done | `dbe021c` |
| 1.1 Terminal crash | Done | `acca570` |
| 1.2 Gen BI demo (a–g) | Done | `fc0c333` |
| 1.3 Teardown RICE scores | Done | `61378f6` |
| 1.4 PromptLab recorded example | Done | `8c3f520` |
| 2.1 Sony and SSE via Infosys | Done | `2772b11` |
| 2.2 AI Health Companion concept study | Done | `72cc851` |
| 2.3 PromptLab claims | Done | `0f22f65` |
| 2.4 Backlog game modelled score | Done | `88c34a4` |
| 3.1 Shorter hero, PromptLab preview | Done | `db0818b` |
| 3.2 Terminal moved to /lab | Done | `61dfef7` |
| 3.3 Homepage order | Done | `3b5a5ae` |
| 3.4 Main navigation | Done | `36c65ee` |
| 4.1 Neutral greys | Done | `e837cda` |
| 4.2 Violet as the single accent | Done | `46a32f2`, follow-up `06316ed` |
| 4.3 Amber second accent | Done | `acee0f7`, follow-up `06316ed` |
| 4.4 Colour-blind-safe charts | Done | `0ea45a4` |
| 4.5 Contrast and screenshots | Done | `60a18bb` |
| 5.1 Skip link, unique ids | Done | `fdd5e24` |
| 5.2 Mobile menu focus, aria-current | Done | `eb1d4e9` |
| 5.3 aria-pressed, visible labels | Done | `6898b4f` |
| 5.4 Testimonials pause / reduced motion | Done by removal (see below) | `3b5a5ae` removed the carousel; `83f3ce7` records the rule |
| 5.5 Terminal focus style, Run button | Done | `0111dfe` |
| 5.6 Chart keyboard, Escape, table view | Done | `a487d19` |
| 5.7 Game practice mode, focus | Done | `12cbb46` |
| 5.8 ProfilePage structured data | Done | `8d44e1d` |
| Finish: route check fixes | Done | `3e88164`, `8685904` |

Nothing in the brief was skipped. **5.4 needs your decision** (see Decisions, item 1).

---

## What changed, by item

### 1. Correctness

**1.1 Terminal.**
- **Root cause:** aliases were a plain object, so `ALIASES['constructor']` returned `Object`'s constructor. `run()` then returned `undefined`, and rendering `undefined.map` crashed the page.
- **Fix:**
  - Aliases are now a `Map`, and commands are a `Set`.
  - `execute()` always returns `empty | clear | output`, and catches internal errors.
  - The terminal renders inside its own error boundary, with a restart button.
- **Tests:** 16 (`lib/terminal.test.ts`). They cover blank input, every valid command, unknown input, mixed case, `constructor`, `__proto__`, `toString`, `hasOwnProperty`, `valueOf` and other inherited keys. Six of them fail against the old code.

**1.2 Gen BI demo.**
- **a) One fact table.** `lib/lab/genbi.ts` builds one seeded table: 12 months × 4 regions × 5 categories = 240 rows. Each row holds revenue, online revenue, orders, units and returned units. Every view is aggregated from it, so totals reconcile:
  - 2025 revenue is **£8,951,667** by region, category, month, quarter and channel alike.
  - Ratio metrics (AOV, return rate, online share) are computed from summed parts, never by averaging ratios.
- **b) Explicit query.** `parseQuestion()` returns:

  ```text
  { metric, period {from, to, label, defaulted, yearAssumed},
    groupBy, filters {regions, categories, channel},
    sort, rank, limit }
  ```

  Every part is validated.
- **c) Clarifications.** Anything unsupported or ambiguous returns a clarification plus a "What this demo can answer" list. The engine never answers a different question. Cases covered:
  - other years
  - profit and other missing measures
  - exclusions and negation
  - relative dates ("last quarter", "this year")
  - two periods, two measures or two breakdowns
  - unknown regions or categories
  - growth rates, forecasts, "why" questions, thresholds
  - week/day granularity
  - "best/worst" for return rate
  - "top 10" when only 4 regions exist
- **d) Interpreted scope.** Every answer shows metric (with its formula), date range, grouping, filters and sort, plus the equivalent SQL.
- **e) Starts empty.** The demo shows the six suggested questions as buttons and no answer.
- **f) Tests.** 70 in `lib/lab/genbi.test.ts`, including all four required cases:
  - "Which region had the lowest revenue in Q1 2025?" is checked against a direct sum of the fact table.
  - Three 2024 questions, three profit questions and three "excluding December" variants all return clarifications.
- **g) Page copy.** The page says it is "a rule-based prototype … over fictional 2025 data. There is no AI model", and that unsupported or ambiguous questions get a clarification.

**1.3 RICE.**
- `lib/teardown/rice.ts` holds the inputs. The three tables and the summary are computed from them:
  - A = (8×9×0.6)÷7 = **6.17**
  - B = (9×7×0.7)÷8 = **5.51**
  - C = (6×9×0.8)÷5 = **8.64**
- The summary is ordered by score (C, A, B), and its lead sentence names C as first because of its scores.
- The scoring is labelled illustrative, with the formula and "inputs are my own estimates, not Google data".
- Tests: 4.

**1.4 PromptLab.**
- "Live Demo" is now "Recorded example".
- Counts and the overall score are derived from the 12 rows (`lib/projects/promptlab-example.ts`). This fixed two errors:
  - The table had **6** Critical rows, not 5.
  - The scores average **1.75**, not 2.1.
- The page states the formula: unweighted mean, plus the score band behind each status.
- Tests: 3.

### 2. Claims
Listed in full under "Claims removed or softened" below.

### 3. Homepage and navigation

**3.1 Hero.**
- No longer full-screen: about 630px tall at 1440px.
- A static PromptLab preview sits beside the name, built from the same data as the PromptLab page, with links to the write-up and the source.

**3.2 Terminal.** Now a section on /lab, explaining the keyboard controls.

**3.3 Homepage order.**
- Order: hero → Work → Experience → About (with one recommendation) → Writing → Contact (new).
- Work shows PromptLab, the teardown and the Gen BI demo (linked, with no pre-loaded answer). The Lloyds card follows as context, marked confidential and not linked.
- Removed from the homepage: Skills, Training, the Lab chart preview, the About stat tiles and the auto-rotating testimonial carousel. Their pages remain.

**3.4 Navigation.**
- Main navigation is Projects, Lab, Toolkit and About, plus a Contact button (`lib/nav.ts`).
- Experience, Skills, Blog, Training and Recommendations are linked from a "More about me" section on /about and a footer column.
- Checked at 768, 820, 860, 900 and 1024px: the bar stays on one row with at least 24px between items.

### 4. Palette

**4.1 Neutral greys.**
- Tokens: background #0E0F12, surface #16181D, raised #1D2026, border #2A2E37, strong border #3E4350.
- Hard-coded indigo values are replaced across components, project pages, charts and the OG card.

**4.2 Violet.**
- Violet is used only for primary buttons (hover darkens to violet-700), links, focus rings and the AJ logo.
- Removed:
  - the hero gradient
  - the cursor glow (component deleted)
  - the terminal glow
  - card hover glows
  - gradient CTA panels and wireframe frames
  - tinted cards, chips, table headers, timeline dots and project-card tints (the colour fields are gone from the data)

**4.3 Amber.**
- The `highlight` token (#F5B544) is used for:
  - all eyebrow labels (81 class strings)
  - the hero positioning line
  - stat numbers, skill group titles and persona names
  - the MoSCoW "Must" heading and quote rules
  - selected and pressed states, with dark text on amber fills
  - the top RICE row
- CLAUDE.md's design-system section is updated to match.

**4.4 Charts.**
- `CHART_PALETTE` holds the colour-blind-safe categorical palette (dark steps, fixed order).
- Single-series data uses slot 1 (#3987e5). The point the answer is about uses slot 4 (#c98500), plus a direct value label and a key, so hue is never the only cue.
- Validated with the palette checker against all three surfaces:
  - lightness, chroma and 3:1 contrast pass
  - worst CVD ΔE is 27.4 (protanopia); normal-vision ΔE is 30.7
- The teardown's neighbourhood score bars are one series, so they now share one hue.

**4.5 Screenshots** are in [`docs/screenshots`](./screenshots):
- `before-*`: `main` at `7f810e4`
- `after-*`: this branch
- Coverage: the homepage and /lab/gen-bi at 1440 and 375px, plus `after-gen-bi-answer-1440.jpg`.

Contrast results are below.

### 5. Accessibility and SEO

**5.1 Skip link.**
- "Skip to main content" is the first focusable element on every route and moves focus to the content.
- The homepage's duplicate ids (projects, experience, testimonials, skills, training, blog), caused by wrapping sections that already had those ids, were removed in 3.3.
- Verified: no duplicate ids and exactly one `h1` on all 17 routes.

**5.2 Mobile menu.**
- Opening moves focus to the first link.
- Tab and Shift+Tab stay within the menu and its toggle.
- Escape, the toggle or the overlay closes the menu and returns focus to the toggle.
- `aria-current="page"` is on the active link in both menus.
- Tested at 375px with and without reduced motion.

**5.3 Filters and labels.**
- Blog, toolkit and project filters have `aria-pressed` inside labelled groups, and announce the result count.
- The contact form (and the Gen BI box) have visible labels that stay after typing.

**5.4 Testimonials.**
- The carousel was removed in 3.3. Testimonials are now static: one on the homepage, four on /recommendations. Nothing on the site auto-advances.
- CLAUDE.md now requires a persistent Pause control, and no autoplay under reduced motion, for any future carousel.

**5.5 Terminal.**
- The prompt shows a violet border and ring on focus. Previously it had `outline: none` and nothing replacing it.
- Run is a visible button.

**5.6 Charts.**
- Bars are tab stops that announce their value. Line charts use arrows plus Home/End.
- Escape hides tooltips from focus or hover (WCAG 1.4.13).
- A Chart / Table switch gives a full table view, and remembers the choice across answers.

**5.7 Game.**
- "Practise without a timer" mode (WCAG 2.2.1).
- Focus moves to a board heading on start, and to "Your result" on finish (submit or time-out; tested with a fake clock).

**5.8 ProfilePage.**
- /about emits a `ProfilePage` whose `mainEntity` is the same `Person` (`@id` `https://akashjindal.com/#person`) as the homepage. It replaces the standalone Person block /about had.
- Tests: 2.

### Finish

**Route check.**
- 17 routes × 375 / 768 / 820 / 1440px, 68 combinations in total.
- None has horizontal overflow, more or fewer than one `h1`, a duplicate id or a console error.
- **Visual review fix (`3e88164`):** three- and four-column grids that switched on at 768px (AI Health Companion, PromptLab, teardown, projects, recommendations, latest posts) squeezed cards to about 170–230px. They now add columns at 1024px.

**Full axe-core run.**
- Rule sets: WCAG 2.0, 2.1 and 2.2 A/AA plus best practice.
- Coverage: 22 targets (17 routes plus 5 interaction states) × 2 widths.
- **Found and fixed (`8685904`):**
  - a missing `<main>` on /toolkit
  - skipped heading levels on five pages
  - sideways-scrolling tables that the keyboard could not reach
- **Final result: 0 violations.**

---

## Claims removed or softened

### Gen BI (1.2)
- **Removed** "Keyword rules map each question to one of six metrics" and "Questions outside the model get a clear 'can't answer that yet'". Replaced with an accurate description of the parser and clarifications.
- **Removed** "Real Gen BI tools handle this with a clarifying question rather than a guess".
- **Removed** the homepage line "It is the experience I work on with Gen BI, rebuilt as a small browser demo" (the section itself was removed in 3.3).
- **Changed** the synthetic-data note to: "Rule-based prototype over fictional 2025 data, with no AI model. Not connected to any employer's data or systems."

### Teardown (1.3)
- **Corrected** the RICE scores: A 9.3 → 6.17, B 7.9 → 5.51, C 8.6 → 8.64.
- **Labelled** the scoring "illustrative", with "my own estimates, not Google data".
- **Removed** "with no competition" from C's impact reasoning. It contradicted C's own confidence row, which cites Zillow and Rightmove.
- **Removed** "unique positioning" from C's rationale.
- **Updated** the source file `extra-files/Google_Maps_Product_Teardown_by_Akash_Jindal.md` to match.

### PromptLab recorded example (1.4)
- **Renamed** "Live Demo" to "Recorded example".
- **Replaced** "Real output from `promptlab analyse`" with "A recorded example … shown as static text".
- **Corrected** "5 critical issues" to 6, and "2.1 / 5.0" to 1.75, both now derived from the rows.

### Sony and SSE (2.1)
Everywhere: "via Infosys". Specific rewrites:
- **Project card:** "PlayStation 5 Platform Launch" → "ITSM and ServiceNow for the PS5 launch".
- **Removed** "Orchestrated planning of launch-critical platform features ensuring reliability and readiness for global release".
- **Removed** the tags "Platform" and "Launch".
- **Experience summary:** "Contributed to the successful PlayStation 5 launch by leading service delivery and tech product initiatives…" → "Product Owner for ITSM and ServiceNow enhancements in the run-up to the PlayStation 5 launch, placed by Infosys."
- **Achievement:** "Orchestrated planning and execution of key platform features aligned with PS5 launch timeline" → "Planned ITSM and ServiceNow work to the PS5 launch timeline".
- **Hero:** "PS5 at Sony" → "ITSM for the PS5 launch at Sony via Infosys".
- **About:** "contributed to the PlayStation 5 platform launch at Sony Interactive Entertainment" → "at Sony Interactive Entertainment (via Infosys) I was Product Owner for ITSM and ServiceNow enhancements in the run-up to the PlayStation 5 launch".
- **Same change in:**
  - the About snippet, the teardown author bio, the toolkit byline and the terminal (`about`, `experience`, `projects`, `why-hire`)
  - the About, Experience and Projects metadata
  - the site description and the default OG image

### AI Health Companion (2.2)
- **Labelled** a "Concept study" (pills, card, metadata, OG). A banner says nothing has been built, no users were interviewed or tested, and personas are hypothetical.
- **Removed** "90% of health apps use the same templates…". It now reads "Health apps often use the same templates…", inside a section labelled "Working assumptions … not research findings".
- **Removed** "tackles #1 abandonment reason" and "Primary retention driver". It is now an expected driver *if* the assumption holds.
- **Changed** "tested through low-fidelity concept validation" to "low-fidelity tests proposed … (not yet run)".
- **Changed** "Hypothetical user interviews mapped to 3 persona archetypes" to "Hypothetical interview themes (no real interviews) mapped to 3 invented persona archetypes".
- **Renamed** "Representative users" to "Hypothetical personas", with "not real people or research participants".
- **Reframed as proposals:**
  - "What ships first" → "Proposed first release"
  - "How success is measured" → "would be measured"
  - "Phased delivery plan" → "Illustrative phased plan"
  - "What I learned building this" → "… from this concept study"
  - "This product does not provide…" → "would not provide…"
- **Softened** "Culturally aware personalisation is a rarely explored space… I believe there is a real underserved market here" to a hypothesis that discovery would need to test.
- **Softened** the feature table's product-value column (activation, completion, retention, moat) to expected or intended outcomes, under the header "Expected product value (assumption)".
- **Apple Health** is now the same everywhere (see Decisions).

### PromptLab claims (2.3)
- **Removed** "auto-tests all variants to prove which one wins", "find the winner" and "recommends the winner". Step 3 is now "Compare", not "Test & Win", and the copy says generated test cases are not proof of real-world quality.
- **Removed** the undated competitor table (DSPy, Promptfoo, Braintrust, Chrome extensions) and its "unique" marker.
- **Removed** "PromptLab fills a specific gap — no other tool explains why a prompt is weak and proves the fix".
- **Removed** the "Without PromptLab" claims about other tools' shortcomings.
- **Removed** the unsourced "Most prompts score under 2.5 on the first pass".
- **Replaced** the **`pip install promptlab`** copy button with a link to install instructions on GitHub. On PyPI, the name `promptlab` (v0.1.11) belongs to a different project, imum-ai/promptlab, so visitors would have installed someone else's package.

### Backlog game (2.4)
- **Changed** "N% of the optimal value delivered" to "N% modelled score", with a note: "a model on fictional data, not a measure of value delivered".
- **Changed** the copied score from "I delivered N% of the optimal value" to "I scored N% of the best possible plan … (a model on fictional data)".
- **Changed** "deliver more in total" to "score higher in total", and "Impact pts" to "Modelled impact".

### Homepage (3.1)
- **Removed** the hero tagline "Building products that matter across banking, tech, and innovation."

---

## Contrast ratios

WCAG 2.x relative-luminance ratios for the new tokens:

| Text colour | on background #0E0F12 | on surface #16181D | on raised #1D2026 |
| --- | --- | --- | --- |
| text-primary #F3F4F6 | 17.41 | 16.14 | 14.83 |
| text-secondary #B4BAC4 | 9.82 | 9.10 | 8.36 |
| text-muted #A6ADB8 | 8.48 | 7.86 | 7.22 |
| text-subtle #8D939E | 6.21 | 5.75 | 5.28 |
| highlight (amber) #F5B544 | 10.56 | 9.79 | 9.00 |
| link violet-400 #A78BFA | 7.04 | 6.53 | 6.00 |
| link hover violet-300 #C4B5FD | 10.38 | 9.62 | 8.84 |
| emerald-400 #34D399 (status) | 9.97 | 9.24 | 8.49 |
| red-400 #F87171 (status) | 6.93 | 6.42 | 5.90 |

Buttons and fills:

| Pair | Ratio |
| --- | --- |
| White on violet-600 #7C3AED (primary button, logo) | 5.70 |
| White on violet-700 #6D28D9 (button hover) | 7.10 |
| White on violet-500 (old button hover, **failed**) | 4.23 |
| #0E0F12 on amber #F5B544 (selected filters, pressed states) | 10.56 |

Chart marks (non-text, 3:1 needed) on #16181D: #3987e5 **4.88**, #c98500 **5.78**.

**Measured on the rendered site.** A Playwright script read every visible text element and computed its colour against the background:
- Inputs: computed colours (oklch, oklab, lab and rgb all converted), with translucent backgrounds and opacity blended.
- Coverage: 17 routes plus 8 interaction states (Gen BI answer, trend and clarification; game playing and results; terminal output; filtered toolkit and blog), at 1440 and 375px.
- **Result:** 5,986 text elements, **none below 4.5:1** (3:1 for large text).
- The lowest is **5.26:1**: subtle 10px labels on an amber-tinted selected game card.

axe-core's colour-contrast rule agrees, with 0 violations. I ran the audits with the body's 3%-opacity noise texture switched off, because axe can't compute contrast through a background image.

For comparison, the old secondary text was #A09EC0, at 7.48 on #0D0D1A and 7.06 on #13132A. The new greys keep similar or better margins without the purple tint.

---

## Test results

`npm test` (vitest 4.1.11): **95 tests in 5 files, all passing.**

| File | Tests | Covers |
| --- | --- | --- |
| `lib/lab/genbi.test.ts` | 70 | fact table shape and reconciliation, the four required cases, query parsing (fields, periods, assumed year, "May I…"), 22 clarification cases, scope on every answer, ratio metrics, determinism, top-N |
| `lib/terminal.test.ts` | 16 | blank, valid, unknown, mixed case, aliases, inherited keys (`constructor`, `__proto__`, `toString`, `hasOwnProperty`, `valueOf` and more) |
| `lib/teardown/rice.test.ts` | 4 | A/B/C scores, formulas, ranking |
| `lib/projects/promptlab-example.test.ts` | 3 | status mapping, counts, mean |
| `lib/structured-data.test.ts` | 2 | Person, and ProfilePage referencing the same @id |

`npm run lint` passes clean, and `npm run build` generates all 25 static pages.

`npm audit --omit=dev`: **0 vulnerabilities.** The full audit still shows the same 8 high-severity dev-only issues as before: the `braces` → `micromatch` → `fast-glob` chain through `eslint-config-next` and the `shadcn` CLI. vitest added none.

---

## Decisions to review

1. **5.4: the testimonial carousel is gone, not fixed.** 3.3 asked for "one testimonial" on the homepage. With the carousel removed, nothing on the site autoplays, so there was nothing left to pause.
   - **Homepage choice:** I picked the first featured recommendation (Dee Bolt), quoted in full.
   - **If you want a rotating carousel back,** it needs a visible Pause button and no autoplay under reduced motion. CLAUDE.md now says so.
2. **Gen BI defaults:**
   - A question with no period uses all of 2025, and the scope says "(no period given, so all of the data)".
   - A month or quarter with no year assumes 2025, and the scope says so.
   - "Last quarter" and other relative dates now get a clarification. The old first suggestion ("…last quarter?") became "…in Q4 2025?".
3. **Gen BI data is regenerated.** The new table is seeded and deterministic, but its figures differ from the old hard-coded ones. For example, South led Q4 with £968k (was £951k), and 2025 revenue is £8.95m.
4. **Gen BI strictness:**
   - Anything mentioning customers, units, prices, targets and similar is treated as an unsupported measure.
   - "Will" (except "will you") is treated as a forecast.
   - These err towards clarifying. Loosen them in `lib/lab/genbi.ts` if they feel too strict.
5. **Apple Health scope:** an **optional, read-only connection for activity and sleep only**. No heart rate or other biometrics, and the app works fully without it.
   - It stays in the Must list and the proposed first release as an optional connection.
   - "Full wearable biometric analysis" and "heart rate and other biometric data" are out of scope.
   - Phase 4 is "Wearables beyond Apple Health".
   - I chose this because the risk table already said "optional, not core", which conflicted with "Must" and with reading heart rate.
6. **PromptLab install.** Please add the correct install command, or a PyPI link if you publish under a different name; the page links to the GitHub README until then. I kept "works offline" from your original copy, but check it is true for every provider.
7. **New copy written in your voice** (please read):
   - hero: "I also build small public tools, like PromptLab."
   - Work heading: "Things you can open and check"
   - Lloyds card: "Internal work, so there is no public artefact to link to."
   - Contact section: "Email or LinkedIn is the quickest way to reach me."
   - About: "Through Infosys I then worked as a Product Owner at Sony Interactive Entertainment and SSE."
   - PromptLab: "Three problems I kept hitting" (your original competitor claims recast as your own experience)
   - the AI Health Companion banner
   - the /lab terminal intro
8. **Navigation:** Experience, Skills, Blog, Training and Recommendations are now only reachable from /about, the footer and in-page links.
9. **Palette choices beyond the brief:**
   - Amber is also used for selected and pressed states and the top RICE row, not only eyebrows.
   - The Gen BI chart's highlight uses #c98500, a darker step of the same amber family, because #F5B544 is too light for the chart lightness band.
   - Toolkit category chips lost their per-category colours and are neutral now.
   - MoSCoW columns are amber / neutral / grey.
   - Semantic status colours (red Critical, emerald Good or Current) are kept.
10. **Primary button hover** darkens to violet-700 instead of lightening to violet-500, which failed contrast with white.
11. **ProfilePage** replaces, rather than adds to, the Person block on /about. I couldn't re-read Google's ProfilePage documentation from this environment (network policy blocked developers.google.com and schema.org). It is built to the required `mainEntity` with `name`. **Please run the Rich Results Test after deploying.**
12. **Homepage About** no longer shows the six stat tiles; they remain on /about.
13. **vitest install:** npm 10.9's installer crashed with an internal error during peer resolution, so I wrote the lockfile with npm 11. I confirmed `npm ci` works with npm 10, the version that ships with Node 22.

---

## Noticed but not changed (outside the brief)

1. **Training: "CSPO — Expected Q3 2026" is now past** (today is 4 October 2026). Update or remove it.
2. **Infosys dates:**
   - Infosys runs Dec 2016 – Apr 2020, but Sony (Apr 2020 – Apr 2021) and SSE (Apr 2021 – Aug 2022) are now shown as via Infosys.
   - Consider whether the Infosys entry should run to Aug 2022.
   - Also check that "9+ years in tech" and "6+ years as a Product Owner" still add up the way you want.
3. **AI Health Companion:** "Desk research into cultural health disparities and health app dropout rates" claims research was done but cites nothing. Add sources or soften it.
4. **Teardown market figures** (2B MAU, 67–70% share, $11B revenue, 5M apps, 30M Local Guides and others) carry a source column, but I didn't re-verify them: they are outside the brief, and the network policy blocks most of the web here.
5. **Emoji used as icons** remain on the PromptLab dimension and step cards and in the teardown wireframes, against CLAUDE.md's "no emoji as UI icons". I replaced the one on the "Star on GitHub" button.
6. **Unused component:** `components/projects/ProjectFilters.tsx` is not used anywhere (it did get `aria-pressed`). Delete it if you don't plan to use it.
7. **OG images** still use the default font, as before.

---

## How I checked

- **Gen BI engine:** I first ran 36 exploratory questions to see what the parser did, then fixed the issues they exposed (seasonality, grammar, phrasing) before writing the test suite.
- **Terminal, menu, game and charts:** Playwright drove each in Chromium, by keyboard and by mouse.
- **Screenshots:** full-page captures had the sticky header pinned to the top so it wouldn't land mid-page.
- **"Before" baseline:** built from `origin/main` in a separate worktree.
- **Audit scripts:** the contrast walk, axe runs and route check live in my scratch space, not the repo. They need Playwright and axe-core, which are not project dependencies. Ask if you want them added under `scripts/`.
