import type { LucideIcon } from 'lucide-react'
import {
  Bot,
  BrainCircuit,
  ChartColumn,
  Cloud,
  CodeXml,
  Database,
  Layers,
  ListChecks,
  Map,
  MessageSquareCode,
  MessageSquareText,
  Repeat,
  Rocket,
  Sparkles,
  Target,
  Users,
  Workflow,
} from 'lucide-react'
import AnimatedEntry from '@/components/shared/AnimatedEntry'
import { cn } from '@/lib/utils'
import { getSkillGroups } from '@/lib/content'

const ICONS: Record<string, LucideIcon> = {
  'Gen AI': Sparkles,
  'Gen BI': MessageSquareText,
  'LLM Tools': Bot,
  'Prompt Engineering': MessageSquareCode,
  'Vertex AI': BrainCircuit,
  'Semantic Layer': Layers,
  'Google Cloud': Cloud,
  BigQuery: Database,
  SQL: CodeXml,
  Looker: ChartColumn,
  Roadmapping: Map,
  'Stakeholder Management': Users,
  'OKR Alignment': Target,
  'Go-To-Market': Rocket,
  SAFe: Workflow,
  Scrum: Repeat,
  'Backlog Management': ListChecks,
}

// Visual treatment per group, in the order getSkillGroups() returns them
const STYLES = [
  { accent: 'border-violet-500/30 bg-violet-500/5', headerColor: 'text-violet-400', iconColor: 'text-violet-400', wide: true },
  { accent: 'border-purple-500/30 bg-purple-500/5', headerColor: 'text-purple-400', iconColor: 'text-purple-400', wide: false },
  { accent: 'border-emerald-500/30 bg-emerald-500/5', headerColor: 'text-emerald-400', iconColor: 'text-emerald-400', wide: false },
]

interface SkillGroupView {
  category: string
  accent: string
  headerColor: string
  iconColor: string
  /** Layout: the large AI and Data group spans two columns on desktop. */
  wide: boolean
  skills: { name: string; icon: LucideIcon }[]
}

const skillGroups: SkillGroupView[] = getSkillGroups().map((g, i) => ({
  ...STYLES[i % STYLES.length],
  category: g.category,
  skills: g.skills.map((name) => ({ name, icon: ICONS[name] ?? Sparkles })),
}))

function GroupCard({ group }: { group: SkillGroupView }) {
  return (
    <div className={cn('rounded-2xl border p-5 h-full', group.accent)}>
      <h3 className={cn('text-sm font-semibold uppercase tracking-widest mb-5', group.headerColor)}>
        {group.category}
      </h3>
      <ul
        className={cn(
          'grid gap-x-2 gap-y-4',
          group.wide ? 'grid-cols-3 sm:grid-cols-5' : 'grid-cols-3 sm:grid-cols-4',
        )}
      >
        {group.skills.map(({ name, icon: Icon }) => (
          <li key={name} className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center">
              <Icon className={cn('w-6 h-6', group.iconColor)} aria-hidden="true" strokeWidth={1.75} />
            </div>
            <span className="text-[11px] font-medium text-text-secondary text-center leading-tight px-0.5">
              {name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function SkillIconGrid() {
  const [wide, ...rest] = skillGroups
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-8">
      <AnimatedEntry className="lg:col-span-2">
        <GroupCard group={wide} />
      </AnimatedEntry>
      <div className="flex flex-col gap-5">
        {rest.map((group, i) => (
          <AnimatedEntry key={group.category} delay={(i + 1) * 0.08}>
            <GroupCard group={group} />
          </AnimatedEntry>
        ))}
      </div>
    </div>
  )
}
