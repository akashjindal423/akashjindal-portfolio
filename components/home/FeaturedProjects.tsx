'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ExternalLink, Lock } from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { getFeaturedPassionProjects, getFeaturedProjects } from '@/lib/content'

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
  period?: string
  href?: string
  externalUrl?: string
  locked?: boolean
}

const statusColorMap: Record<string, string> = {
  violet: 'bg-violet-500/20 text-violet-400',
  emerald: 'bg-emerald-500/20 text-emerald-400',
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
  ...getFeaturedPassionProjects().map((p) => ({
    slug: p.slug,
    badge: p.status,
    badgeColor: statusColorMap[p.statusColor] ?? statusColorMap.violet,
    border: 'border-violet-500/20',
    companyColor: 'from-violet-500/10 to-purple-500/10',
    company: 'Passion Project',
    title: p.title,
    description: p.description,
    tags: p.tags,
    href: `/projects/${p.slug}`,
  })),
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {featuredItems.map((project, i) => {
          const card = (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl border ${project.border} bg-gradient-to-br ${project.companyColor} bg-[var(--surface)] p-6 flex flex-col h-full ${project.href ? 'hover:border-violet-500/30 hover:-translate-y-[2px] hover:shadow-glow transition-all duration-300 cursor-pointer' : ''}`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${project.badgeColor}`}>
                  {project.badge}
                </span>
                {project.externalUrl && (
                  <a href={project.externalUrl} target="_blank" rel="noopener noreferrer"
                    aria-label={`View ${project.title} externally`}
                    className="text-text-subtle hover:text-violet-400 transition">
                    <ExternalLink size={16} aria-hidden="true" />
                  </a>
                )}
                {project.locked && <Lock size={14} className="text-text-subtle" role="img" aria-label="Confidential — details private" />}
              </div>
              <p className="text-xs text-text-subtle mb-1">{project.company}</p>
              <h3 className="text-base font-bold text-[#F8F8FF] mb-3 leading-snug">{project.title}</h3>
              <p className="text-sm text-[#A09EC0] leading-relaxed flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] bg-[var(--background)]/60 border border-white/5 text-text-subtle px-2 py-0.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
              {project.period && <p className="text-[11px] text-text-subtle mt-3">{project.period}</p>}
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
