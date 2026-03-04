'use client'

import { useState } from 'react'
import { getProjects } from '@/lib/content'
import ProjectCard from '@/components/projects/ProjectCard'
import PageHeader from '@/components/shared/PageHeader'
import ProjectFilters from '@/components/projects/ProjectFilters'
import AnimatedEntry from '@/components/shared/AnimatedEntry'

const allProjects = getProjects()
const categories = [...new Set(allProjects.map((p) => p.category))]

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered =
    activeFilter === 'All' ? allProjects : allProjects.filter((p) => p.category === activeFilter)

  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      <PageHeader
        eyebrow="WORK"
        title="Projects"
        subtitle="End-to-end case studies from discovery through delivery in banking and fintech."
      />
      <div className="mt-8">
        <ProjectFilters
          categories={categories}
          activeFilter={activeFilter}
          onFilter={setActiveFilter}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filtered.map((project, i) => (
          <AnimatedEntry key={project.slug} delay={i * 0.05}>
            <ProjectCard {...project} />
          </AnimatedEntry>
        ))}
      </div>
    </main>
  )
}
