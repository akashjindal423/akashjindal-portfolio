'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { DESKTOP_QUERY, STORAGE_KEY, shouldAutoPlay } from '@/lib/cleantrace'

// The overlay is only needed when it plays, so it stays out of the initial bundle.
const CleanTraceOverlay = dynamic(() => import('./CleanTraceOverlay'), { ssr: false })

interface CleanTraceContextValue {
  /** Start CleanTrace mode; focus returns to `trigger` when it ends. */
  play: (trigger?: HTMLElement | null) => void
  active: boolean
}

const CleanTraceContext = createContext<CleanTraceContextValue | null>(null)

export function useCleanTrace(): CleanTraceContextValue {
  const ctx = useContext(CleanTraceContext)
  if (!ctx) throw new Error('useCleanTrace must be used inside CleanTraceProvider')
  return ctx
}

function hasSeenIntro(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    // No storage means we can't remember the visit, so never auto-play.
    return true
  }
}

function markIntroSeen() {
  try {
    window.localStorage.setItem(STORAGE_KEY, '1')
  } catch {
    /* storage unavailable: nothing to remember */
  }
}

/**
 * CleanTrace mode. Auto-plays once, on a first desktop visit that lands on the homepage,
 * unless reduced motion is set. After that it only plays from the header button.
 */
export default function CleanTraceProvider({ children }: { children: React.ReactNode }) {
  const [run, setRun] = useState<{ id: number; focusSkip: boolean } | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const autoPlay = shouldAutoPlay({
      pathname: window.location.pathname,
      seen: hasSeenIntro(),
      desktop: window.matchMedia(DESKTOP_QUERY).matches,
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    })
    if (!autoPlay) return
    const frame = requestAnimationFrame(() => {
      // Remember as it starts, so a reload part-way through never replays it. Marking here
      // rather than before scheduling keeps React's development double-run from skipping it.
      markIntroSeen()
      setRun({ id: Date.now(), focusSkip: false })
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  const play = useCallback((trigger?: HTMLElement | null) => {
    triggerRef.current = trigger ?? null
    markIntroSeen()
    setRun((current) => current ?? { id: Date.now(), focusSkip: true })
  }, [])

  const close = useCallback(() => {
    setRun(null)
    const trigger = triggerRef.current
    triggerRef.current = null
    if (trigger) requestAnimationFrame(() => trigger.focus({ preventScroll: true }))
  }, [])

  const value = useMemo(() => ({ play, active: run !== null }), [play, run])

  return (
    <CleanTraceContext.Provider value={value}>
      {children}
      {run && <CleanTraceOverlay key={run.id} focusSkip={run.focusSkip} onClose={close} />}
    </CleanTraceContext.Provider>
  )
}
