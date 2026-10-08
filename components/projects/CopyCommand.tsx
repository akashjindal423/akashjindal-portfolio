'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

/** A shell command in a code block, with a copy button. */
export default function CopyCommand({ command }: { command: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle')

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(command)
      setStatus('copied')
    } catch {
      setStatus('failed')
    }
    setTimeout(() => setStatus('idle'), 2500)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 sm:pl-4">
        <code className="font-mono text-sm text-text-primary break-all">{command}</code>
        <button
          type="button"
          onClick={handleCopy}
          className="sm:ml-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] px-3.5 py-2 text-sm text-text-secondary hover:border-[var(--border-strong)] hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 transition-all duration-200"
        >
          {status === 'copied' ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
          {status === 'copied' ? 'Copied' : 'Copy'}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {status === 'copied' ? 'Install command copied to clipboard' : ''}
      </p>
      {status === 'failed' && (
        <p className="text-xs text-text-subtle mt-2" role="status">
          Couldn&apos;t copy automatically. Select the command above and copy it.
        </p>
      )}
    </div>
  )
}
