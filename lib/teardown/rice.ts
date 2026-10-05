/**
 * RICE inputs for the three feature proposals in the Google Maps teardown.
 *
 * The scoring is illustrative: every input is the author's own 1–10 estimate from
 * public information, not Google data. Confidence is applied as a fraction
 * (6/10 = 0.6). The tables and the prioritisation summary are all computed from
 * these inputs, so a changed estimate updates every score and the ranking.
 */

export type ProposalId = 'A' | 'B' | 'C'

export interface RiceProposal {
  id: ProposalId
  name: string
  /** 1–10 */
  reach: number
  /** 1–10 */
  impact: number
  /** 1–10, used as a fraction */
  confidence: number
  /** 1–10, higher is more work */
  effort: number
  effortLabel: 'low' | 'medium' | 'high'
  reasons: { reach: string; impact: string; confidence: string; effort: string }
  /** Why it sits where it does in the summary, beyond the score itself */
  note: string
}

export const MAPS_PROPOSALS: RiceProposal[] = [
  {
    id: 'A',
    name: 'Local Guide Creator Fund',
    reach: 8,
    impact: 9,
    confidence: 6,
    effort: 7,
    effortLabel: 'high',
    reasons: {
      reach: 'Affects 30M+ contributors and all Maps users who read reviews',
      impact: 'Directly strengthens Maps’ core competitive moat',
      confidence: 'Revenue share model is proven (YouTube) but untested for Maps',
      effort: 'Requires payment infrastructure, policy framework, abuse prevention',
    },
    note: 'High impact, held back by lower confidence and the payment infrastructure it needs',
  },
  {
    id: 'B',
    name: 'Group Trip Planner',
    reach: 9,
    impact: 7,
    confidence: 7,
    effort: 8,
    effortLabel: 'high',
    reasons: {
      reach: 'Trip planning affects most Maps users; group travel is near-universal',
      impact: 'High engagement + new monetisation, but not core navigation',
      confidence: 'Proven by Wanderlog/TripIt success; Google has all technical primitives',
      effort: 'Real-time collaboration + Ask Maps integration is complex',
    },
    note: 'Highest effort: needs real-time collaboration and AI integration',
  },
  {
    id: 'C',
    name: 'Neighbourhood Intelligence',
    reach: 6,
    impact: 9,
    confidence: 8,
    effort: 5,
    effortLabel: 'medium',
    reasons: {
      reach: 'Relevant at relocation moments (millions/year) but not daily use',
      impact: 'High-value, life-decision product moment',
      confidence: 'All data exists within Google already; Zillow/Rightmove validate demand',
      effort: 'Data aggregation and UI work; no new data collection needed',
    },
    note: 'Lowest effort and highest confidence',
  },
]

/** RICE = (Reach × Impact × Confidence) ÷ Effort, with confidence as a fraction. */
export function riceScore(p: RiceProposal): number {
  return (p.reach * p.impact * (p.confidence / 10)) / p.effort
}

export const formatRice = (score: number) => score.toFixed(2)

export function riceFormula(p: RiceProposal): string {
  return `(${p.reach} × ${p.impact} × ${p.confidence / 10}) ÷ ${p.effort}`
}

export function proposal(id: ProposalId): RiceProposal {
  const found = MAPS_PROPOSALS.find((p) => p.id === id)
  if (!found) throw new Error(`Unknown proposal ${id}`)
  return found
}

/** Proposals ordered by RICE score, highest first. */
export function rankedProposals(): (RiceProposal & { score: number })[] {
  return MAPS_PROPOSALS.map((p) => ({ ...p, score: riceScore(p) })).sort((a, b) => b.score - a.score)
}
