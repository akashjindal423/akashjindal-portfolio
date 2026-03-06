import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  className?: string
  children: React.ReactNode
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-violet-600 text-white font-semibold hover:bg-violet-500 hover:scale-[1.02]',
  secondary:
    'border border-[var(--border)] text-[#A09EC0] hover:border-violet-500/60 hover:text-violet-400',
  ghost:
    'text-[#A09EC0] hover:text-violet-400',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-lg transition-all duration-200 inline-flex items-center gap-2',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
