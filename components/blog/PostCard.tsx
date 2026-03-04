import Link from 'next/link'
import { Clock } from 'lucide-react'
import { format } from 'date-fns'
import Badge from '@/components/shared/Badge'
import { BlogPost } from '@/lib/content'

export default function PostCard({ slug, title, date, excerpt, tags, readingTime }: BlogPost) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block bg-[#13132A] border border-[#2A2A50] rounded-xl p-6 hover:border-violet-500/30 hover:-translate-y-[2px] hover:shadow-elevated transition-all duration-300"
    >
      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3 line-clamp-2">
        {tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
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
