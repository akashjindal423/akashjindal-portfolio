'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ExternalLink, Lock } from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { getFeaturedProjects } from '@/lib/content'

const projects = getFeaturedProjects()

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
        {projects.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative rounded-2xl border ${project.border} bg-gradient-to-br ${project.companyColor} bg-[#13132A] p-6 flex flex-col`}
          >
            <div className="flex items-start justify-between mb-3">
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${project.badgeColor}`}>
                {project.badge}
              </span>
              {project.clickable && project.externalUrl && (
                <a href={project.externalUrl} target="_blank" rel="noopener noreferrer"
                  className="text-[#4F4D70] hover:text-violet-400 transition">
                  <ExternalLink size={16} />
                </a>
              )}
              {!project.clickable && (
                <Lock size={14} className="text-[#3D3B60]" />
              )}
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
        ))}
      </div>
    </SectionWrapper>
  )
}
