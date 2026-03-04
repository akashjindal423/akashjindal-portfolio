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
      className="px-4 py-2 rounded-lg border border-[#2A2A50] text-sm text-[#A09EC0] hover:border-violet-500/40 hover:text-violet-400 transition-all duration-200"
    >
      {copied ? 'Copied!' : 'Copy link'}
    </button>
  )
}
