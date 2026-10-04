/**
 * The recorded `promptlab analyse` example shown on /projects/promptlab.
 * Status, counts and the overall score are all derived from the scores below,
 * so the summary line can't drift from the table.
 */
export type RowType = 'critical' | 'low' | 'medium' | 'good'
export const STATUS: Record<RowType, string> = { critical: '⚠ CRITICAL', low: '▲ LOW', medium: '● MEDIUM', good: '✓ GOOD' }
export const typeFor = (score: number): RowType => (score <= 1 ? 'critical' : score === 2 ? 'low' : score === 3 ? 'medium' : 'good')

export const recordedScores: { dim: string; score: number }[] = [
  { dim: 'Role Definition', score: 1 },
  { dim: 'Task Clarity', score: 2 },
  { dim: 'Output Format', score: 1 },
  { dim: 'Input Specification', score: 1 },
  { dim: 'Constraints', score: 2 },
  { dim: 'Examples (Few-shot)', score: 1 },
  { dim: 'Tone & Style', score: 2 },
  { dim: 'Edge Cases', score: 1 },
  { dim: 'Reasoning Instructions', score: 1 },
  { dim: 'Context Management', score: 2 },
  { dim: 'Specificity Balance', score: 3 },
  { dim: 'Token Efficiency', score: 4 },
]
export const terminalRows = recordedScores.map((r) => ({ ...r, type: typeFor(r.score) }))
export const scoreTotal = recordedScores.reduce((t, r) => t + r.score, 0)
/** Unweighted mean of the dimension scores */
export const overallScore = scoreTotal / recordedScores.length
const countOf = (type: RowType) => terminalRows.filter((r) => r.type === type).length
export const counts = { critical: countOf('critical'), low: countOf('low'), medium: countOf('medium'), good: countOf('good') }
