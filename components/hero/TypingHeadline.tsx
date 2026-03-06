'use client'
import { useEffect, useState } from 'react'

const roles = [
  'Product Owner',
  'Gen BI Specialist',
  'AI Product Thinker',
  'App & Dashboard Builder',
  'Cross-Industry Innovator',
]

export default function TypingHeadline() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout: NodeJS.Timeout
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    } else {
      setDeleting(false)
      setRoleIndex((i) => (i + 1) % roles.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIndex])

  return (
    <span className="text-violet-400 font-semibold">
      {displayed}
      <span className="animate-pulse ml-0.5">|</span>
    </span>
  )
}
