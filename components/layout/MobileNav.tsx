'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X, Menu } from 'lucide-react'
import { PRIMARY_NAV, isActive } from '@/lib/nav'

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Mobile menu. Opening moves focus to the first link; Tab and Shift+Tab stay inside
 * the menu and its toggle; Escape (or the overlay) closes it and returns focus to
 * the toggle button.
 */
export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLElement>(null)

  // Close on route change (adjust state during render rather than in an effect)
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false)
    if (returnFocus) requestAnimationFrame(() => buttonRef.current?.focus())
  }, [])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Focus in on open, trap Tab inside, Escape closes
  useEffect(() => {
    if (!open) return
    const drawer = drawerRef.current
    const first = drawer?.querySelector<HTMLElement>(FOCUSABLE)
    // The drawer is still visibility:hidden on the first frame of its transition, so retry briefly
    let tries = 0
    let timer: ReturnType<typeof setTimeout> | undefined
    const focusFirst = () => {
      first?.focus()
      if (first && document.activeElement !== first && tries++ < 15) timer = setTimeout(focusFirst, 20)
    }
    requestAnimationFrame(focusFirst)

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        close(true)
        return
      }
      if (e.key !== 'Tab' || !drawer || !buttonRef.current) return
      const items = [buttonRef.current, ...drawer.querySelectorAll<HTMLElement>(FOCUSABLE)]
      const index = items.indexOf(document.activeElement as HTMLElement)
      const last = items.length - 1
      if (e.shiftKey && index <= 0) {
        e.preventDefault()
        items[last].focus()
      } else if (!e.shiftKey && (index === last || index === -1)) {
        e.preventDefault()
        items[0].focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, close])

  return (
    <>
      {/* Hamburger — shown only on mobile */}
      <button
        ref={buttonRef}
        type="button"
        className="md:hidden fixed top-2.5 right-2.5 z-[60] rounded-lg p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 transition-colors duration-200"
        onClick={() => (open ? close(true) : setOpen(true))}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
      >
        {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm"
          onClick={() => close(true)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <nav
        ref={drawerRef}
        id="mobile-nav-drawer"
        aria-label="Mobile"
        inert={!open}
        className={`md:hidden fixed top-0 right-0 h-full w-64 z-[56] bg-[var(--surface)] border-l border-[var(--border)] flex flex-col pt-20 px-6 gap-2 transition-[transform,visibility] duration-300 motion-reduce:transition-none ${
          open ? 'translate-x-0 visible' : 'translate-x-full invisible'
        }`}
      >
        {PRIMARY_NAV.map(({ label, href }) => {
          const active = isActive(pathname, href)
          return (
            <Link
              key={href}
              href={href}
              onClick={() => close(false)}
              aria-current={active ? 'page' : undefined}
              className={`py-3 text-sm font-medium border-b border-[var(--border)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-sm ${
                active ? 'text-violet-400' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {label}
            </Link>
          )
        })}
        <Link
          href="/contact"
          onClick={() => close(false)}
          aria-current={pathname === '/contact' ? 'page' : undefined}
          className="mt-4 inline-flex justify-center bg-violet-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white transition-all duration-200"
        >
          Contact →
        </Link>
      </nav>
    </>
  )
}
