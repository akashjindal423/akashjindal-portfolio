'use client'

interface TagFilterProps {
  tags: string[]
  activeTag: string
  onTag: (t: string) => void
}

export default function TagFilter({ tags, activeTag, onTag }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-6">
      {['All', ...tags].map((tag) => (
        <button
          key={tag}
          onClick={() => onTag(tag)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTag === tag
              ? 'bg-highlight text-[#0E0F12]'
              : 'bg-[var(--surface)] border border-[var(--border)] text-text-secondary hover:border-[var(--border-strong)]'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
