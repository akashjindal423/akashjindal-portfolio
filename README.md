# akashjindal-portfolio

Source for [akashjindal.com](https://akashjindal.com), the portfolio of Akash Jindal,
AI Product Owner in the AI Centre of Excellence at Lloyds Banking Group.

## Stack

- Next.js 16 (App Router) with React 19 and TypeScript
- Tailwind CSS 4
- Framer Motion for entrance animations, lucide-react for icons
- Deployed on Vercel

There is no CMS or database. Site copy and structured data (experience, projects,
certifications, recommendations, blog index) live in `lib/content.ts`. Long-form
project write-ups are pages under `app/projects/`.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm test        # vitest: Gen BI engine, terminal, RICE, structured data
npm run build
```

## Layout

| Path | Purpose |
| --- | --- |
| `app/` | Routes, metadata, sitemap, robots, Open Graph images |
| `components/` | UI components; shared primitives in `components/shared/` |
| `lib/content.ts` | All site content |
| `public/downloads/pm-toolkit/` | PDFs served by the `/toolkit` page |
| `scripts/` | Python generator for the toolkit PDFs |
| `docs/` | Overhaul and re-audit plans and reports, before/after screenshots |
