# Portfolio overhaul plan

You are overhauling my portfolio site (Next.js 16 App Router, Tailwind 4,
TypeScript, deployed on Vercel at https://akashjindal.com). Work through the
phases in order. Never push to main. Use two branches and open a pull request
for each:
  - overhaul/foundation  (Phases 0-3)
  - overhaul/interactive (Phase 4, branched from overhaul/foundation)
Make one commit per numbered item so any item can be reverted alone.

## HARD RULES
- Do not invent facts, employers, metrics, quotes or testimonials. Use only
  facts already in lib/content.ts and in this brief.
- Keep the existing visual identity: dark indigo background, violet accent,
  Fraunces for the hero name, Inter elsewhere, JetBrains Mono for code.
- Add no paid services, API keys or analytics.
- After each phase run `npm run lint` and `npm run build`; fix failures
  before moving on.

## PHASE 0 - SETUP
0.1 Save this brief as docs/plan.md.
0.2 Rewrite CLAUDE.md to match the real stack (Next.js 16, Tailwind 4, no
    CMS, content in lib/content.ts). Remove the "patch edits only" and
    "short responses" rules.
0.3 Rename the package from next-scaffold-tmp to akashjindal-portfolio,
    replace the default README, remove unused dependencies (next-sitemap,
    rehype-shiki, reading-time) and unused template SVGs in public/.
0.4 Upgrade next and eslint-config-next to the latest 16.x (16.3.8 or
    later) and run `npm audit fix`. Report anything left.

## PHASE 1 - CORRECTNESS AND SEO
1.1 In app/layout.tsx, app/robots.ts and app/sitemap.ts replace every
    akashjindal.dev with akashjindal.com.
1.2 Root metadata. Title: "Akash Jindal — AI Product Owner | GenAI and
    Gen BI". Description: "AI Product Owner at Lloyds Banking Group's AI
    Centre of Excellence, building Generative AI and Gen BI products.
    Previously Dyson and Sony PlayStation. Bristol, UK." Remove Monzo,
    Barclays and London from description and keywords everywhere.
1.3 Give every route its own title, description and canonical URL. Pages
    that are client components need a server wrapper or layout for this.
1.4 Build the sitemap from the real routes, including toolkit, every
    project page, training and recommendations.
1.5 Add Open Graph images with next/og: a default plus one per project
    page. Remove the reference to the missing /og-image.png.
1.6 Add JSON-LD: Person on the homepage and About, Article on the Google
    Maps teardown, BreadcrumbList on project pages with visible
    breadcrumbs. Do not add FAQ schema.
1.7 Blog: only generate /blog/[slug] pages for posts that have real body
    content; today none do, so the cards should keep linking to LinkedIn
    and the empty pages should 404.
1.8 Footer: GitHub link to https://github.com/akashjindal423, add Toolkit.
    Make sure Training and Recommendations are reachable by a link. Add a
    custom not-found page.
1.9 Check one h1 per page and meaningful alt text on every image.
1.10 Toolkit: three entries download the wrong PDF (Opportunity Solution
    Tree, 1-Page Brief, Comms Plan). Rename and re-describe those entries
    to match the PDFs they serve (Impact-Effort Matrix, Feedback
    Synthesis, AARRR Pirate Metrics). Delete the unused fake "downloads"
    counts from the data.

## PHASE 2 - POSITIONING AND CONTENT
2.1 Hero: eyebrow "AI Product Owner". Replace the rotating typing headline
    with the fixed line "Generative AI and Gen BI in banking". In the
    brief card set title to "AI Product Owner" and open_to to
    "AI Product Manager roles". Leave the availability line as it is.
2.2 Stat tiles: "9+ years in tech", "6+ years as a Product Owner",
    "4 industries: banking, energy, gaming, consumer tech",
    "9 certifications". Keep the Google Cloud and PSPO II tiles. Replace
    every other "8+ years" on the site with "9+ years in tech" or
    "6+ years as a Product Owner", whichever fits the sentence.
2.3 Lloyds experience: keep the existing summary sentence. Replace the
    achievements with:
    - Product Owner for Gen BI in the AI Centre of Excellence, replacing
      manual reports with reporting colleagues can question in plain
      English.
    - Supported Gen BI use cases for four business areas.
    - Cut dependency on manually produced reports by moving recurring
      requests to self-serve answers.
    Update the Lloyds project card to match.
2.4 Homepage featured projects: Lloyds Gen BI, PromptLab and the Google
    Maps teardown. Move AI Health Companion off the homepage.
2.5 Skills: cut the 48 tiles to about 15 in three groups (AI and Data,
    Product and Strategy, Delivery). Keep Gen AI, Gen BI, LLM Tools,
    Prompt Engineering, Vertex AI, Semantic Layer, Google Cloud, BigQuery,
    SQL, Looker, Roadmapping, Stakeholder Management, OKR Alignment,
    Go-To-Market, SAFe. Replace emoji with lucide icons.
2.6 Toolkit copy: remove "battle-tested" and describe the files honestly
    as one-page worksheets and starting templates.

## PHASE 3 - ACCESSIBILITY AND POLISH
3.1 Replace the muted grey #4F4D70 everywhere with a token that reaches at
    least 4.5:1 contrast on both #0D0D1A and #13132A. Compute and report
    the ratio.
3.2 Respect prefers-reduced-motion for the cursor glow, bouncing arrow and
    all framer-motion entrances.
3.3 Contact page: keep the mailto form, and add a visible plain email link
    with a copy button for visitors without a mail app.
3.4 Check every page at 375px, 768px and 1440px and fix layout breaks.

## PHASE 4 - INTERACTIVE ELEMENTS (second branch)
Create a /lab index page linked from the nav, and build each element as an
isolated component with no new heavy dependencies.
4.1 Gen BI demo at /lab/gen-bi. The visitor picks or types a plain-English
    question about a fictional retailer and gets a chart plus a one-line
    answer. Use a small synthetic dataset and deterministic keyword
    matching, no AI calls. Offer six suggested questions and a graceful
    fallback for unmatched input. Show a visible note: "Demo with
    synthetic data. Not connected to any employer's data or systems."
    Feature it on the homepage.
4.2 Terminal card. Make the hero product_brief card interactive: commands
    help, about, projects, experience, skills, contact, why-hire, clear.
    The default view stays the current brief, it must render without
    JavaScript, and it must be keyboard accessible.
4.3 Backlog game at /lab/backlog-game. Sixty seconds, eight backlog items
    with reach, impact, confidence and effort, and a fixed capacity. Score
    the player's selection against the RICE-optimal set and explain the
    difference. Include a copy-my-score button.

## FINISH
Confirm that searching the repo for "akashjindal.dev", "Monzo" and
"Barclays" returns nothing. Then write docs/overhaul-report.md listing what
changed per phase, anything skipped and why, remaining audit warnings, and
decisions you made that I should review.
