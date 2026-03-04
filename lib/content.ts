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
      slug: 'dee-bolt',
      quote: "I've worked with Akash on a multi-million pound project for the best part of a year and a half and I can say without hesitation he has been an asset to the project and team. Akash has prevented many issues reaching production through his dedicated and thorough QA approaches. In the latter stage of the project Akash stepped up and absorbed a project analysis and ownership stance to help drive the project and product forward, making sure everyone has a clear and concise goal. A true Swiss army knife in a project delivery team!",
      author: 'Dee Bolt',
      role: 'Identity Architect & IAM/CIAM Consultant',
      company: 'Microsoft Entra Specialist',
      relationship: 'Worked on same project',
      linkedinUrl: 'https://www.linkedin.com/in/deebolt/',
      featured: true,
    },
    {
      slug: 'amit-goel',
      quote: "Akash has a varied skillset and has shown a great learning curve in IoT, Cloud, and Mobility related technologies. He has worked with great intellectuality and flexibility which helped the project immensely. All his hard work has helped him get growth in a short stint which is hard to see. It's not a big deal for a person like Akash.",
      author: 'Amit Goel',
      role: 'Delivery Manager',
      company: 'IBM',
      relationship: 'Direct Manager',
      linkedinUrl: 'https://www.linkedin.com/in/goelamit2008/',
      featured: true,
    },
    {
      slug: 'nitin-kumar',
      quote: "Akash is a gifted individual with a rare combination of technology, domain, and research specific skills. He scaled up in Enterprise Microservice Implementation and Brokered Architecture for B2B Integrations in no time with absolute professionalism. I've seen Akash go above and beyond — his 'Hunger For More' mindset means he's always eager to learn new business and tech. His talent and perseverance made him a valuable member of our team. I'm sure he'll be an asset to any team he joins.",
      author: 'Nitin Kumar',
      role: 'Senior Spatial AI Data & Cloud Engineer',
      company: 'AWS / Kubernetes',
      relationship: 'Mentor',
      linkedinUrl: 'https://www.linkedin.com/in/visit-nitin-kumar/',
      featured: true,
    },
    {
      slug: 'arumoy-chakraborty',
      quote: "Akash joined my team as a fresher but with a very different skillset than what our work needed. Surprisingly in a very short time it was evident that his runway is much shorter than we expected. He picked up very new skills, asked lots of important questions, and made himself valuable quickly. Be it conventional enterprise technologies or bleeding-edge ones like AR/VR, Akash has been an important and valuable person in the team all the way through.",
      author: 'Arumoy Chakraborty',
      role: 'Lead Developer',
      company: 'Delta Air Lines',
      relationship: 'Same team',
      linkedinUrl: 'https://www.linkedin.com/in/arumoy/',
      featured: false,
    },
  ]
}

export function getExperience(): Experience[] {
  return [
    {
      slug: 'lloyds-data-po',
      role: 'Data Product Owner',
      company: 'Lloyds Banking Group',
      location: 'Bristol, England · Hybrid',
      startDate: '2023-08',
      current: true,
      summary:
        'Driving innovation at the intersection of data, compliance, and cloud transformation within one of the UK\'s leading financial institutions.',
      achievements: [
        'Led strategic regulatory data initiatives — enhanced reporting accuracy, risk transparency, and compliance posture',
        'Contributed to AI Centre of Excellence (AI CoE) — enabling scalable, AI-driven solutions across functions',
        'Enabled cloud-led digital transformation — migrated key data assets from on-premise to Google Cloud Platform (GCP)',
        'Streamlined product delivery across squads in SAFe environment — Epics, Stories, and delivery priorities',
      ],
      tools: ['GCP', 'BigQuery', 'SAFe', 'Jira', 'Confluence', 'SQL', 'Data Engineering'],
      order: 1,
    },
    {
      slug: 'dyson-po-npi',
      role: 'Software Product Owner — New Product Innovation',
      company: 'Dyson',
      location: 'Bristol, England · On-site (+ Singapore, Malaysia, China)',
      startDate: '2022-09',
      endDate: '2023-08',
      current: false,
      summary:
        'Shaped the future of home technology through cutting-edge product development and cross-functional execution across global teams.',
      achievements: [
        'Pioneered Dyson\'s first Augmented Reality experience — led end-to-end development of Dyson CleanTrace AR cleaning guidance tool across APAC',
        'Spearheaded New Product Innovation (NPI) for Dyson WashG1 — first dedicated wet floor cleaner, from concept through prototype',
        'Drove cross-functional collaboration across UK and APAC hubs under tight timelines',
        'Championed Agile execution in SAFe — led ceremonies, backlog prioritisation, and stakeholder presentations at executive level',
      ],
      tools: ['SAFe', 'Jira', 'Figma', 'Agile', 'Road Maps', 'UX Research'],
      order: 2,
    },
    {
      slug: 'sse-po',
      role: 'Product Owner',
      company: 'SSE plc',
      location: 'Reading, England · Hybrid',
      startDate: '2021-04',
      endDate: '2022-08',
      current: false,
      summary:
        'Drove digital transformation projects within the energy sector, delivering scalable, customer-centric solutions.',
      achievements: [
        'Defined product roadmaps balancing technical feasibility and user outcomes across transformation portfolio',
        'Implemented SAFe frameworks, facilitated agile ceremonies, and prioritised backlogs across squads',
        'Liaised across NPI Design Engineering, UX, and Tech teams to streamline digital tools delivery',
      ],
      tools: ['SAFe', 'Jira', 'Confluence', 'Agile', 'Road Maps'],
      order: 3,
    },
    {
      slug: 'sony-po',
      role: 'Product Owner',
      company: 'Sony Interactive Entertainment',
      location: 'London · Hybrid',
      startDate: '2020-04',
      endDate: '2021-04',
      current: false,
      summary:
        'Contributed to the successful PlayStation 5 launch by leading service delivery and tech product initiatives within the ITSM and ServiceNow ecosystem.',
      achievements: [
        'Delivered ITSM & ServiceNow enhancements — global collaboration across UX/UI, engineering, and research teams',
        'Orchestrated planning and execution of key platform features aligned with PS5 launch timeline',
        'Directed EPIC and Story backlog refinement for automation testing and quality assurance',
      ],
      tools: ['ServiceNow', 'Scrum', 'Jira', 'Microsoft Outlook', 'ITSM'],
      order: 4,
    },
    {
      slug: 'infosys-consultant',
      role: 'Associate Consultant',
      company: 'Infosys',
      location: 'Bengaluru, India · Hybrid',
      startDate: '2016-12',
      endDate: '2020-04',
      current: false,
      summary:
        'Delivered cross-industry transformation projects across financial services, manufacturing, and agri-tech for Fortune 500 clients.',
      achievements: [
        'Led GDPR-compliant migration of 400K+ legacy records including PII data into Azure cloud pipelines',
        'Key contributor to Manufacturing & IoT Centre of Excellence — smart shopfloor for Toyota',
        'Part of core team for Infosys Digi Agri Pilot — AI-led agriculture solution using cloud, IoT, and data analytics',
        'Standardised operational workflows across three major business lines',
      ],
      tools: ['Azure', 'IoT', 'DevOps', 'SQL', 'Agile', 'Cloud Migration'],
      order: 5,
    },
  ]
}

export function getHomeExperience(): Experience[] {
  return getExperience().slice(0, 2)
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
    { slug: 'google-gen-ai-leader', title: 'Generative AI Leader', provider: 'Google', date: '2025-10', credentialUrl: 'https://www.credly.com/go/R6C7fcRAz2J4Eums5Q6asg', featured: true },
    { slug: 'google-digital-cloud-leader', title: 'Digital Cloud Leader', provider: 'Google', date: '2025-01', credentialUrl: 'https://www.credly.com/badges/9567e1e5-950c-4dfd-af5c-4f4d23617dad', featured: true },
    { slug: 'google-ace', title: 'Associate Cloud Engineer', provider: 'Google', date: '2024-03', credentialUrl: 'https://google.accredible.com/e2edead5-c2c3-49dd-9e3d-aefa52630ecf', featured: true },
    { slug: 'icagile-apo', title: 'Agile Product Ownership (ICP-APO)', provider: 'ICAgile', date: '2025-07', credentialUrl: 'https://www.credly.com/badges/67e490ae-9348-4a4a-b709-d36b06550f96', featured: true },
    { slug: 'pspo-ii', title: 'Professional Scrum Product Owner II (PSPO II)', provider: 'Scrum.org', date: '2023-10', credentialUrl: 'https://www.credly.com/badges/29ae1c3a-189b-457a-a180-1f376d46f878', featured: true },
    { slug: 'pspo-i', title: 'Professional Scrum Product Owner I (PSPO I)', provider: 'Scrum.org', date: '2022-03', credentialUrl: 'https://www.credly.com/badges/f39c0e55-dde0-4475-bd8d-2de13ad4df56', featured: true },
    { slug: 'lloyds-data-storytelling', title: 'Data Storytelling — Proficient', provider: 'Lloyds Banking Group', date: '2025-02', credentialUrl: 'https://www.credly.com/earner/earned/badge/91235142-0fd0-4762-aef6-1560ce5da8f4', featured: false },
    { slug: 'azure-az900', title: 'Azure Fundamentals (AZ-900)', provider: 'Microsoft', date: '2020-10', credentialUrl: 'https://www.youracclaim.com/badges/29b3483c-0ede-4081-a71e-95318819c1f5', featured: false },
    { slug: 'ibm-devops', title: 'IBM Certified Solution Advisor — DevOps V1', provider: 'IBM', date: '2017-06', credentialUrl: 'https://www.youracclaim.com/badges/ab38acc8-6b36-4860-8870-dce5c331f68c', featured: false },
  ]
}

export interface Education {
  institution: string
  degree: string
  period: string
  grade?: string
  activities?: string
}

export function getEducation(): Education[] {
  return [
    {
      institution: 'Chandigarh College of Engineering & Technology, Panjab University',
      degree: "Bachelor's Degree, Mechanical Engineering",
      period: 'Jun 2012 – Jul 2016',
      grade: '75%',
      activities: 'College President, NSS, Music Club, Rotaract, Student Council, Entrepreneurship Cell',
    },
    {
      institution: 'Udacity',
      degree: 'Nanodegree — iOS Development (Computer Science)',
      period: 'Jun 2016 – Dec 2016',
      grade: '9.5/10',
    },
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
