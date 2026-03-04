'use client'

import Link from 'next/link'
import SectionWrapper from '@/components/shared/SectionWrapper'
import AnimatedEntry from '@/components/shared/AnimatedEntry'
import ProjectCard from '@/components/projects/ProjectCard'
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <AnimatedEntry key={project.slug} delay={i * 0.1}>
            <ProjectCard {...project} />
          </AnimatedEntry>
        ))}
      </div>
    </SectionWrapper>
  )
}
