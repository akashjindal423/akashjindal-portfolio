import { describe, expect, it } from 'vitest'
import { counts, overallScore, recordedScores, scoreTotal, terminalRows, typeFor } from './promptlab-example'

describe('PromptLab recorded example', () => {
  it('derives each status from its score', () => {
    expect(typeFor(1)).toBe('critical')
    expect(typeFor(2)).toBe('low')
    expect(typeFor(3)).toBe('medium')
    expect(typeFor(4)).toBe('good')
    expect(typeFor(5)).toBe('good')
  })

  it('counts the rows by status', () => {
    expect(counts).toEqual({ critical: 6, low: 4, medium: 1, good: 1 })
    expect(counts.critical + counts.low + counts.medium + counts.good).toBe(terminalRows.length)
  })

  it('uses the unweighted mean of the 12 scores as the overall score', () => {
    expect(recordedScores).toHaveLength(12)
    expect(scoreTotal).toBe(21)
    expect(overallScore.toFixed(2)).toBe('1.75')
  })
})
