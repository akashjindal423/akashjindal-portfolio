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
  note?: string
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

export interface OfficialProject {
  slug: string
  company: string
  title: string
  description: string
  tags: string[]
  period: string
  companyColor: string
  border: string
  badge: string
  badgeColor: string
  clickable: boolean
  externalUrl?: string
}

export interface PassionProject {
  slug: string
  title: string
  description: string
  tags: string[]
  status: string
  statusColor: string
  clickable?: boolean
}

export interface ProjectsData {
  official: OfficialProject[]
  passion: PassionProject[]
}
