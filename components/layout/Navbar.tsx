'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MobileNav from './MobileNav'

const NAV_LINKS = [
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Skills', href: '/skills' },
  { label: 'Toolkit', href: '/toolkit' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-50 h-16 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--border)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Left: Monogram + Name */}
          <Link href="/" className="flex items-center gap-2.5">
            <span className="w-8 h-8 bg-violet-600 text-white font-bold text-sm flex items-center justify-center rounded shrink-0">
              AJ
            </span>
            <span className="font-medium text-[var(--text-primary)]">Akash Jindal</span>
          </Link>

          {/* Centre: Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm transition-colors duration-200 ${
                  pathname === href
                    ? 'text-violet-400'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right: Contact button (desktop) + Menu icon (mobile) */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden md:inline-flex bg-violet-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-violet-500 transition-all duration-200"
            >
              Contact →
            </Link>
            {/* Mobile hamburger rendered by MobileNav */}
          </div>
        </div>
      </header>

      <MobileNav />
    </>
  )
}
