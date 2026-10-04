# Re-audit fix plan

You are fixing my portfolio site (Next.js 16, Tailwind 4, TypeScript, live at
https://akashjindal.com) after an external re-audit. Work on ONE branch,
fix/reaudit, and open ONE pull request into main. Do not merge it and never
push to main. Make one commit per numbered item.

## HARD RULES
- Do not invent facts, employers, metrics, research, quotes or testimonials.
  If a claim cannot be supported from the repo, remove or soften it and list
  it in the final report for me to review.
- Add no new demos, pages, AI model calls, API keys or paid services.
- You may add vitest as a dev dependency for tests.
- Run lint, build and tests after each section; fix failures before moving on.
- Save this brief as docs/plan-2.md first.

## 1. CORRECTNESS
1.1 Terminal crash. In lib/terminal.ts the alias lookup uses a plain object,
    so inputs like "constructor" resolve to built-ins and crash the page.
    Use a Map or Object.hasOwn, and make execute() always return a defined
    result. Wrap the terminal in its own error boundary. Add tests for:
    blank, valid, unknown, mixed case, constructor, __proto__, toString,
    hasOwnProperty.
1.2 Gen BI demo (lib/lab/genbi.ts, components/lab/GenBiDemo.tsx).
    a) Build one synthetic fact table (month x region x category) and derive
       every view from it, so yearly totals reconcile across all dimensions.
       Today regions total 8,953k and categories 8,197k.
    b) Parse each question into an explicit query: metric, period, grouping,
       filters, sort direction. Validate every part.
    c) If any part is unsupported or ambiguous (other years, profit,
       exclusions, negation), return a clarification that says what the demo
       can answer. Never substitute a different question.
    d) Show the interpreted scope with every answer: metric, date range,
       grouping, filters.
    e) Start empty with the suggested questions as buttons. Do not pre-load
       an answer.
    f) Tests must include "Which region had the lowest revenue in Q1 2025?",
       a 2024 question, a profit question and "excluding December".
    g) Page copy: say plainly that this is a rule-based prototype over
       fictional 2025 data with no AI model, and that unsupported questions
       get a clarification.
1.3 Google Maps teardown RICE scores. Compute them from shared inputs, not
    hard-coded values: A = (8x9x0.6)/7 = 6.17, B = (9x7x0.7)/8 = 5.51,
    C = 8.64. The ranking changes, so update the table, the summary and any
    sentence that names the top priority. Call the scoring illustrative.
1.4 PromptLab page. Relabel "Live Demo" as "Recorded example". Derive the
    count of Critical rows and the overall score from the row data, and
    state the formula used.

## 2. CLAIMS
2.1 Show Sony and SSE as "via Infosys" everywhere they appear (experience,
    hero, About, projects, terminal). Describe the PS5 work as the ITSM and
    ServiceNow contribution it was, not platform ownership.
2.2 AI Health Companion. Label it a concept study. State that personas and
    interviews are hypothetical. Remove wording that implies completed
    validation, remove the unsourced 90% figure, and make the Apple Health
    scope consistent across sections. Flag your choices in the report.
2.3 PromptLab. Remove "prove which one wins", uniqueness claims and the
    undated competitor comparison. Describe it as comparing outputs on
    generated test cases: a starting point for review, not proof of
    real-world quality.
2.4 Backlog game. Describe the result as a modelled score on fictional
    data, not value delivered.

## 3. HOMEPAGE AND NAVIGATION
3.1 Shorten the hero so it is not full-screen. Put a preview of a public
    artefact (PromptLab) beside the name in place of the terminal.
3.2 Move the terminal to the /lab page.
3.3 Homepage order: hero, Work (PromptLab, Google Maps teardown, Gen BI
    demo, then the Lloyds card as context), Experience, short About with
    one testimonial, Writing, Contact. Remove the full Skills and Training
    sections from the homepage; keep their pages.
3.4 Main navigation: Projects, Lab, Toolkit, About, plus Contact. Link
    Experience, Skills, Blog, Training and Recommendations from About and
    the footer. Check the nav does not crowd between 768px and 900px.

## 4. PALETTE
The site reads as purple throughout. Change the tokens in app/globals.css
and replace hard-coded violet and indigo values across components and
project pages.
4.1 Backgrounds and surfaces: near-neutral dark greys with no purple tint
    (starting point: #0E0F12 background, #16181D surface, #2A2E37 border).
4.2 Violet stays as the single brand accent: primary button, links, focus
    ring and logo only. Remove violet glows, gradients and tinted cards.
4.3 Add one warm second accent (starting point: amber #F5B544) for eyebrow
    labels and highlights.
4.4 Charts: a colour-blind-safe categorical palette, so series differ by
    hue, not by two shades of one colour.
4.5 All text must reach 4.5:1 contrast. Report the ratios. Save before and
    after screenshots of the homepage and /lab/gen-bi in docs/screenshots.

## 5. ACCESSIBILITY AND SEO
5.1 Skip link as the first focusable element; unique section IDs.
5.2 Mobile menu: focus moves in on open, stays inside, Escape closes, focus
    returns to the button. aria-current on the active nav link.
5.3 aria-pressed on filter buttons. Contact form labels stay visible after
    typing.
5.4 Testimonials: a persistent Pause control, and no autoplay when reduced
    motion is set.
5.5 Terminal: visible focus style and a Run button.
5.6 Charts: values reachable by keyboard, Escape dismisses tooltips, and a
    table view as fallback.
5.7 Game: an untimed practice mode, and correct focus at start and finish.
5.8 Add ProfilePage structured data on About, referencing the Person.

## FINISH
Check every route at 375, 768, 820 and 1440px. Then write
docs/reaudit-report.md with: each item above and its status, every claim you
removed or softened, the contrast ratios, test results, and decisions I
should review.
