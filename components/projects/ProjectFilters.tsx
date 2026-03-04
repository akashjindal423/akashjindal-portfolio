'use client'

interface ProjectFiltersProps {
  categories: string[]
  activeFilter: string
  onFilter: (cat: string) => void
}

export default function ProjectFilters({ categories, activeFilter, onFilter }: ProjectFiltersProps) {
  const all = ['All', ...categories]
  return (
    <div className="flex flex-wrap gap-2">
      {all.map((cat) => (
        <button
          key={cat}
          onClick={() => onFilter(cat)}
          className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
            activeFilter === cat
              ? 'bg-violet-600 text-white font-semibold'
              : 'bg-[#13132A] border border-[#2A2A50] text-text-secondary hover:border-violet-500/40'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
