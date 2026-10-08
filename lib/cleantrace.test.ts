import { describe, expect, it } from 'vitest'
import { CoverageGrid, DONE_FRACTION, brushRadius, interpolate, shouldAutoPlay } from './cleantrace'

describe('shouldAutoPlay', () => {
  const base = { pathname: '/', seen: false, desktop: true, reducedMotion: false }

  it('plays on a first desktop visit to the homepage', () => {
    expect(shouldAutoPlay(base)).toBe(true)
  })

  it('never plays twice', () => {
    expect(shouldAutoPlay({ ...base, seen: true })).toBe(false)
  })

  it('never plays on other pages', () => {
    for (const pathname of ['/about', '/projects/google-maps-teardown', '/lab', '/contact']) {
      expect(shouldAutoPlay({ ...base, pathname })).toBe(false)
    }
  })

  it('never plays on phones or touch-only devices', () => {
    expect(shouldAutoPlay({ ...base, desktop: false })).toBe(false)
  })

  it('never plays when reduced motion is set', () => {
    expect(shouldAutoPlay({ ...base, reducedMotion: true })).toBe(false)
  })
})

describe('CoverageGrid', () => {
  it('starts empty', () => {
    expect(new CoverageGrid(320, 160).fraction).toBe(0)
  })

  it('counts each cell once, however often it is swept', () => {
    const grid = new CoverageGrid(320, 160, 16)
    const once = grid.sweep(100, 80, 40)
    const twice = grid.sweep(100, 80, 40)
    expect(once).toBeGreaterThan(0)
    expect(twice).toBe(once)
  })

  it('ignores sweeps outside the viewport', () => {
    const grid = new CoverageGrid(320, 160, 16)
    expect(grid.sweep(-500, -500, 40)).toBe(0)
  })

  it('reaches the done threshold when the whole area is swept', () => {
    const grid = new CoverageGrid(320, 160, 16)
    for (let y = 0; y <= 160; y += 20) for (let x = 0; x <= 320; x += 20) grid.sweep(x, y, 30)
    expect(grid.fraction).toBeGreaterThanOrEqual(DONE_FRACTION)
    expect(grid.fraction).toBeLessThanOrEqual(1)
  })
})

describe('interpolate', () => {
  it('fills the gap between two distant points', () => {
    const points = interpolate({ x: 0, y: 0 }, { x: 100, y: 0 }, 10)
    expect(points).toHaveLength(10)
    expect(points.at(-1)).toEqual({ x: 100, y: 0 })
  })

  it('returns the end point for a tiny move', () => {
    expect(interpolate({ x: 5, y: 5 }, { x: 6, y: 5 }, 10)).toEqual([{ x: 6, y: 5 }])
  })
})

describe('brushRadius', () => {
  it('is smaller on narrow screens', () => {
    expect(brushRadius(390)).toBeLessThan(brushRadius(1440))
  })
})
