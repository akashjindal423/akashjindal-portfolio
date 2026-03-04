# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Design System
- Theme: Deep Indigo + Violet (#0D0D1A bg, #13132A surface)
- Accent: Violet (#7C3AED / violet-600) — never blue as primary colour
- Fonts: Fraunces (hero H1 only), Inter (all else), JetBrains Mono (code)
- Radius: rounded-xl cards, rounded-lg inputs/buttons
- Cards: border border-[#2A2A50], hover border-violet-500/30 + translateY(-2px) + glow shadow
- Buttons: primary = bg-violet-600 text-white; secondary = ghost border

## Stack
- Next.js 14 App Router, TypeScript, Tailwind CSS v3
- shadcn/ui (Badge, Sheet, Dialog, Separator only)
- Framer Motion (scroll-reveal + hero entrance only)
- Decap CMS (/content/ folder, MDX + frontmatter)

## Rules
- Mobile-first always — add responsive classes on every component
- Never use blue as a primary colour
- Patch/diff edits only — never rewrite whole files unless I explicitly ask
- Short responses by default unless I ask for full file output
- Use components/shared/ utilities — don't re-implement AnimatedEntry, Button, Badge, SectionWrapper

## Stack
- Next.js 14 App Router, TypeScript, Tailwind CSS v3
- shadcn/ui (Badge, Sheet, Dialog, Separator only)
- Framer Motion (scroll-reveal + hero entrance only)
- Decap CMS (/content/ folder, MDX + frontmatter)

## Design System
- Theme: Deep Indigo + Violet (#0D0D1A bg, #13132A surface)
- Accent: Violet (#7C3AED / violet-600) — never blue as primary colour
- Fonts: Fraunces (hero H1 only), Inter (all else), JetBrains Mono (code)
- Radius: rounded-xl cards, rounded-lg inputs/buttons
- Cards: border border-[#2A2A50], hover border-violet-500/30 + translateY(-2px) + glow shadow
- Buttons: primary = bg-violet-600 text-white; secondary = ghost border

## Rules
- Mobile-first always — add responsive classes on every component
- Never use blue as a primary colour anywhere
- Patch/diff edits only — never rewrite whole files unless I explicitly ask
- Short responses by default unless I ask for full file output
- Use components/shared/ utilities — don't re-implement AnimatedEntry, Button, Badge, SectionWrapper
