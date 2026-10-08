'use client'

import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { CoverageGrid, DONE_FRACTION, IDLE_MS, brushRadius, interpolate } from '@/lib/cleantrace'

type Phase = 'dusty' | 'clearing' | 'done'

const NOTE_MS = 6000

const rnd = (a: number, b: number) => a + Math.random() * (b - a)

/** Paints a warm dust layer: base wash, soft blotches, specks and a few fibres. */
function paintDust(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.globalCompositeOperation = 'source-over'
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = 'rgba(86, 82, 76, 0.94)'
  ctx.fillRect(0, 0, w, h)
  const area = w * h
  for (let i = 0; i < area / 1400; i++) {
    const x = rnd(0, w)
    const y = rnd(0, h)
    const r = rnd(24, 110)
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, Math.random() < 0.5 ? 'rgba(160, 150, 134, 0.13)' : 'rgba(36, 34, 30, 0.16)')
    g.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = g
    ctx.fillRect(x - r, y - r, r * 2, r * 2)
  }
  for (let i = 0; i < area / 60; i++) {
    const s = Math.random()
    const r = s < 0.85 ? rnd(0.4, 1.1) : s < 0.98 ? rnd(1.1, 2.2) : rnd(2.2, 3.6)
    ctx.fillStyle =
      Math.random() < 0.6
        ? `rgba(${rnd(160, 206) | 0}, ${rnd(152, 196) | 0}, ${rnd(138, 180) | 0}, ${rnd(0.25, 0.7).toFixed(2)})`
        : `rgba(26, 24, 22, ${rnd(0.25, 0.6).toFixed(2)})`
    ctx.beginPath()
    ctx.arc(rnd(0, w), rnd(0, h), r, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.lineCap = 'round'
  for (let i = 0; i < area / 22000; i++) {
    let x = rnd(0, w)
    let y = rnd(0, h)
    let a = rnd(0, Math.PI * 2)
    const len = rnd(14, 48)
    ctx.strokeStyle = `rgba(206, 198, 182, ${rnd(0.18, 0.42).toFixed(2)})`
    ctx.lineWidth = rnd(0.5, 1.1)
    ctx.beginPath()
    ctx.moveTo(x, y)
    for (let k = 0; k < 6; k++) {
      a += rnd(-0.6, 0.6)
      x += (Math.cos(a) * len) / 6
      y += (Math.sin(a) * len) / 6
      ctx.lineTo(x, y)
    }
    ctx.stroke()
  }
}

function sizeCanvas(canvas: HTMLCanvasElement, w: number, h: number) {
  const dpr = Math.min(2, window.devicePixelRatio || 1)
  canvas.width = Math.round(w * dpr)
  canvas.height = Math.round(h * dpr)
  canvas.style.width = `${w}px`
  canvas.style.height = `${h}px`
  const ctx = canvas.getContext('2d')
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
  return ctx
}

interface Props {
  /** Move focus to Skip on start; true when the visitor started it from the header button. */
  focusSkip: boolean
  onClose: () => void
}

/**
 * Full-viewport dust layer cleaned by the pointer. It gets out of the way at 80% clean,
 * after five seconds without cleaning, on Skip, on scroll, on resize or on any key press.
 */
export default function CleanTraceOverlay({ focusSkip, onClose }: Props) {
  const dustRef = useRef<HTMLCanvasElement>(null)
  const traceRef = useRef<HTMLCanvasElement>(null)
  const headRef = useRef<HTMLDivElement>(null)
  const skipRef = useRef<HTMLButtonElement>(null)
  const finishRef = useRef<() => void>(() => {})
  const [phase, setPhase] = useState<Phase>('dusty')
  const [percent, setPercent] = useState(0)
  const [touch, setTouch] = useState(false)
  const [reduced, setReduced] = useState(false)

  // Dust, sweeping and every way out
  useEffect(() => {
    const dust = dustRef.current
    const trace = traceRef.current
    const head = headRef.current
    if (!dust || !trace || !head) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const w = window.innerWidth
    const h = window.innerHeight
    const d = sizeCanvas(dust, w, h)
    const t = sizeCanvas(trace, w, h)
    if (!d || !t) return
    paintDust(d, w, h)

    const grid = new CoverageGrid(w, h)
    const radius = brushRadius(w)
    let last: { x: number; y: number } | null = null
    let angle = -Math.PI / 2
    let finished = false
    let raf = 0
    let traceUntil = 0
    let lastShown = -1
    let idle = window.setTimeout(() => finish(), IDLE_MS)
    const startFrame = requestAnimationFrame(() => {
      setReduced(reducedMotion)
      setTouch(coarse)
      if (focusSkip) skipRef.current?.focus({ preventScroll: true })
    })

    function finish() {
      if (finished) return
      finished = true
      window.clearTimeout(idle)
      cancelAnimationFrame(raf)
      t!.clearRect(0, 0, w, h)
      head!.style.opacity = '0'
      setPercent(100)
      setPhase('clearing')
    }
    finishRef.current = finish

    function stamp(x: number, y: number) {
      const g = d!.createRadialGradient(x, y, radius * 0.45, x, y, radius)
      g.addColorStop(0, 'rgba(0, 0, 0, 1)')
      g.addColorStop(1, 'rgba(0, 0, 0, 0)')
      d!.fillStyle = g
      d!.fillRect(x - radius, y - radius, radius * 2, radius * 2)
      grid.sweep(x, y, radius * 0.8)
    }

    function fadeTrace() {
      if (raf) return
      const tick = () => {
        raf = 0
        t!.globalCompositeOperation = 'destination-out'
        t!.fillStyle = 'rgba(0, 0, 0, 0.07)'
        t!.fillRect(0, 0, w, h)
        if (performance.now() < traceUntil && !finished) raf = requestAnimationFrame(tick)
        else t!.clearRect(0, 0, w, h)
      }
      raf = requestAnimationFrame(tick)
    }

    function sweep(x: number, y: number) {
      d!.globalCompositeOperation = 'destination-out'
      if (last) {
        const dx = x - last.x
        const dy = y - last.y
        if (Math.hypot(dx, dy) > 2) {
          const target = Math.atan2(dy, dx)
          const diff = ((target - angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI
          angle += diff * 0.3
        }
        for (const p of interpolate(last, { x, y }, radius / 4)) stamp(p.x, p.y)
        if (!reducedMotion) {
          t!.globalCompositeOperation = 'source-over'
          t!.strokeStyle = 'rgba(245, 181, 68, 0.6)'
          t!.lineWidth = 2
          t!.lineCap = 'round'
          t!.beginPath()
          t!.moveTo(last.x, last.y)
          t!.lineTo(x, y)
          t!.stroke()
          traceUntil = performance.now() + 1600
          fadeTrace()
        }
      } else {
        stamp(x, y)
      }
      last = { x, y }
      window.clearTimeout(idle)
      idle = window.setTimeout(() => finish(), IDLE_MS)
      const shown = Math.min(100, Math.round(grid.fraction * 100))
      if (shown !== lastShown) {
        lastShown = shown
        setPercent(shown)
      }
      if (grid.fraction >= DONE_FRACTION) finish()
    }

    function moveHead(x: number, y: number, visible: boolean) {
      head!.style.opacity = visible && !finished ? '1' : '0'
      head!.style.transform = `translate(${x}px, ${y}px) rotate(${angle - Math.PI / 2}rad)`
    }

    const onHud = (e: Event) => (e.target as HTMLElement | null)?.closest?.('[data-cleantrace-hud]') != null

    function onPointerDown(e: PointerEvent) {
      if (finished || onHud(e)) return
      last = null
      moveHead(e.clientX, e.clientY, true)
      sweep(e.clientX, e.clientY)
    }
    function onPointerMove(e: PointerEvent) {
      if (finished) return
      if (onHud(e)) {
        last = null
        moveHead(e.clientX, e.clientY, false)
        return
      }
      if (e.pointerType === 'mouse' || e.buttons) {
        sweep(e.clientX, e.clientY)
        moveHead(e.clientX, e.clientY, true)
      }
    }
    function onPointerUp(e: PointerEvent) {
      if (e.pointerType !== 'mouse') {
        last = null
        head!.style.opacity = '0'
      }
    }
    function onLeave() {
      last = null
      head!.style.opacity = '0'
    }
    function onKey(e: KeyboardEvent) {
      if (['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) return
      // Enter or Space on the Skip button is handled by its click
      if (document.activeElement === skipRef.current && (e.key === 'Enter' || e.key === ' ')) return
      finish()
    }

    const surface = dust.parentElement!
    surface.addEventListener('pointerdown', onPointerDown)
    surface.addEventListener('pointermove', onPointerMove)
    surface.addEventListener('pointerup', onPointerUp)
    surface.addEventListener('pointerleave', onLeave)
    window.addEventListener('wheel', finish, { passive: true })
    window.addEventListener('scroll', finish, { passive: true })
    window.addEventListener('resize', finish)
    window.addEventListener('keydown', onKey)

    return () => {
      finished = true
      window.clearTimeout(idle)
      cancelAnimationFrame(raf)
      cancelAnimationFrame(startFrame)
      surface.removeEventListener('pointerdown', onPointerDown)
      surface.removeEventListener('pointermove', onPointerMove)
      surface.removeEventListener('pointerup', onPointerUp)
      surface.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('wheel', finish)
      window.removeEventListener('scroll', finish)
      window.removeEventListener('resize', finish)
      window.removeEventListener('keydown', onKey)
    }
  }, [focusSkip])

  // Fade out, then show the note, then close
  useEffect(() => {
    if (phase === 'clearing') {
      const id = window.setTimeout(() => setPhase('done'), reduced ? 0 : 700)
      return () => window.clearTimeout(id)
    }
    if (phase === 'done') {
      const id = window.setTimeout(onClose, NOTE_MS)
      return () => window.clearTimeout(id)
    }
  }, [phase, reduced, onClose])

  const dusty = phase === 'dusty'

  return (
    <>
      {phase !== 'done' && (
        <div
          className={`fixed inset-0 z-[70] touch-none select-none ${dusty ? 'cursor-none' : 'pointer-events-none'} ${
            reduced ? '' : 'transition-opacity duration-700 ease-out motion-safe:animate-[cleantrace-in_250ms_ease-out]'
          } ${dusty ? 'opacity-100' : 'opacity-0'}`}
        >
          <canvas ref={dustRef} className="absolute left-0 top-0" aria-hidden="true" />
          <canvas ref={traceRef} className="pointer-events-none absolute left-0 top-0" aria-hidden="true" />
          <div
            ref={headRef}
            aria-hidden="true"
            className="pointer-events-none absolute -left-[54px] -top-3 h-6 w-[108px] rounded-t-xl rounded-b-lg opacity-0 transition-opacity duration-150"
            style={{
              background: 'linear-gradient(#41454E, #24272D)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.14)',
            }}
          >
            <span className="absolute left-1/2 -top-[30px] -ml-[4.5px] h-8 w-[9px] rounded-[5px] bg-[#33363E]" />
            <span className="absolute left-2.5 right-2.5 -bottom-0.5 h-[3px] rounded-sm bg-highlight" />
          </div>

          {dusty && (
            <div
              data-cleantrace-hud
              role="group"
              aria-label="CleanTrace mode"
              className="absolute bottom-4 right-4 left-4 sm:left-auto flex items-center justify-end gap-2 cursor-auto"
            >
              <p className="sr-only">
                The page is covered in decorative dust. Move your pointer to clean it, or skip.
              </p>
              <span
                aria-hidden="true"
                className="rounded-full border border-[var(--border)] bg-[var(--background)]/90 px-3.5 py-2 text-sm text-text-secondary tabular-nums"
              >
                {touch ? 'Drag to clean' : 'Move to clean'} · {percent}%
              </span>
              <button
                ref={skipRef}
                type="button"
                onClick={() => finishRef.current()}
                className="rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-text-primary hover:border-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              >
                Skip
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'done' && (
        <div
          role="status"
          className="fixed bottom-4 left-4 right-4 sm:right-auto z-[70] flex max-w-md items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] px-4 py-3 text-sm text-text-secondary shadow-[var(--shadow-elevated)]"
        >
          <p>
            <span className="text-text-primary font-medium">Clean.</span> A nod to CleanTrace, the AR cleaning
            guide I led at Dyson.
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="ml-auto -mr-1 rounded-md p-1 text-text-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  )
}
