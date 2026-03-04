import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import Badge from '@/components/shared/Badge'
import { Project } from '@/lib/types'

export default function ProjectCard({ slug, title, summary, category, tags, date, impact }: Project) {
  return (
    <div className="bg-[#13132A] border border-[#2A2A50] rounded-xl p-6 flex flex-col transition-all duration-300 hover:border-violet-500/30 hover:shadow-glow hover:-translate-y-[3px]">
      {/* Top row */}
      <div className="flex justify-end">
        <Badge variant="accent">{category}</Badge>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-text-primary leading-snug mt-3 mb-2">{title}</h3>

      {/* Summary */}
      <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">{summary}</p>

      {/* Impact */}
      {impact && (
        <div className="mt-4 border-l-2 border-violet-500 pl-3">
          <p className="text-sm text-text-secondary italic">{impact}</p>
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-between items-center">
        <span className="text-text-muted text-xs">{format(parseISO(date + '-01'), 'MMM yyyy')}</span>
        <Link
          href={`/projects/${slug}`}
          className="text-violet-400 text-sm hover:text-violet-300 transition-colors duration-200"
        >
          Case study →
        </Link>
      </div>
    </div>
  )
}
