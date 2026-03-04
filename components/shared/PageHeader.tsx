import AnimatedEntry from '@/components/shared/AnimatedEntry'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
}

export default function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <AnimatedEntry>
      {eyebrow && (
        <p className="text-violet-400 text-xs uppercase tracking-widest mb-3">{eyebrow}</p>
      )}
      <h1 className="text-4xl md:text-5xl font-bold text-text-primary font-sans">{title}</h1>
      {subtitle && (
        <p className="text-text-secondary text-lg mt-4 max-w-2xl leading-relaxed">{subtitle}</p>
      )}
    </AnimatedEntry>
  )
}
