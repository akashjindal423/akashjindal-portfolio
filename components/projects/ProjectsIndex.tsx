'use client'
import PageHeader from '@/components/shared/PageHeader'
import { employerName, getProjects } from '@/lib/content'
import { ExternalLink, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const CHIP = 'bg-[var(--surface-raised)] border border-[var(--border)] text-text-secondary'

export default function ProjectsIndex() {
  const { official, passion } = getProjects()
  return (
    <main className="min-h-screen pt-24 pb-16 px-4 max-w-6xl mx-auto">
      <PageHeader
        eyebrow="WORK"
        title="Projects"
        subtitle="Official projects I have been involved with, and passion projects I am building."
      />

      {/* Official Projects */}
      <div className="mt-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs uppercase tracking-widest text-text-subtle">Official Projects</span>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {official.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${CHIP}`}>
                  {project.badge}
                </span>
                {project.clickable && project.externalUrl && (
                  <a href={project.externalUrl} target="_blank" rel="noopener noreferrer"
                    aria-label={`View ${project.title} externally`}
                    className="text-text-subtle hover:text-violet-400 transition-colors">
                    <ExternalLink size={16} aria-hidden="true" />
                  </a>
                )}
                {!project.clickable && (
                  <Lock size={14} className="text-text-subtle" role="img" aria-label="Confidential — details private" />
                )}
              </div>
              <p className="text-xs text-text-subtle mb-1">{employerName(project)}</p>
              <h3 className="text-base font-bold text-text-primary mb-3 leading-snug">{project.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] bg-[var(--background)]/60 border border-white/5 text-text-subtle px-2 py-0.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-text-subtle mt-3">{project.period}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Passion Projects */}
      <div className="mt-14">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs uppercase tracking-widest text-text-subtle">Passion Projects</span>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {passion.map((project, i) => {
            const cardContent = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={`rounded-2xl border border-dashed border-[var(--border)] bg-[var(--background)]/50 p-6 flex flex-col transition-all duration-300 ${project.clickable ? 'hover:border-[var(--border-strong)] hover:-translate-y-[2px] cursor-pointer' : ''}`}
              >
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium w-fit mb-3 ${CHIP}`}>
                  {project.status}
                </span>
                <h3 className="text-base font-bold text-text-primary mb-3 leading-snug">{project.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] bg-[var(--surface)] border border-white/5 text-text-subtle px-2 py-0.5 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
            return project.clickable
              ? <Link key={project.slug} href={`/projects/${project.slug}`}>{cardContent}</Link>
              : <div key={project.slug}>{cardContent}</div>
          })}
        </div>
      </div>
    </main>
  )
}
