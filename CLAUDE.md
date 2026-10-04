# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository.

## What this is
Personal portfolio for Akash Jindal, deployed on Vercel at https://akashjindal.com.

## Stack
- Next.js 16 (App Router, Turbopack), React 19, TypeScript (strict)
- Tailwind CSS 4 via `@tailwindcss/postcss`. Theme tokens live in `app/globals.css`;
  `tailwind.config.ts` is still loaded with `@config` for the legacy colour names
  (`text-text-primary`, `text-text-secondary`, `text-text-muted`, `bg-surface`, ...)
- Framer Motion for scroll-reveal and hero entrance only
- lucide-react for icons (no emoji as UI icons)
- shadcn/ui primitives in `components/ui/` (Badge, Sheet, Dialog, Separator)
- No CMS and no database. All copy and data live in `lib/content.ts`
  (experience, projects, training, testimonials, blog index). Long-form project
  pages are hand-written under `app/projects/<slug>/`.

## Commands
- `npm run dev` — local dev server
- `npm run lint` — ESLint (flat config, `eslint-config-next`)
- `npm run build` — production build; run lint and build before every push

## Content rules
- Do not invent facts, employers, metrics, quotes or testimonials. Only use what is
  already in `lib/content.ts` or what the owner supplies.
- Canonical domain is `akashjindal.com` (use `SITE_URL` from `lib/site.ts`).

## Design system
- Theme: near-neutral dark greys, no purple tint. Tokens in `app/globals.css`:
  background #0E0F12, surface #16181D, raised surface #1D2026, border #2A2E37,
  strong border #3E4350
- Violet (#7C3AED / violet-600) is the single brand accent: primary buttons, links,
  focus rings and the logo only. No violet glows, gradients or tinted cards.
  Never use blue as a primary colour.
- Amber (`highlight` token, #F5B544) is the warm second accent: eyebrow labels,
  highlights and selected states (with #0E0F12 text on amber fills)
- Charts: one hue per series from the colour-blind-safe categorical palette
  (`components/lab/Charts.tsx`); emphasis by a second validated hue plus a direct
  label, never two shades of one colour
- Fonts: Fraunces (hero H1 only), Inter (everything else), JetBrains Mono (code)
- Radius: `rounded-xl` cards, `rounded-lg` inputs and buttons
- Cards: `border border-[var(--border)]`; hover `border-[var(--border-strong)]` +
  `-translate-y-[2px]`, no glow
- Buttons: primary `bg-violet-600 text-white hover:bg-violet-700` (violet-500 fails
  contrast with white); secondary is a ghost border
- All text must meet WCAG AA (4.5:1) on background, surface and raised surface; use
  the text tokens (`text-text-primary`, `-secondary`, `-muted`, `-subtle`) rather than
  hard-coded greys.

## Engineering rules
- Mobile-first: add responsive classes on every component; check 375px, 768px, 1440px.
- Reuse `components/shared/` (AnimatedEntry, Button, Badge, SectionWrapper, PageHeader)
  instead of re-implementing them.
- Respect `prefers-reduced-motion` for any new animation.
- Nothing auto-advances. Any future carousel or rotating content needs a persistent,
  visible Pause control and must not autoplay at all when reduced motion is set
  (WCAG 2.2.2). Testimonials are static: one on the homepage, all on /recommendations.
- Every route needs its own title, description and canonical URL. Client-component
  pages get metadata from a sibling `layout.tsx` or a server wrapper.
- One `<h1>` per page; meaningful `alt` text on every image.
