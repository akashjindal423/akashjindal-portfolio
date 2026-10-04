import { describe, expect, it } from 'vitest'
import { formatRice, proposal, rankedProposals, riceFormula, riceScore } from './rice'

describe('Google Maps teardown RICE scores', () => {
  it.each([
    ['A', '6.17', '(8 × 9 × 0.6) ÷ 7'],
    ['B', '5.51', '(9 × 7 × 0.7) ÷ 8'],
    ['C', '8.64', '(6 × 9 × 0.8) ÷ 5'],
  ] as const)('proposal %s scores %s', (id, score, formula) => {
    expect(formatRice(riceScore(proposal(id)))).toBe(score)
    expect(riceFormula(proposal(id))).toBe(formula)
  })

  it('ranks C, then A, then B', () => {
    expect(rankedProposals().map((p) => p.id)).toEqual(['C', 'A', 'B'])
  })
})
