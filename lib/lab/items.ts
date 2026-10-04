export interface LabItem {
  slug: string
  href: string
  title: string
  summary: string
  tags: string[]
}

/** Interactive experiments listed on /lab. Each lives in its own isolated component. */
export const LAB_ITEMS: LabItem[] = [
  {
    slug: 'gen-bi',
    href: '/lab/gen-bi',
    title: 'Gen BI demo: ask your data in plain English',
    summary:
      'A rule-based prototype over fictional 2025 retail data, with no AI model. Ask in plain English and see the answer, a chart and how your question was read. Unsupported questions get a clarification.',
    tags: ['Gen BI', 'Semantic layer', 'Data viz'],
  },
  {
    slug: 'backlog-game',
    href: '/lab/backlog-game',
    title: 'Backlog game: beat RICE in 60 seconds',
    summary:
      'Eight fictional backlog items, a fixed team capacity and one minute to choose. Your plan gets a modelled score against the RICE-optimal set, with an explanation of the difference.',
    tags: ['Prioritisation', 'RICE', 'Game'],
  },
]
