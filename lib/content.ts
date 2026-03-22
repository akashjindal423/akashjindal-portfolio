import { Experience, Project, OfficialProject, PassionProject, ProjectsData } from './types'

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
  externalUrl?: string
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
      role: 'Product Owner',
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
      location: 'Bristol, England · On-site',
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

export function getProjects(): ProjectsData {
  return {
    official: [
      {
        slug: 'lloyds-gen-bi',
        company: 'Lloyds Banking Group',
        title: 'Gen BI Initiative',
        description: 'Modernising traditional dashboards and reporting tools to make them Generative BI enabled — transforming how colleagues and customers interact with financial data across the bank.',
        tags: ['Gen BI', 'AI', 'GCP', 'Data', 'Banking'],
        period: 'Aug 2023 – Present',
        companyColor: 'from-green-500/10 to-emerald-500/10',
        border: 'border-green-500/20',
        badge: 'Current Role',
        badgeColor: 'bg-green-500/20 text-green-400',
        clickable: false,
      },
      {
        slug: 'dyson-cleantrace',
        company: 'Dyson',
        title: 'CleanTrace — First AR Product',
        description: "Led end-to-end development of Dyson's first in-home Augmented Reality cleaning guidance tool. International assignment across Singapore, Malaysia, and China bridging cross-cultural UX, hardware, and software teams.",
        tags: ['AR', 'Innovation', 'NPI', 'SAFe', 'APAC'],
        period: 'Sep 2022 – Aug 2023',
        companyColor: 'from-violet-500/10 to-purple-500/10',
        border: 'border-violet-500/20',
        badge: 'AR Innovation',
        badgeColor: 'bg-violet-500/20 text-violet-400',
        clickable: true,
        externalUrl: 'https://www.dyson.com.sg/newsroom/dyson-cleantrace',
      },
      {
        slug: 'sony-ps5',
        company: 'Sony Interactive Entertainment',
        title: 'PlayStation 5 Platform Launch',
        description: 'Contributed to the PS5 launch by leading ITSM and ServiceNow product initiatives. Orchestrated planning of launch-critical platform features ensuring reliability and readiness for global release.',
        tags: ['PS5', 'ITSM', 'ServiceNow', 'Platform', 'Launch'],
        period: 'Apr 2020 – Apr 2021',
        companyColor: 'from-blue-500/10 to-indigo-500/10',
        border: 'border-blue-500/20',
        badge: 'Platform Launch',
        badgeColor: 'bg-blue-500/20 text-blue-400',
        clickable: false,
      },
    ],
    passion: [
      {
        slug: 'passion-1',
        title: 'AI Product Research Tool',
        description: 'A tool to help product managers research competitors, synthesise user feedback, and generate PRD drafts using AI. Currently exploring and building.',
        tags: ['AI', 'Product Tools', 'LLM', 'In Progress'],
        status: 'In Progress',
        statusColor: 'bg-amber-500/20 text-amber-400',
      },
      {
        slug: 'passion-2',
        title: 'Gen BI Dashboard Concept',
        description: 'Exploring what a truly generative BI interface looks like — where users ask questions in natural language and get interactive data stories back, not just charts.',
        tags: ['Gen BI', 'Data', 'UX', 'Concept'],
        status: 'Concept',
        statusColor: 'bg-violet-500/20 text-violet-400',
      },
      {
        slug: 'passion-3',
        title: 'Product Portfolio Tracker',
        description: 'A lightweight personal tool to track product initiatives, outcomes, and learnings across roles — so POs can build a living evidence base for their CV and interviews.',
        tags: ['Productivity', 'Product', 'Side Project'],
        status: 'Ideation',
        statusColor: 'bg-blue-500/20 text-blue-400',
      },
      {
        slug: 'ai-health-companion',
        title: 'AI Health Companion',
        description: 'A wellness product combining AI-guided exercise, real-time posture feedback, and culturally relevant nutrition — built around how people actually live.',
        tags: ['AI/ML', 'Health Tech', 'Computer Vision', 'Personalisation'],
        status: 'Concept',
        statusColor: 'violet',
        clickable: true,
      },
      {
        slug: 'google-maps-teardown',
        title: 'Google Maps Product Teardown',
        description: 'A deep-dive PM analysis of Google Maps — competitive moat, monetisation flywheel, Local Guides ecosystem, Gemini integration, and three feature proposals with RICE prioritisation.',
        tags: ['Product Teardown', 'Strategy', 'AI/ML', 'Monetisation'],
        status: 'Published',
        statusColor: 'emerald',
        clickable: true,
      },
      {
        slug: 'promptlab',
        title: 'PromptLab',
        description: 'Open-source Python CLI that diagnoses prompts across 12 dimensions, generates targeted improvements using distinct strategies, and auto-tests all variants to find the winner — no dataset required.',
        tags: ['Python', 'CLI', 'AI', 'Open Source'],
        status: 'v0.1.0 · Open Source',
        statusColor: 'emerald',
        clickable: true,
      },
    ],
  }
}

export function getFeaturedProjects(): OfficialProject[] {
  return getProjects().official.slice(0, 1) // Lloyds only
}

export function getProjectBySlug(slug: string): OfficialProject | undefined {
  return getProjects().official.find(p => p.slug === slug)
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
    { slug: 'integrating-bdd-user-personas-agile', title: 'Integrating BDD & User Personas in Agile Product — Explained', excerpt: 'How Behaviour-Driven Development combined with well-crafted user personas transforms the way agile teams build products that actually solve real problems.', date: '2024-03-15', tags: ['Agile', 'BDD', 'Product', 'Discovery'], readingTime: 5, draft: false, body: '', externalUrl: 'https://www.linkedin.com/pulse/integrating-bdd-user-personas-agile-product-explained-akash-jindal-t3p2e/' },
    { slug: 'successful-golive-when-world-remote', title: 'Successful Go-Live When the World is Remote', excerpt: 'Lessons learned from managing a high-stakes product launch in a fully remote environment — stakeholder alignment, risk management, and keeping teams motivated across time zones.', date: '2021-06-10', tags: ['Product', 'Agile', 'Remote', 'Delivery'], readingTime: 4, draft: false, body: '', externalUrl: 'https://www.linkedin.com/pulse/successful-golive-when-world-remote-akash-jindal/' },
    { slug: 'amazon-go-revolutionize-grocery-shopping', title: 'Will Amazon Go Really Revolutionize Grocery Shopping?', excerpt: "A product thinker's analysis of Amazon Go — the cashierless store concept, its UX implications, scalability challenges, and what it means for the future of retail.", date: '2019-11-20', tags: ['Product', 'Innovation', 'Retail Tech', 'AI'], readingTime: 6, draft: false, body: '', externalUrl: 'https://www.linkedin.com/pulse/amazon-go-really-revolutionize-grocery-shopping-akash-jindal/' },
  ]
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getBlogPosts().find(p => p.slug === slug)
}

export function getCommunityInvolvement() {
  return [
    {
      slug: 'toastmasters',
      role: 'Vice President of Membership',
      organisation: 'Toastmasters International',
      period: 'Apr 2024 – Oct 2024',
      type: 'Leadership',
      typeColor: 'violet',
      location: 'London · Remote',
      summary: 'Empowering individuals through confident communication and leadership within a globally recognised public speaking community.',
      bullets: [
        'Reignited member engagement — spearheaded initiatives improving participation and community bonding',
        'Drove strategic membership growth via digital marketing campaigns and targeted email outreach',
        'Designed structured onboarding with mentorship support, improving retention and integration',
        'Built a scalable membership framework ensuring consistent communication and long-term development',
      ],
      tags: ['Team Leadership', 'Marketing', 'Community Building', 'Onboarding'],
    },
    {
      slug: 'soch-ngo',
      role: 'Mentor',
      organisation: 'SOCH (अंत ही आरम्भ)',
      period: 'Dec 2019 – Jul 2023',
      type: 'Social Impact',
      typeColor: 'emerald',
      location: 'India',
      summary: 'Supported high-impact social initiatives focused on health, inclusion, and sustainable development for underprivileged communities.',
      bullets: [
        'Led Covid-19 relief — delivered essentials to 1,000+ families. "Covid Frontline Warrior" (Alert Award 2020)',
        'Guided NGO through Section 8 registration, unlocking public donations and government partnerships',
        'Initiated Project Pride — gender-neutral washrooms and LGBTQIA+ mental health programmes',
      ],
      tags: ['Mentorship', 'Social Impact', 'Community Development', 'LGBTQIA+ Inclusion'],
    },
  ]
}
