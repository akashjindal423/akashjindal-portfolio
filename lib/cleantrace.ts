/**
 * CleanTrace mode: the page loads under a layer of dust that the visitor cleans with
 * the cursor. A nod to Dyson CleanTrace. Pure logic lives here so it can be tested.
 */

/** localStorage key set once the intro has played, so it never auto-plays twice. */
export const STORAGE_KEY = 'akj-cleantrace-seen-v1'

/** Clear by itself after this long without the visitor cleaning. */
export const IDLE_MS = 5000

/** Treat the page as clean once this share of it has been swept. */
export const DONE_FRACTION = 0.8

/** Size in CSS pixels of the cells used to measure how much has been cleaned. */
export const CELL = 16

/** Media query for a desktop-style visitor: precise pointer, hover and a wide screen. */
export const DESKTOP_QUERY = '(pointer: fine) and (hover: hover) and (min-width: 768px)'

export interface AutoPlayContext {
  pathname: string
  /** The intro has already played for this visitor (or storage is unavailable). */
  seen: boolean
  /** Matches DESKTOP_QUERY. */
  desktop: boolean
  /** The visitor has asked the OS to reduce motion. */
  reducedMotion: boolean
}

/**
 * Auto-play only on the homepage, only on a first visit, only on desktop, and never
 * when reduced motion is set. Everywhere else it plays only from the header button.
 */
export function shouldAutoPlay({ pathname, seen, desktop, reducedMotion }: AutoPlayContext): boolean {
  return pathname === '/' && !seen && desktop && !reducedMotion
}

/** Brush radius for a viewport width: smaller on narrow screens. */
export function brushRadius(viewportWidth: number): number {
  return viewportWidth < 520 ? 36 : 48
}

/** Tracks which cells of the viewport have been swept, to report "% clean". */
export class CoverageGrid {
  readonly cols: number
  readonly rows: number
  private readonly cell: number
  private readonly cells: Uint8Array
  private cleaned = 0

  constructor(width: number, height: number, cell = CELL) {
    this.cell = cell
    this.cols = Math.max(1, Math.ceil(width / cell))
    this.rows = Math.max(1, Math.ceil(height / cell))
    this.cells = new Uint8Array(this.cols * this.rows)
  }

  /** Marks every cell whose centre lies within `radius` of (x, y). Returns the cleaned fraction. */
  sweep(x: number, y: number, radius: number): number {
    const { cell, cols, rows } = this
    const c0 = Math.max(0, Math.floor((x - radius) / cell))
    const c1 = Math.min(cols - 1, Math.floor((x + radius) / cell))
    const r0 = Math.max(0, Math.floor((y - radius) / cell))
    const r1 = Math.min(rows - 1, Math.floor((y + radius) / cell))
    const r2 = radius * radius
    for (let r = r0; r <= r1; r++) {
      for (let c = c0; c <= c1; c++) {
        const dx = c * cell + cell / 2 - x
        const dy = r * cell + cell / 2 - y
        if (dx * dx + dy * dy > r2) continue
        const k = r * cols + c
        if (!this.cells[k]) {
          this.cells[k] = 1
          this.cleaned++
        }
      }
    }
    return this.fraction
  }

  get fraction(): number {
    return this.cleaned / this.cells.length
  }
}

/** Points every `step` pixels from a to b (excluding a, including b), so fast moves leave no gaps. */
export function interpolate(
  a: { x: number; y: number },
  b: { x: number; y: number },
  step: number,
): { x: number; y: number }[] {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const n = Math.max(1, Math.ceil(Math.hypot(dx, dy) / step))
  return Array.from({ length: n }, (_, i) => ({ x: a.x + (dx * (i + 1)) / n, y: a.y + (dy * (i + 1)) / n }))
}
