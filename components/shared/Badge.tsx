import { cn } from '@/lib/utils'

type Variant = 'default' | 'accent'

interface BadgeProps {
  variant?: Variant
  className?: string
  children: React.ReactNode
}

const variantStyles: Record<Variant, string> = {
  default:
    'bg-[var(--surface)] text-text-secondary border border-[var(--border)]',
  accent:
    'bg-[var(--surface-raised)] text-text-primary border border-[var(--border-strong)] font-medium',
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
