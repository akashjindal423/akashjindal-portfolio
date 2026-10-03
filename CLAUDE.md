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
- Theme: deep indigo + violet (#0D0D1A background, #13132A surface)
- Accent: violet (#7C3AED / violet-600). Never use blue as a primary colour.
- Fonts: Fraunces (hero H1 only), Inter (everything else), JetBrains Mono (code)
- Radius: `rounded-xl` cards, `rounded-lg` inputs and buttons
- Cards: `border border-[#2A2A50]`; hover `border-violet-500/30` + `-translate-y-[2px]` + glow shadow
- Buttons: primary `bg-violet-600 text-white`; secondary is a ghost border
- Muted text must meet WCAG AA (4.5:1) on both background and surface; use the
  `text-text-muted` token rather than hard-coded greys.

## Engineering rules
- Mobile-first: add responsive classes on every component; check 375px, 768px, 1440px.
- Reuse `components/shared/` (AnimatedEntry, Button, Badge, SectionWrapper, PageHeader)
  instead of re-implementing them.
- Respect `prefers-reduced-motion` for any new animation.
- Every route needs its own title, description and canonical URL. Client-component
  pages get metadata from a sibling `layout.tsx` or a server wrapper.
- One `<h1>` per page; meaningful `alt` text on every image.
