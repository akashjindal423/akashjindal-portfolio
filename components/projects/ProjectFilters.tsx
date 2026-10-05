'use client'

interface ProjectFiltersProps {
  categories: string[]
  activeFilter: string
  onFilter: (cat: string) => void
}

export default function ProjectFilters({ categories, activeFilter, onFilter }: ProjectFiltersProps) {
  const all = ['All', ...categories]
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
      {all.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onFilter(cat)}
          aria-pressed={activeFilter === cat}
          className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
            activeFilter === cat
              ? 'bg-highlight text-[#0E0F12] font-semibold'
              : 'bg-[var(--surface)] border border-[var(--border)] text-text-secondary hover:border-[var(--border-strong)]'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
