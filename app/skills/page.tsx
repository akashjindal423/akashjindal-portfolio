import { Search, Code2, TrendingUp } from 'lucide-react'
import PageHeader from '@/components/shared/PageHeader'
import SectionWrapper from '@/components/shared/SectionWrapper'
import SkillIconGrid from '@/components/sections/SkillIconGrid'

const howIWork = [
  {
    icon: Search,
    title: 'Discovery First',
    body: 'I never skip the problem space. Every roadmap starts with a clearly defined problem and user evidence.',
  },
  {
    icon: Code2,
    title: 'Technical Fluency',
    body: 'I can read a schema, write a SQL query, and join architecture discussions without slowing the team down.',
  },
  {
    icon: TrendingUp,
    title: 'Outcome Over Output',
    body: 'Shipped features mean nothing without metrics. I define success criteria before writing a single ticket.',
  },
]

export default function SkillsPage() {
  return (
    <main>
      <SectionWrapper>
        <PageHeader
          eyebrow="SKILLS"
          title="Core Competencies"
          subtitle="A full breakdown of my product, delivery, and technical skills."
        />
      </SectionWrapper>

      <SectionWrapper>
        <SkillIconGrid />
      </SectionWrapper>

      <SectionWrapper>
        <p className="text-violet-400 text-xs uppercase tracking-widest mb-2">Approach</p>
        <h2 className="text-3xl font-bold text-text-primary mb-8">How I Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {howIWork.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
              <Icon className="w-6 h-6 text-violet-400 mb-4" />
              <h3 className="font-semibold text-text-primary mb-2">{title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </main>
  )
}
