'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ExternalLink, Lock } from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { getFeaturedProjects } from '@/lib/content'

type FeaturedItem = {
  slug: string
  badge: string
  badgeColor: string
  border: string
  companyColor: string
  company: string
  title: string
  description: string
  tags: string[]
  period: string
  href?: string
  externalUrl?: string
  locked?: boolean
}

const [lloyds] = getFeaturedProjects()

const featuredItems: FeaturedItem[] = [
  {
    slug: lloyds.slug,
    badge: lloyds.badge,
    badgeColor: lloyds.badgeColor,
    border: lloyds.border,
    companyColor: lloyds.companyColor,
    company: lloyds.company,
    title: lloyds.title,
    description: lloyds.description,
    tags: lloyds.tags,
    period: lloyds.period,
    locked: true,
  },
  {
    slug: 'ai-health-companion',
    badge: 'Passion Project',
    badgeColor: 'bg-violet-500/20 text-violet-400',
    border: 'border-violet-500/20',
    companyColor: 'from-violet-500/10 to-purple-500/10',
    company: 'Passion Project',
    title: 'AI Health Companion',
    description: 'A wellness product combining AI-guided exercise, real-time posture feedback, and culturally relevant nutrition — built around how people actually live.',
    tags: ['AI/ML', 'Health Tech', 'Computer Vision', 'Personalisation'],
    period: 'Concept Stage',
    href: '/projects/ai-health-companion',
  },
]

export default function FeaturedProjects() {
  return (
    <SectionWrapper id="projects">
      {/* Header */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <span className="block text-violet-400 text-xs uppercase tracking-widest mb-2">
            Selected Work
          </span>
          <h2 className="text-3xl font-bold text-text-primary">Featured Projects</h2>
        </div>
        <Link
          href="/projects"
          className="text-violet-400 text-sm hover:text-violet-300 transition-colors duration-200 whitespace-nowrap"
        >
          View all projects →
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {featuredItems.map((project, i) => {
          const card = (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl border ${project.border} bg-gradient-to-br ${project.companyColor} bg-[#13132A] p-6 flex flex-col h-full ${project.href ? 'hover:border-violet-500/30 hover:-translate-y-[2px] hover:shadow-glow transition-all duration-300 cursor-pointer' : ''}`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${project.badgeColor}`}>
                  {project.badge}
                </span>
                {project.externalUrl && (
                  <a href={project.externalUrl} target="_blank" rel="noopener noreferrer"
                    aria-label={`View ${project.title} externally`}
                    className="text-[#4F4D70] hover:text-violet-400 transition">
                    <ExternalLink size={16} aria-hidden="true" />
                  </a>
                )}
                {project.locked && <Lock size={14} className="text-[#3D3B60]" aria-label="NDA — details private" />}
              </div>
              <p className="text-xs text-[#4F4D70] mb-1">{project.company}</p>
              <h3 className="text-base font-bold text-[#F8F8FF] mb-3 leading-snug">{project.title}</h3>
              <p className="text-sm text-[#A09EC0] leading-relaxed flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] bg-[#0D0D1F]/60 border border-white/5 text-[#6B69A0] px-2 py-0.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-[#3D3B60] mt-3">{project.period}</p>
            </motion.div>
          )

          return project.href
            ? <Link key={project.slug} href={project.href}>{card}</Link>
            : <div key={project.slug}>{card}</div>
        })}
      </div>
    </SectionWrapper>
  )
}
