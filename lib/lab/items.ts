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
      'Pick or type a question about a fictional retailer and get a chart plus a one-line answer, with the query it maps to. Synthetic data and keyword rules, no AI calls.',
    tags: ['Gen BI', 'Semantic layer', 'Data viz'],
  },
]
