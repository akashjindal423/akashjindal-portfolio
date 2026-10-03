'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { CONTACT_EMAIL } from '@/lib/site'

/** Plain email address with a copy button, for visitors without a mail app. */
export default function CopyEmail() {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle')

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      setStatus('copied')
    } catch {
      setStatus('failed')
    }
    setTimeout(() => setStatus('idle'), 2500)
  }

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 sm:p-5">
      <p className="text-sm text-text-secondary mb-3">No mail app? Copy the address instead:</p>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-mono text-sm text-text-primary break-all hover:text-violet-400 transition-colors duration-200"
        >
          {CONTACT_EMAIL}
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="sm:ml-auto inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] px-4 py-2 text-sm text-text-secondary hover:border-violet-500/60 hover:text-violet-400 transition-all duration-200"
        >
          {status === 'copied' ? (
            <Check className="w-4 h-4" aria-hidden="true" />
          ) : (
            <Copy className="w-4 h-4" aria-hidden="true" />
          )}
          {status === 'copied' ? 'Copied' : 'Copy email'}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {status === 'copied' ? 'Email address copied to clipboard' : ''}
      </p>
      {status === 'failed' && (
        <p className="text-xs text-text-subtle mt-2" role="status">
          Couldn&apos;t copy automatically. Select the address above and copy it.
        </p>
      )}
    </div>
  )
}
