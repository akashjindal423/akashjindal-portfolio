'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X, Menu } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Skills', href: '/skills' },
  { label: 'Toolkit', href: '/toolkit' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Hamburger — shown only on mobile */}
      <button
        className="md:hidden fixed top-4 right-4 z-[60] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200"
        onClick={() => setOpen(v => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-64 z-[56] bg-[var(--surface)] border-l border-[var(--border)] flex flex-col pt-20 px-6 gap-2 transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={`py-3 text-sm font-medium border-b border-[var(--border)] transition-colors duration-200 ${
              pathname === href
                ? 'text-violet-400'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            {label}
          </Link>
        ))}
        <Link
          href="/contact"
          onClick={() => setOpen(false)}
          className="mt-4 inline-flex justify-center bg-violet-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-violet-500 transition-all duration-200"
        >
          Contact →
        </Link>
      </div>
    </>
  )
}
