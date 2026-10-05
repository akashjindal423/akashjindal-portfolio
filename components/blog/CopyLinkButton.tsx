'use client'

import { useState } from 'react'

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm text-text-secondary hover:border-[var(--border-strong)] hover:text-text-primary transition-all duration-200"
    >
      {copied ? 'Copied!' : 'Copy link'}
    </button>
  )
}
