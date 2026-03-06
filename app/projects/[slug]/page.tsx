import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getProjectBySlug, getProjects } from '@/lib/content'
import Badge from '@/components/shared/Badge'
import { CheckCircle2 } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return { title: project.title, description: project.description }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const { official, passion } = getProjects()
  const all = [...official, ...passion]
  const idx = all.findIndex((p) => p.slug === slug)
  const prev = idx > 0 ? all[idx - 1] : null
  const next = idx < all.length - 1 ? all[idx + 1] : null

  const responsibilities = [
    'Led discovery workshops with stakeholders across product, engineering, and compliance',
    'Defined and prioritised the product backlog across multiple delivery squads',
    'Ran user research sessions and synthesised insights into actionable requirements',
    'Managed delivery risk and maintained transparency with senior leadership',
    'Coordinated UAT, release planning, and post-launch metric tracking',
  ]

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {/* Back link */}
      <Link
        href="/projects"
        className="text-violet-400 hover:text-violet-300 text-sm transition-colors duration-200 mb-8 inline-block"
      >
        ← All Projects
      </Link>

      {/* Section 1 — Header */}
      <div className="mt-2">
        <Badge variant="accent">{project!.badge ?? project!.tags?.[0] ?? 'Project'}</Badge>
        <h1 className="text-4xl md:text-5xl font-bold font-sans leading-tight mt-4 text-text-primary">
          {project!.title}
        </h1>
        <p className="text-xl text-text-secondary mt-4 leading-relaxed">{project!.description}</p>

        <div className="flex flex-wrap gap-6 mt-6 text-sm text-text-muted">
          {project!.period && <span>{project!.period}</span>}
          <div className="flex flex-wrap gap-2">
            {project!.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[#2A2A50] mt-8 mb-8" />

      {/* Section 2 — Description & Tags */}
      <div className="mt-8">
        <p className="text-lg text-[#A09EC0] leading-relaxed">{project!.description}</p>
        <div className="flex flex-wrap gap-2 mt-6">
          {project!.tags.map((tag: string) => (
            <span key={tag} className="text-xs bg-[#13132A] border border-[#2A2A50] text-[#6B69A0] px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Section 3 — The Problem */}
      <section className="mb-10 mt-10">
        <h2 className="text-2xl font-bold text-text-primary border-l-4 border-violet-600 pl-4 mb-4">
          The Problem
        </h2>
        <div className="bg-[#13132A] rounded-xl p-6 text-text-secondary leading-relaxed">
          The existing system had grown organically over many years, resulting in significant technical debt, poor user experience, and a high rate of manual intervention. Stakeholders needed a clear, data-backed case for change before any discovery work could begin.
        </div>
      </section>

      {/* Section 4 — Approach */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-text-primary border-l-4 border-violet-600 pl-4 mb-4">
          Approach
        </h2>
        <div className="text-text-secondary leading-relaxed">
          I ran a structured discovery phase over six weeks: stakeholder interviews, process mapping, competitive benchmarking, and user research with 20+ participants. Findings were synthesised into a problem statement and opportunity space that aligned both technical and business stakeholders. Delivery followed in iterative two-week sprints with regular show-and-tells to maintain visibility.
        </div>
      </section>

      {/* Section 5 — Impact & Outcomes */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-text-primary border-l-4 border-violet-600 pl-4 mb-4">
          Impact & Outcomes
        </h2>
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6 mb-4 text-text-secondary leading-relaxed">
          Significant measurable improvements delivered across key metrics.
        </div>
        <div className="flex flex-wrap gap-4">
          {[
            { stat: '↑ 41%', label: 'Efficiency Gain' },
            { stat: '0', label: 'Compliance Breaches' },
            { stat: '+42', label: 'NPS Improvement' },
          ].map(({ stat, label }) => (
            <div
              key={label}
              className="bg-[#13132A] border border-[#2A2A50] rounded-lg p-4 text-center flex-1 min-w-[120px]"
            >
              <div className="text-emerald-400 text-2xl font-bold">{stat}</div>
              <div className="text-text-muted text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6 — My Responsibilities */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-text-primary border-l-4 border-violet-600 pl-4 mb-4">
          My Responsibilities
        </h2>
        <ul className="space-y-3">
          {responsibilities.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-text-secondary">
              <CheckCircle2 className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Section 7 — Footer nav */}
      <div className="flex justify-between mt-16 pt-8 border-t border-[#2A2A50]">
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className="text-violet-400 hover:text-violet-300 transition-colors duration-200 text-sm">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/projects/${next.slug}`} className="text-violet-400 hover:text-violet-300 transition-colors duration-200 text-sm">
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </main>
  )
}
