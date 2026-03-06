interface PersonaCardProps {
  name: string
  age: string
  role: string
  goals: string[]
  frustrations: string[]
  needs: string[]
}

export default function PersonaCard({ name, age, role, goals, frustrations, needs }: PersonaCardProps) {
  const blocks = [
    { label: 'Goals', items: goals },
    { label: 'Frustrations', items: frustrations },
    { label: 'Needs', items: needs },
  ]

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 flex flex-col gap-4">
      <div>
        <p className="text-base font-bold text-violet-400">{name}, {age}</p>
        <p className="text-xs text-text-muted mt-0.5">{role}</p>
      </div>
      {blocks.map((block) => (
        <div key={block.label}>
          <p className="text-[10px] uppercase tracking-widest text-violet-500 font-medium mb-1.5">
            {block.label}
          </p>
          <ul className="space-y-1">
            {block.items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-text-secondary leading-snug">
                <span className="mt-[5px] w-1 h-1 rounded-full bg-[#3D3B60] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
