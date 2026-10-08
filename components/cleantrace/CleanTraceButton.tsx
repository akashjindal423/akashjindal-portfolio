'use client'

import { Sparkles } from 'lucide-react'
import { useCleanTrace } from './CleanTraceProvider'

/** Header button that replays CleanTrace mode on any page. */
export default function CleanTraceButton({ className = '' }: { className?: string }) {
  const { play, active } = useCleanTrace()

  return (
    <button
      type="button"
      onClick={(e) => play(e.currentTarget)}
      disabled={active}
      aria-label="CleanTrace mode: clean the page"
      title="CleanTrace mode: clean the page"
      className={`inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-2.5 py-2 text-sm text-text-muted hover:border-[var(--border-strong)] hover:text-text-primary disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 transition-colors duration-200 ${className}`}
    >
      <Sparkles size={16} aria-hidden="true" />
      <span className="hidden lg:inline">
        CleanTrace
      </span>
    </button>
  )
}
