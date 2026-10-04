import { Briefcase, ChevronRight } from 'lucide-react'
import Badge from '@/components/shared/Badge'
import { Experience } from '@/lib/types'
import { employerName } from '@/lib/content'

interface Props {
  experience: Experience
  isLast: boolean
  /** Show only the first two achievements (homepage summary). */
  compact?: boolean
}

function formatDate(ym: string) {
  const [year, month] = ym.split('-')
  return new Date(Number(year), Number(month) - 1).toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
  })
}

export default function TimelineItem({ experience, isLast, compact = false }: Props) {
  const { role, location, startDate, endDate, current, summary, achievements, tools } =
    experience

  const dateRange = `${formatDate(startDate)} – ${current ? 'Present' : endDate ? formatDate(endDate) : ''}`

  return (
    <div className="relative flex gap-4 sm:gap-8">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-4 top-8 bottom-0 w-px bg-[var(--border)]" />
      )}

      {/* Dot */}
      <div className="w-8 h-8 rounded-full bg-violet-600 flex-shrink-0 flex items-center justify-center z-10">
        <Briefcase className="w-4 h-4 text-white" />
      </div>

      {/* Card */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 sm:p-6 flex-1 min-w-0 mb-8">
        {/* Top row */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-lg text-text-primary">{role}</span>
          {current && (
            <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded-full">
              Current
            </span>
          )}
        </div>

        {/* Company + location */}
        <p className="text-violet-400 text-sm font-medium mt-1">
          {employerName(experience)} · {location}
        </p>

        {/* Dates */}
        <p className="text-text-muted text-xs mt-1">{dateRange}</p>

        {/* Summary */}
        <p className="text-text-secondary text-sm mt-3 leading-relaxed">{summary}</p>

        {/* Achievements */}
        <ul className="mt-3 space-y-1">
          {(compact ? achievements.slice(0, 2) : achievements).map((a) => (
            <li key={a} className="flex gap-2 items-start text-sm text-text-secondary">
              <ChevronRight className="w-3 h-3 mt-1 flex-shrink-0 text-violet-400" />
              {a}
            </li>
          ))}
        </ul>

        {/* Tools */}
        <div className="flex flex-wrap gap-2 mt-4">
          {tools.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
