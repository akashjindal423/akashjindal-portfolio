import { Experience, Project } from './types'

export interface SkillGroup {
  category: string
  skills: { name: string; level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' }[]
}

export interface Training {
  slug: string
  title: string
  provider: string
  date: string
  credentialUrl?: string
  featured: boolean
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  readingTime: number
  heroImage?: string
  draft: boolean
  body: string
}

export interface Testimonial {
  slug: string
  quote: string
  author: string
  role: string
  company: string
  relationship: string
  linkedinUrl?: string
  featured: boolean
}

export function getTestimonials(): Testimonial[] {
  return [
    {
      slug: 'sarah-chen',
      quote: "Akash has a rare ability to hold the technical and business context simultaneously. He never loses sight of the user while managing complex engineering constraints — a quality that made him invaluable during our core banking migration.",
      author: 'Sarah Chen',
      role: 'Engineering Director',
      company: 'Monzo Bank',
      relationship: 'Direct Manager',
      featured: true,
    },
    {
      slug: 'james-okafor',
      quote: "Working with Akash on the Open Banking compliance programme was exceptional. He translated dense FCA requirements into clear, prioritised stories that the team could actually execute. Delivered on time, zero regulatory findings.",
      author: 'James Okafor',
      role: 'Head of Compliance',
      company: 'Barclays',
      relationship: 'Senior Stakeholder',
      featured: true,
    },
    {
      slug: 'priya-sharma',
      quote: "Akash is the kind of PO engineers love working with. He writes precise acceptance criteria, joins technical discussions without ego, and always has a clear rationale for prioritisation decisions. Highly recommend.",
      author: 'Priya Sharma',
      role: 'Senior Software Engineer',
      company: 'Monzo Bank',
      relationship: 'Team Member',
      featured: true,
    },
  ]
}

export function getExperience(): Experience[] {
  return [
    {
      slug: 'senior-po-fintech',
      role: 'Senior Product Owner',
      company: 'Monzo Bank',
      location: 'London, UK',
      startDate: '2022-06',
      current: true,
      summary:
        'Owning the lending product area, driving strategy and delivery for personal loans and overdrafts across 8M+ customers.',
      achievements: [
        'Launched instant personal loans feature, contributing £18M additional revenue in 12 months',
        'Reduced time-to-decision from 72 hours to under 4 minutes via ML credit scoring integration',
        'Led a cross-functional team of 12 across engineering, design, data and compliance',
      ],
      tools: ['Jira', 'Confluence', 'Figma', 'Amplitude', 'SQL', 'Miro'],
      order: 1,
    },
    {
      slug: 'po-barclays',
      role: 'Product Owner',
      company: 'Barclays',
      location: 'London, UK',
      startDate: '2019-09',
      endDate: '2022-05',
      current: false,
      summary:
        'Delivered digital transformation across retail banking, focusing on mobile app features and open banking compliance.',
      achievements: [
        'Shipped Open Banking PSD2 compliance features across 8 API endpoints ahead of FCA deadline',
        'Grew mobile app engagement by 34% through redesigned account overview and notification system',
        'Managed backlog for team of 8 engineers across 3 concurrent workstreams',
      ],
      tools: ['Jira', 'Confluence', 'SQL', 'Figma', 'Miro', 'Postman'],
      order: 2,
    },
    {
      slug: 'ba-accenture',
      role: 'Business Analyst → Product Analyst',
      company: 'Accenture',
      location: 'London, UK',
      startDate: '2017-08',
      endDate: '2019-08',
      current: false,
      summary:
        'Delivered requirements analysis, process mapping, and product analytics for FTSE 100 financial services clients.',
      achievements: [
        'Led requirements workshops with 40+ stakeholders for a core banking migration project',
        'Built SQL-based reporting suite reducing manual reporting effort by 15 hours/week',
      ],
      tools: ['SQL', 'Excel', 'Visio', 'Confluence', 'JIRA'],
      order: 3,
    },
  ]
}

export function getFeaturedProjects(): Project[] {
  return [
    {
      slug: 'payment-hub-modernisation',
      title: 'Payment Hub Modernisation',
      summary:
        'Led end-to-end discovery and delivery of a core payment processing platform serving 2M retail customers, replacing a 15-year-old legacy system.',
      category: 'Platform',
      tags: ['Payments', 'API', 'Agile', 'Stakeholder Management'],
      date: '2024-03',
      featured: true,
      impact: 'Reduced payment failure rate from 3% to 0.3%, saving £1.8M annually.',
      tools: ['Jira', 'Confluence', 'Figma', 'SQL', 'Miro'],
    },
    {
      slug: 'open-banking-dashboard',
      title: 'Open Banking Analytics Dashboard',
      summary:
        'Defined and shipped a self-serve analytics dashboard enabling relationship managers to view consolidated customer financial data across 12 institutions.',
      category: 'Analytics',
      tags: ['Open Banking', 'Data', 'UX Research', 'Compliance'],
      date: '2023-09',
      featured: true,
      impact: 'Adopted by 340 relationship managers in first month, NPS +42.',
      tools: ['Figma', 'SQL', 'Looker', 'Jira', 'Confluence'],
    },
    {
      slug: 'kyc-automation-platform',
      title: 'KYC Automation Platform',
      summary:
        'Spearheaded the product strategy for an AI-assisted KYC onboarding platform, reducing manual review time by 60% while maintaining full FCA compliance.',
      category: 'Compliance',
      tags: ['KYC', 'AI/ML', 'Compliance', 'Onboarding'],
      date: '2023-03',
      featured: true,
      impact: 'Cut onboarding time from 5 days to 18 hours. £2.4M cost saving in year 1.',
      tools: ['Jira', 'Miro', 'Python (data analysis)', 'Figma'],
    },
  ]
}

export function getProjects(): Project[] {
  return [
    ...getFeaturedProjects(),
    {
      slug: 'mobile-onboarding-redesign',
      title: 'Mobile Onboarding Redesign',
      summary: 'Redesigned the end-to-end mobile onboarding journey for a challenger bank, reducing drop-off by 41% and cutting completion time from 12 minutes to 4.',
      category: 'Discovery',
      tags: ['UX Research', 'Mobile', 'Onboarding', 'A/B Testing'],
      date: '2022-06',
      featured: false,
      impact: 'Drop-off reduced by 41%. Completion time cut from 12 min to 4 min.',
      tools: ['Figma', 'Amplitude', 'Jira', 'Hotjar', 'Miro'],
    },
    {
      slug: 'regulatory-reporting-platform',
      title: 'Regulatory Reporting Platform',
      summary: 'Led the product workstream for a new automated regulatory reporting tool covering CASS, EMIR, and MiFID II obligations across 6 asset classes.',
      category: 'Compliance',
      tags: ['Regulation', 'Reporting', 'CASS', 'MiFID II', 'Automation'],
      date: '2021-09',
      featured: false,
      impact: 'Eliminated 240 hours/month of manual reporting. Zero regulatory breaches in 2 years.',
      tools: ['Jira', 'Confluence', 'SQL', 'Excel', 'Visio'],
    },
  ]
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find(p => p.slug === slug)
}

export function getSkillGroups(): SkillGroup[] {
  return [
    {
      category: 'Product',
      skills: [
        { name: 'Product Discovery', level: 'Expert' },
        { name: 'Roadmap Strategy', level: 'Expert' },
        { name: 'Stakeholder Management', level: 'Expert' },
        { name: 'User Story Writing', level: 'Expert' },
        { name: 'OKR / KPI Setting', level: 'Advanced' },
      ],
    },
    {
      category: 'Delivery',
      skills: [
        { name: 'Agile / Scrum', level: 'Expert' },
        { name: 'Kanban', level: 'Advanced' },
        { name: 'Release Planning', level: 'Expert' },
        { name: 'Risk Management', level: 'Advanced' },
        { name: 'Cross-team Alignment', level: 'Expert' },
      ],
    },
    {
      category: 'Data & Analytics',
      skills: [
        { name: 'SQL', level: 'Advanced' },
        { name: 'Product Analytics', level: 'Advanced' },
        { name: 'A/B Testing', level: 'Intermediate' },
        { name: 'Amplitude / Mixpanel', level: 'Advanced' },
        { name: 'Data-driven Decisions', level: 'Expert' },
      ],
    },
    {
      category: 'Tools & Tech',
      skills: [
        { name: 'Jira / Confluence', level: 'Expert' },
        { name: 'Figma', level: 'Advanced' },
        { name: 'Miro', level: 'Expert' },
        { name: 'API / REST concepts', level: 'Advanced' },
        { name: 'Git basics', level: 'Intermediate' },
      ],
    },
  ]
}

export function getTraining(): Training[] {
  return [
    { slug: 'pspo', title: 'Professional Scrum Product Owner I (PSPO I)', provider: 'Scrum.org', date: '2021-06', credentialUrl: '#', featured: true },
    { slug: 'agilepm', title: 'AgilePM Foundation & Practitioner', provider: 'APMG International', date: '2020-03', credentialUrl: '#', featured: true },
    { slug: 'aws-cp', title: 'AWS Certified Cloud Practitioner', provider: 'Amazon Web Services', date: '2022-11', credentialUrl: '#', featured: true },
    { slug: 'google-analytics', title: 'Google Analytics Certification', provider: 'Google', date: '2023-02', credentialUrl: '#', featured: true },
  ]
}

export function getBlogPosts(): BlogPost[] {
  return [
    { slug: 'product-discovery-regulated', title: 'How I Run Product Discovery in a Regulated Environment', date: '2026-02-10', excerpt: 'Discovery in banking is not like discovery at a startup. Compliance, risk, and legacy systems create constraints that shape every decision. Here is how I make it work.', tags: ['Discovery', 'Banking', 'Agile'], readingTime: 5, draft: false, body: '' },
    { slug: 'user-stories-engineers-love', title: 'Writing User Stories That Engineers Actually Love', date: '2026-01-22', excerpt: 'After hundreds of sprint planning sessions, I have learned exactly what makes engineers groan and what makes them say "this is clear, I can build this." Here is the formula.', tags: ['Agile', 'Engineering', 'Communication'], readingTime: 4, draft: false, body: '' },
    { slug: 'technical-po-not-developer', title: 'Being a Technical PO Without Being a Developer', date: '2025-12-15', excerpt: 'Technical credibility does not mean writing code. It means understanding trade-offs, speaking the language of engineers, and knowing when to push back on technical debt.', tags: ['Product', 'Technical', 'Career'], readingTime: 6, draft: false, body: '' },
  ]
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getBlogPosts().find(p => p.slug === slug)
}
