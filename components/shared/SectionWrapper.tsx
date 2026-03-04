import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  id?: string
  className?: string
  children: React.ReactNode
}

export default function SectionWrapper({ id, className, children }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn('max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-20', className)}
    >
      {children}
    </section>
  )
}
