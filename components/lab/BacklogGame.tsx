'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Check, Copy, Hourglass, Play, RotateCcw, Timer } from 'lucide-react'
import {
  CAPACITY,
  IMPACT_LABEL,
  ITEMS,
  PRODUCT,
  PRODUCT_BLURB,
  ROUND_SECONDS,
  effortOf,
  evaluate,
  riceScore,
  value,
  type BacklogItem,
  type Evaluation,
} from '@/lib/lab/backlog'
import { SITE_URL } from '@/lib/site'

type Phase = 'intro' | 'playing' | 'done'
/** Timed: 60-second countdown. Practice: no time limit (WCAG 2.2.1). */
type Mode = 'timed' | 'practice'

const fmt = (n: number) => Math.round(n).toLocaleString('en-GB')

function ItemFacts({ item }: { item: BacklogItem }) {
  return (
    <dl className="mt-2 grid grid-cols-4 gap-2 text-[11px]">
      {[
        ['Reach', `${fmt(item.reach)}/qtr`],
        ['Impact', `${IMPACT_LABEL[item.impact]} (${item.impact})`],
        ['Confidence', `${item.confidence * 100}%`],
        ['Effort', `${item.effort} wks`],
      ].map(([k, v]) => (
        <div key={k} className="min-w-0">
          <dt className="text-text-subtle uppercase tracking-wider text-[10px]">{k}</dt>
          <dd className="text-text-primary font-mono tabular-nums truncate">{v}</dd>
        </div>
      ))}
    </dl>
  )
}

export default function BacklogGame() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [mode, setMode] = useState<Mode>('timed')
  const [picked, setPicked] = useState<string[]>([])
  const [remaining, setRemaining] = useState(ROUND_SECONDS)
  const [result, setResult] = useState<Evaluation | null>(null)
  const [announcement, setAnnouncement] = useState('')
  const [copy, setCopy] = useState<'idle' | 'copied' | 'failed'>('idle')
  const deadline = useRef(0)
  // Mirror of `picked` for the timer callback, which must not read stale state
  const pickedRef = useRef<string[]>([])
  const resultRef = useRef<HTMLHeadingElement>(null)
  const boardRef = useRef<HTMLHeadingElement>(null)

  const used = effortOf(picked)

  const finish = useCallback((ids: string[]) => {
    setResult(evaluate(ids))
    setPhase('done')
  }, [])

  // Move focus to the board when a round starts, and to the result when it ends
  useEffect(() => {
    if (phase === 'playing') boardRef.current?.focus()
    if (phase === 'done') resultRef.current?.focus()
  }, [phase])

  // Countdown from a fixed deadline so the timer stays accurate if a tick is delayed
  useEffect(() => {
    if (phase !== 'playing' || mode !== 'timed') return
    const id = setInterval(() => {
      const left = Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000))
      setRemaining(left)
      if ([30, 10, 5].includes(left)) setAnnouncement(`${left} seconds left`)
      if (left === 0) {
        clearInterval(id)
        setAnnouncement("Time's up")
        finish(pickedRef.current)
      }
    }, 250)
    return () => clearInterval(id)
  }, [phase, mode, finish])

  function start(nextMode: Mode) {
    deadline.current = Date.now() + ROUND_SECONDS * 1000
    pickedRef.current = []
    setMode(nextMode)
    setPicked([])
    setResult(null)
    setRemaining(ROUND_SECONDS)
    setAnnouncement(nextMode === 'timed' ? `Round started. ${ROUND_SECONDS} seconds.` : 'Practice round started. No time limit.')
    setCopy('idle')
    setPhase('playing')
  }

  function toggle(id: string) {
    const next = picked.includes(id) ? picked.filter((x) => x !== id) : [...picked, id]
    if (effortOf(next) > CAPACITY) return
    pickedRef.current = next
    setPicked(next)
  }

  async function copyScore(r: Evaluation) {
    const round = mode === 'timed' ? '60-second round' : 'practice round'
    const text = `I scored ${r.score}% of the best possible plan in a ${round} of Akash Jindal's RICE backlog game (a model on fictional data). Can you beat it? ${SITE_URL}/lab/backlog-game`
    try {
      await navigator.clipboard.writeText(text)
      setCopy('copied')
    } catch {
      setCopy('failed')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>

      {phase === 'intro' && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-text-primary">How it works</h2>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-text-secondary">
            <li>
              You own the backlog for {PRODUCT}, {PRODUCT_BLURB}. Your team has{' '}
              <strong className="text-text-primary">{CAPACITY} person-weeks</strong> this quarter.
            </li>
            <li>Pick the items to build. Each shows Reach, Impact, Confidence and Effort. Selections can&apos;t exceed capacity.</li>
            <li>
              In the timed round you have <strong className="text-text-primary">{ROUND_SECONDS} seconds</strong>; when time runs
              out, your plan is scored against the RICE-optimal set. Prefer no clock? Practise with no time limit and submit
              when you&apos;re ready.
            </li>
          </ol>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => start('timed')}
              className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700 transition-all duration-200"
            >
              <Play className="h-4 w-4" aria-hidden="true" /> Start the 60-second round
            </button>
            <button
              type="button"
              onClick={() => start('practice')}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-6 py-3 font-semibold text-text-secondary hover:border-[var(--border-strong)] hover:text-text-primary transition-all duration-200"
            >
              <Hourglass className="h-4 w-4" aria-hidden="true" /> Practise without a timer
            </button>
          </div>
          <noscript>
            <p className="mt-3 text-sm text-text-subtle">The game needs JavaScript to run.</p>
          </noscript>
        </div>
      )}

      {phase === 'playing' && (
        <>
          <div className="sticky top-16 z-20 rounded-xl border border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur p-4">
            <h2 ref={boardRef} tabIndex={-1} className="mb-2 text-sm font-semibold text-text-primary outline-none">
              {mode === 'timed' ? 'Timed round: pick your plan' : 'Practice round: pick your plan, then submit'}
            </h2>
            <div className="flex flex-wrap items-center justify-between gap-3">
              {mode === 'timed' ? (
                <p className="flex items-center gap-2 font-mono text-lg text-text-primary tabular-nums">
                  <Timer className="h-5 w-5 text-highlight" aria-hidden="true" />
                  <span className="sr-only">Time left: </span>0:{String(remaining).padStart(2, '0')}
                </p>
              ) : (
                <p className="flex items-center gap-2 text-sm text-text-secondary">
                  <Hourglass className="h-5 w-5 text-highlight" aria-hidden="true" />
                  No time limit
                </p>
              )}
              <p className="text-sm text-text-secondary">
                Capacity <span className="font-mono text-text-primary tabular-nums">{used}/{CAPACITY}</span> person-weeks
              </p>
              <button
                type="button"
                onClick={() => finish(picked)}
                className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 transition-all duration-200"
              >
                Submit plan
              </button>
            </div>
            <div
              className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[var(--border)]"
              role="progressbar"
              aria-label="Capacity used"
              aria-valuemin={0}
              aria-valuemax={CAPACITY}
              aria-valuenow={used}
            >
              <div
                className="h-full rounded-full bg-highlight transition-[width] duration-200 motion-reduce:transition-none"
                style={{ width: `${(used / CAPACITY) * 100}%` }}
              />
            </div>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ITEMS.map((item) => {
              const on = picked.includes(item.id)
              const fits = on || used + item.effort <= CAPACITY
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    aria-disabled={!fits}
                    aria-pressed={on}
                    aria-describedby={!fits ? `${item.id}-nofit` : undefined}
                    className={`w-full rounded-xl border p-4 text-left transition-all duration-200 ${
                      on
                        ? 'border-highlight bg-highlight/10'
                        : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)] hover:-translate-y-[2px]'
                    } aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:hover:translate-y-0 aria-disabled:hover:border-[var(--border)]`}
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="font-semibold text-text-primary">{item.title}</span>
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                          on ? 'border-highlight bg-highlight text-[#0E0F12]' : 'border-[var(--border-strong)]'
                        }`}
                        aria-hidden="true"
                      >
                        {on && <Check className="h-3.5 w-3.5" />}
                      </span>
                    </span>
                    <ItemFacts item={item} />
                    {!fits && (
                      <span id={`${item.id}-nofit`} className="mt-2 block text-xs text-text-subtle">
                        Doesn&apos;t fit the remaining capacity
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </>
      )}

      {phase === 'done' && result && (
        <Results result={result} resultRef={resultRef} mode={mode} copy={copy} onCopy={() => copyScore(result)} onStart={start} />
      )}
    </div>
  )
}

function Results({
  result,
  resultRef,
  mode,
  copy,
  onCopy,
  onStart,
}: {
  result: Evaluation
  resultRef: React.RefObject<HTMLHeadingElement | null>
  mode: Mode
  copy: 'idle' | 'copied' | 'failed'
  onCopy: () => void
  onStart: (mode: Mode) => void
}) {
  const rows = [...ITEMS].sort((a, b) => riceScore(b) - riceScore(a))
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
        <h2 ref={resultRef} tabIndex={-1} className="text-xs uppercase tracking-widest text-highlight outline-none">
          Your result{mode === 'practice' ? ' (practice round)' : ''}
        </h2>
        <p className="mt-2 text-5xl font-bold text-text-primary">{result.score}%</p>
        <p className="mt-1 text-sm text-text-secondary">
          modelled score: your plan&apos;s {fmt(result.pickedValue)} modelled impact points as a share of the best
          plan&apos;s {fmt(result.optimalValue)} ({CAPACITY - result.unused}/{CAPACITY} person-weeks used)
        </p>
        <p className="mt-2 text-xs text-text-subtle">
          A model on fictional data, not a measure of value delivered: each item&apos;s modelled impact is Reach × Impact ×
          Confidence, using the made-up figures for {PRODUCT}.
        </p>
        <ul className="mt-5 space-y-2">
          {result.insights.map((text) => (
            <li key={text} className="flex gap-2 text-sm leading-relaxed text-text-secondary">
              <span className="text-highlight" aria-hidden="true">›</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 transition-all duration-200"
          >
            {copy === 'copied' ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
            {copy === 'copied' ? 'Score copied' : 'Copy my score'}
          </button>
          <button
            type="button"
            onClick={() => onStart(mode)}
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-5 py-2.5 text-sm text-text-secondary hover:border-[var(--border-strong)] hover:text-text-primary transition-all duration-200"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" /> Play again
          </button>
          <button
            type="button"
            onClick={() => onStart(mode === 'timed' ? 'practice' : 'timed')}
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-5 py-2.5 text-sm text-text-secondary hover:border-[var(--border-strong)] hover:text-text-primary transition-all duration-200"
          >
            {mode === 'timed' ? (
              <>
                <Hourglass className="h-4 w-4" aria-hidden="true" /> Practise without a timer
              </>
            ) : (
              <>
                <Timer className="h-4 w-4" aria-hidden="true" /> Try the 60-second round
              </>
            )}
          </button>
        </div>
        <p className="sr-only" aria-live="polite">
          {copy === 'copied' ? 'Score copied to clipboard' : ''}
        </p>
        {copy === 'failed' && (
          <p className="mt-2 text-xs text-text-subtle" role="status">
            Couldn&apos;t access the clipboard. Your modelled score: {result.score}% of the best possible plan.
          </p>
        )}
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-text-primary">The numbers behind it</h2>
        <p className="mt-1 text-sm text-text-secondary">
          Modelled impact = Reach × Impact × Confidence. RICE score = modelled impact ÷ effort. All figures are fictional.
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-[var(--border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500" tabIndex={0}>
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-[11px] uppercase tracking-wider text-text-subtle">
                <th scope="col" className="px-3 py-2 font-medium">Item</th>
                <th scope="col" className="px-3 py-2 font-medium text-right">Modelled impact</th>
                <th scope="col" className="px-3 py-2 font-medium text-right">Effort</th>
                <th scope="col" className="px-3 py-2 font-medium text-right">RICE</th>
                <th scope="col" className="px-3 py-2 font-medium">You</th>
                <th scope="col" className="px-3 py-2 font-medium">Optimal</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item) => (
                <tr key={item.id} className="border-b border-[var(--border)] last:border-0">
                  <th scope="row" className="px-3 py-2 font-normal text-text-primary">{item.title}</th>
                  <td className="px-3 py-2 text-right font-mono tabular-nums text-text-secondary">{fmt(value(item))}</td>
                  <td className="px-3 py-2 text-right font-mono tabular-nums text-text-secondary">{item.effort}</td>
                  <td className="px-3 py-2 text-right font-mono tabular-nums text-text-primary">{fmt(riceScore(item))}</td>
                  <td className="px-3 py-2 text-text-secondary">{result.picked.includes(item.id) ? '✓ picked' : '—'}</td>
                  <td className="px-3 py-2 text-text-primary">{result.optimal.includes(item.id) ? '✓ build' : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
