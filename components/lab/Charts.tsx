'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import type { DataPoint, GenBiResult, Unit } from '@/lib/lab/genbi'
import { formatTick, formatValue } from '@/lib/lab/genbi'

/*
 * Lightweight SVG charts for the Gen BI demo (no chart library).
 *
 * Colour: a colour-blind-safe categorical palette (dark-mode steps, fixed order).
 * Series differ by hue, never by two shades of one hue. Every chart here is a single
 * series, so it takes slot 1 and the title names it. The point the answer is about
 * is marked with a second hue from the same palette (slot 4) AND a direct value
 * label, plus a key, so colour is never the only cue.
 *
 * Validated with the dataviz palette checker on #0E0F12, #16181D and #1D2026:
 * #3987e5 vs #c98500 passes lightness band, chroma, CVD separation (worst ΔE 27.4,
 * protanopia) and the normal-vision floor (ΔE 30.7), and both marks clear 3:1.
 */
export const CHART_PALETTE = ['#3987e5', '#d95926', '#199e70', '#c98500', '#d55181', '#008300', '#9085e9', '#e66767'] as const
const COLOR_SERIES = CHART_PALETTE[0]
const COLOR_HIGHLIGHT = CHART_PALETTE[3]
const SURFACE = '#16181D'
const GRID = '#2A2E37'

const HEIGHT = 240
const MARGIN = { top: 28, right: 12, bottom: 30, left: 52 }

interface ChartProps {
  title: string
  data: DataPoint[]
  unit: Unit
  /** Indexes of the points the answer is about */
  highlight: number[]
}

/** Tracks the rendered width so text stays at its real size instead of being scaled by a viewBox. */
function useWidth<T extends HTMLElement>(fallback = 560) {
  const ref = useRef<T>(null)
  const [width, setWidth] = useState(fallback)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setWidth(Math.max(260, Math.round(entry.contentRect.width))))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, width] as const
}

/** While a tooltip is showing, Escape hides it (WCAG 1.4.13), whether it came from hover or focus. */
function useEscapeToDismiss(active: number | null, dismiss: () => void) {
  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [active, dismiss])
}

/** Axis maximum giving four clean tick steps, e.g. 1,120 -> 1,200 (300 per step). */
function niceMax(max: number) {
  const rough = max / 4
  const mag = Math.pow(10, Math.floor(Math.log10(rough)))
  const step = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find((s) => s * mag >= rough) ?? 10
  return step * mag * 4
}

const tickLabel = formatTick

/** Title plus a key for the highlight colour, so the emphasis is never colour alone. */
function ChartHeading({ id, title, highlighted }: { id: string; title: string; highlighted: boolean }) {
  return (
    <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <figcaption id={id} className="text-sm font-medium text-text-primary">{title}</figcaption>
      {highlighted && (
        <p className="flex items-center gap-1.5 text-xs text-text-secondary">
          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: COLOR_HIGHLIGHT }} aria-hidden="true" />
          Labelled: what the answer is about
        </p>
      )}
    </div>
  )
}

function Frame({
  width,
  yMax,
  unit,
  children,
}: {
  width: number
  yMax: number
  unit: Unit
  children: React.ReactNode
}) {
  const innerH = HEIGHT - MARGIN.top - MARGIN.bottom
  const ticks = [0, 1, 2, 3, 4].map((i) => (yMax / 4) * i)
  return (
    <>
      {ticks.map((t) => {
        const y = MARGIN.top + innerH - (t / yMax) * innerH
        return (
          <g key={t}>
            <line x1={MARGIN.left} x2={width - MARGIN.right} y1={y} y2={y} stroke={GRID} strokeWidth={1} />
            <text x={MARGIN.left - 8} y={y} dy="0.32em" textAnchor="end" className="fill-text-subtle text-[11px] tabular-nums">
              {tickLabel(t, unit)}
            </text>
          </g>
        )
      })}
      {children}
    </>
  )
}

function Tooltip({
  x,
  y,
  label,
  value,
  width,
  placement = 'above',
}: {
  x: number
  y: number
  label: string
  value: string
  width: number
  placement?: 'above' | 'right'
}) {
  // Keep the tooltip inside the chart horizontally
  const style =
    placement === 'above'
      ? { left: Math.min(Math.max(x, 64), width - 64), top: y - 10 }
      : { left: Math.min(x + 12, width - 112), top: y }
  return (
    <div
      className={`pointer-events-none absolute z-10 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 shadow-elevated ${
        placement === 'above' ? '-translate-x-1/2 -translate-y-full' : '-translate-y-1/2'
      }`}
      style={style}
      role="presentation"
    >
      <p className="text-sm font-semibold text-text-primary tabular-nums whitespace-nowrap">{value}</p>
      <p className="text-xs text-text-secondary whitespace-nowrap">{label}</p>
    </div>
  )
}

/** The same data as a table: the chart's keyboard and screen-reader fallback. */
export function DataTable({ title, data, unit, highlight }: ChartProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
      <table className="w-full text-left text-sm">
        <caption className="px-3 py-2 text-left text-sm font-medium text-text-primary">{title}</caption>
        <thead>
          <tr className="border-y border-[var(--border)] bg-[var(--surface-raised)] text-xs uppercase tracking-wider text-text-subtle">
            <th scope="col" className="px-3 py-2 font-medium">Item</th>
            <th scope="col" className="px-3 py-2 text-right font-medium">Value</th>
            <th scope="col" className="px-3 py-2 font-medium"><span className="sr-only">Answer</span></th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={d.label} className="border-b border-[var(--border)] last:border-0">
              <th scope="row" className="px-3 py-1.5 font-normal text-text-secondary">{d.label}</th>
              <td className="px-3 py-1.5 text-right text-text-primary tabular-nums">{formatValue(d.value, unit)}</td>
              <td className="px-3 py-1.5 text-xs text-highlight">{highlight.includes(i) && highlight.length < data.length ? 'answer' : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Horizontal bars: category labels read left to right at any width. */
export function BarChart({ title, data, unit, highlight }: ChartProps) {
  const [ref, width] = useWidth<HTMLDivElement>()
  const [active, setActive] = useState<number | null>(null)
  const titleId = useId()
  const ROW = 36
  const BAR = 20 // <= 24px thick
  const labelW = Math.min(96, Math.max(...data.map((d) => d.label.length)) * 7 + 12)
  const m = { top: 4, right: 56, bottom: 26, left: labelW }
  const innerW = width - m.left - m.right
  const height = m.top + ROW * data.length + m.bottom
  const xMax = niceMax(Math.max(...data.map((d) => d.value)))
  const ticks = [0, 1, 2, 3, 4].map((i) => (xMax / 4) * i)
  const axisY = m.top + ROW * data.length
  const hintId = `${titleId}-hint`
  const dismiss = useCallback(() => setActive(null), [])
  useEscapeToDismiss(active, dismiss)

  const bars = data.map((d, i) => {
    const w = (d.value / xMax) * innerW
    const y = m.top + ROW * i + (ROW - BAR) / 2
    return { ...d, w, y, end: m.left + w }
  })

  return (
    <figure className="m-0">
      <ChartHeading id={titleId} title={title} highlighted={highlight.length > 0 && highlight.length < data.length} />
      <div ref={ref} className="relative w-full">
        <svg width={width} height={height} role="group" aria-labelledby={titleId} aria-describedby={hintId} className="block max-w-full overflow-visible">
          {ticks.map((t) => {
            const x = m.left + (t / xMax) * innerW
            return (
              <g key={t}>
                <line x1={x} x2={x} y1={m.top} y2={axisY} stroke={GRID} strokeWidth={1} />
                <text x={x} y={axisY + 16} textAnchor="middle" className="fill-text-subtle text-[11px] tabular-nums">
                  {tickLabel(t, unit)}
                </text>
              </g>
            )
          })}
          {bars.map((b, i) => {
            const r = Math.min(4, b.w)
            // When every bar is the answer (top N), all stay in the series hue and all carry labels
            const fill = highlight.includes(i) && highlight.length < data.length ? COLOR_HIGHLIGHT : COLOR_SERIES
            return (
              <g key={b.label}>
                <text x={m.left - 10} y={b.y + BAR / 2} dy="0.32em" textAnchor="end" className="fill-text-secondary text-xs">
                  {b.label}
                </text>
                {/* 4px rounded data-end, square at the baseline */}
                <path
                  d={`M${m.left},${b.y} H${b.end - r} Q${b.end},${b.y} ${b.end},${b.y + r} V${b.y + BAR - r} Q${b.end},${b.y + BAR} ${b.end - r},${b.y + BAR} H${m.left} Z`}
                  fill={fill}
                  opacity={active === null || active === i ? 1 : 0.75}
                />
                {highlight.includes(i) && (
                  <text x={b.end + 8} y={b.y + BAR / 2} dy="0.32em" className="fill-text-primary text-xs font-semibold tabular-nums">
                    {formatValue(b.value, unit)}
                  </text>
                )}
                {/* Hit target: the whole row, bigger than the bar */}
                <rect
                  x={0}
                  y={m.top + ROW * i}
                  width={width}
                  height={ROW}
                  fill="transparent"
                  tabIndex={0}
                  role="img"
                  aria-label={`${b.label}: ${formatValue(b.value, unit)}`}
                  className="cursor-default outline-none focus-visible:stroke-violet-400 focus-visible:[stroke-width:2px]"
                  onPointerEnter={() => setActive(i)}
                  onPointerLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setActive(null)
                  }}
                />
              </g>
            )
          })}
        </svg>
        {active !== null && (
          <Tooltip
            x={bars[active].end}
            y={bars[active].y + BAR / 2}
            width={width}
            placement="right"
            label={bars[active].label}
            value={formatValue(bars[active].value, unit)}
          />
        )}
        <p id={hintId} className="sr-only">
          Use Tab to move through the bars and hear each value. Press Escape to hide the tooltip.
        </p>
      </div>
    </figure>
  )
}

export function LineChart({ title, data, unit, highlight }: ChartProps) {
  const [ref, width] = useWidth<HTMLDivElement>()
  const [active, setActive] = useState<number | null>(null)
  const titleId = useId()
  const innerW = width - MARGIN.left - MARGIN.right
  const innerH = HEIGHT - MARGIN.top - MARGIN.bottom
  const yMax = niceMax(Math.max(...data.map((d) => d.value)))
  const baseline = MARGIN.top + innerH
  const step = innerW / (data.length - 1)
  const pts = data.map((d, i) => ({ ...d, x: MARGIN.left + step * i, y: baseline - (d.value / yMax) * innerH }))
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x},${p.y}`).join(' ')
  const area = `${line} L${pts[pts.length - 1].x},${baseline} L${pts[0].x},${baseline} Z`
  // Thin out x labels when space is tight
  const labelEvery = step < 34 ? 2 : 1
  const hls = highlight.map((i) => pts[i]).filter(Boolean)

  function nearest(clientX: number, rect: DOMRect) {
    const x = clientX - rect.left - MARGIN.left
    return Math.max(0, Math.min(data.length - 1, Math.round(x / step)))
  }

  const dismiss = useCallback(() => setActive(null), [])
  useEscapeToDismiss(active, dismiss)

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault()
      setActive(e.key === 'Home' ? 0 : data.length - 1)
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      const dir = e.key === 'ArrowRight' ? 1 : -1
      setActive((a) => Math.max(0, Math.min(data.length - 1, (a ?? (dir > 0 ? -1 : data.length)) + dir)))
    } else if (e.key === 'Escape') {
      setActive(null)
    }
  }

  const a = active === null ? null : pts[active]

  return (
    <figure className="m-0">
      <ChartHeading id={titleId} title={title} highlighted={highlight.length > 0 && highlight.length < data.length} />
      <div ref={ref} className="relative w-full">
        <svg
          width={width}
          height={HEIGHT}
          role="group"
          aria-labelledby={titleId}
          aria-describedby={`${titleId}-hint`}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onBlur={() => setActive(null)}
          className="block max-w-full overflow-visible rounded-md outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60"
        >
          <Frame width={width} yMax={yMax} unit={unit}>
            <path d={area} fill={COLOR_SERIES} opacity={0.1} />
            <path d={line} fill="none" stroke={COLOR_SERIES} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
            {pts.map((p, i) =>
              i % labelEvery === 0 || i === data.length - 1 ? (
                <text key={p.label} x={p.x} y={baseline + 18} textAnchor="middle" className="fill-text-secondary text-xs">
                  {p.label}
                </text>
              ) : null,
            )}
            {a && <line x1={a.x} x2={a.x} y1={MARGIN.top} y2={baseline} stroke="#8D939E" strokeWidth={1} />}
            {/* Highlighted points: dot with a 2px surface ring and a direct label */}
            {hls.map((hl) => (
              <g key={hl.label}>
                <circle cx={hl.x} cy={hl.y} r={5} fill={COLOR_HIGHLIGHT} stroke={SURFACE} strokeWidth={2} />
                <text
                  x={Math.max(MARGIN.left + 24, Math.min(hl.x, width - MARGIN.right - 24))}
                  y={hl.y - 12}
                  textAnchor="middle"
                  className="fill-text-primary text-xs font-semibold tabular-nums"
                >
                  {formatValue(hl.value, unit)}
                </text>
              </g>
            ))}
            {a && active !== null && !highlight.includes(active) && <circle cx={a.x} cy={a.y} r={4} fill={COLOR_SERIES} stroke={SURFACE} strokeWidth={2} />}
            {/* Crosshair capture layer: snaps to the nearest month */}
            <rect
              x={MARGIN.left - step / 2}
              y={MARGIN.top}
              width={innerW + step}
              height={innerH}
              fill="transparent"
              onPointerMove={(e) => setActive(nearest(e.clientX, e.currentTarget.ownerSVGElement!.getBoundingClientRect()))}
              onPointerLeave={() => setActive(null)}
            />
          </Frame>
        </svg>
        <p id={`${titleId}-hint`} className="sr-only">
          Use the left and right arrow keys (or Home and End) to read each point. Press Escape to hide the tooltip.
        </p>
        {a && <Tooltip x={a.x} y={a.y} width={width} label={a.label} value={formatValue(a.value, unit)} />}
        <p className="sr-only" aria-live="polite">
          {a ? `${a.label}: ${formatValue(a.value, unit)}` : ''}
        </p>
      </div>
    </figure>
  )
}

/** A single total: no chart, just the figure. */
export function StatTile({ title, data, unit }: Omit<ChartProps, 'highlight'>) {
  return (
    <figure className="m-0 rounded-lg border border-[var(--border)] bg-[var(--background)] p-5">
      <figcaption className="text-sm font-medium text-text-secondary">{title}</figcaption>
      <p className="mt-2 text-3xl font-bold text-text-primary tabular-nums">{formatValue(data[0].value, unit)}</p>
    </figure>
  )
}

export type ChartView = 'chart' | 'table'

/**
 * The answer's chart, with a Chart / Table switch. The table view is the fallback for
 * keyboard, screen-reader and colour-independent reading. Pass `view` to keep the
 * visitor's choice across answers.
 */
export function GenBiChart({
  result,
  view: controlledView,
  onViewChange,
}: {
  result: GenBiResult
  view?: ChartView
  onViewChange?: (view: ChartView) => void
}) {
  const [ownView, setOwnView] = useState<ChartView>('chart')
  const view = controlledView ?? ownView
  const setView = onViewChange ?? setOwnView
  const props = { title: result.title, data: result.data, unit: result.unit, highlight: result.highlight }
  if (result.chart === 'stat') return <StatTile {...props} />
  return (
    <div>
      <div role="group" aria-label="Show the answer as" className="mb-3 inline-flex rounded-lg border border-[var(--border)] p-0.5 text-xs">
        {(['chart', 'table'] as const).map((v) => (
          <button
            key={v}
            type="button"
            aria-pressed={view === v}
            onClick={() => setView(v)}
            className="rounded-md px-3 py-1 font-medium capitalize text-text-secondary hover:text-text-primary aria-pressed:bg-[var(--surface-raised)] aria-pressed:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          >
            {v}
          </button>
        ))}
      </div>
      {view === 'table' ? (
        <DataTable {...props} />
      ) : result.chart === 'bar' ? (
        <BarChart {...props} />
      ) : (
        <LineChart {...props} />
      )}
    </div>
  )
}
