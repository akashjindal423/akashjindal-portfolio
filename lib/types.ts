export interface Experience {
  slug: string
  role: string
  company: string
  location: string
  startDate: string
  endDate?: string
  current: boolean
  summary: string
  achievements: string[]
  tools: string[]
  order: number
}

export interface Project {
  slug: string
  title: string
  summary: string
  category: string
  tags: string[]
  date: string
  featured: boolean
  problem?: string
  approach?: string
  impact?: string
  tools?: string[]
  image?: string
  githubUrl?: string
  liveUrl?: string
}
