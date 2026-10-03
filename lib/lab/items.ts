export interface LabItem {
  slug: string
  href: string
  title: string
  summary: string
  tags: string[]
}

/** Interactive experiments listed on /lab. Each lives in its own isolated component. */
export const LAB_ITEMS: LabItem[] = []
