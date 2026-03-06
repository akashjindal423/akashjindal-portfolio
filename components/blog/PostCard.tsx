import Link from 'next/link'
import { Clock } from 'lucide-react'
import { format } from 'date-fns'
import Badge from '@/components/shared/Badge'
import { BlogPost } from '@/lib/content'

export default function PostCard({ slug, title, date, excerpt, tags, readingTime, externalUrl }: BlogPost) {
  const href = externalUrl ?? `/blog/${slug}`
  return (
    <Link
      href={href}
      target={externalUrl ? '_blank' : undefined}
      rel={externalUrl ? 'noopener noreferrer' : undefined}
      className="group block bg-[#13132A] border border-[#2A2A50] rounded-xl p-6 hover:border-violet-500/30 hover:-translate-y-[2px] hover:shadow-elevated transition-all duration-300"
    >
      {/* Tags + LinkedIn badge */}
      <div className="flex flex-wrap gap-1.5 mb-3 items-center">
        {tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
        {externalUrl && (
          <span className="text-[10px] text-violet-400 border border-violet-500/30 rounded px-1.5 py-0.5 font-mono">
            ↗ LinkedIn
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-semibold text-lg text-text-primary leading-snug group-hover:text-violet-400 transition-colors duration-200">
        {title}
      </h3>

      {/* Excerpt */}
      <p className="text-sm text-text-secondary mt-2 leading-relaxed line-clamp-3">{excerpt}</p>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4 text-xs text-text-muted">
        <span>{format(new Date(date), 'd MMM yyyy')}</span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {readingTime} min read
        </span>
      </div>
    </Link>
  )
}
