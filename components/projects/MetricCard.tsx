interface MetricCardProps {
  type: string
  name: string
  desc: string
}

export default function MetricCard({ type, name, desc }: MetricCardProps) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5">
      <p className="text-[10px] uppercase tracking-widest text-violet-500 font-semibold mb-2">{type}</p>
      <p className="text-sm font-bold text-text-primary leading-snug mb-2">{name}</p>
      <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
    </div>
  )
}
