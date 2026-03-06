import { cn } from '@/lib/utils'

type Variant = 'default' | 'accent'

interface BadgeProps {
  variant?: Variant
  className?: string
  children: React.ReactNode
}

const variantStyles: Record<Variant, string> = {
  default:
    'bg-[var(--surface)] text-[#A09EC0] border border-[var(--border)] hover:border-violet-500/40 hover:text-violet-400 transition-colors duration-200',
  accent:
    'bg-violet-600 text-white font-medium',
}

export default function Badge({ variant = 'default', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'text-xs px-3 py-1 rounded-full inline-block',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
