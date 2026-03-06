interface RoadmapPhaseProps {
  phase: string
  period: string
  label: string
  items: string[]
}

export default function RoadmapPhase({ phase, period, label, items }: RoadmapPhaseProps) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5">
      <div className="mb-3">
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-xs font-bold text-violet-400">{phase}</span>
          <span className="text-[11px] text-text-muted font-mono">{period}</span>
        </div>
        <p className="text-sm font-semibold text-text-primary">{label}</p>
      </div>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-xs text-text-secondary leading-snug">
            <span className="mt-[5px] w-1 h-1 rounded-full bg-violet-500/50 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
