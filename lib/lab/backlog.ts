/**
 * Backlog prioritisation game. Eight items for a fictional grocery-delivery app,
 * each with RICE inputs, and a fixed team capacity.
 *
 * Modelled value = Reach x Impact x Confidence. Effort is the cost.
 * RICE score = modelled value / effort, i.e. modelled value per person-week.
 * The player's result is a modelled score on fictional data: their plan's total
 * modelled value as a share of the best plan's. It is not value delivered.
 * The RICE-optimal set is the selection with the most total modelled value that fits in
 * capacity (a small knapsack, solved exactly by checking all 256 subsets).
 * Ranking by RICE score and filling from the top is a good heuristic, but it is
 * not always optimal, which is the point of the game.
 */

export const PRODUCT = 'Pantry'
export const PRODUCT_BLURB = 'a fictional grocery-delivery app'
export const CAPACITY = 10 // person-weeks this quarter
export const ROUND_SECONDS = 60

export interface BacklogItem {
  id: string
  title: string
  /** Users reached per quarter */
  reach: number
  /** 0.25 minimal, 0.5 low, 1 medium, 2 high, 3 massive */
  impact: number
  /** 0-1 */
  confidence: number
  /** Person-weeks */
  effort: number
}

export const ITEMS: BacklogItem[] = [
  { id: 'saved-cards', title: 'Saved payment cards', reach: 4000, impact: 2, confidence: 0.8, effort: 4 },
  { id: 'dark-mode', title: 'Dark mode', reach: 6000, impact: 0.5, confidence: 1, effort: 2 },
  { id: 'order-status', title: 'Order status notifications', reach: 5000, impact: 1, confidence: 0.8, effort: 3 },
  { id: 'reorder', title: 'One-tap reorder', reach: 3000, impact: 2, confidence: 0.8, effort: 3 },
  { id: 'live-chat', title: 'Live chat support', reach: 1500, impact: 2, confidence: 0.5, effort: 5 },
  { id: 'typo-search', title: 'Search typo tolerance', reach: 7000, impact: 1, confidence: 0.8, effort: 5 },
  { id: 'referrals', title: 'Referral rewards', reach: 2000, impact: 3, confidence: 0.5, effort: 4 },
  { id: 'checkout-a11y', title: 'Checkout accessibility fixes', reach: 1200, impact: 3, confidence: 1, effort: 2 },
]

export const IMPACT_LABEL: Record<number, string> = { 0.25: 'Minimal', 0.5: 'Low', 1: 'Medium', 2: 'High', 3: 'Massive' }

export const value = (i: BacklogItem) => i.reach * i.impact * i.confidence
export const riceScore = (i: BacklogItem) => value(i) / i.effort
export const effortOf = (ids: string[]) => ids.reduce((t, id) => t + byId(id).effort, 0)
export const valueOf = (ids: string[]) => ids.reduce((t, id) => t + value(byId(id)), 0)

function byId(id: string) {
  const item = ITEMS.find((i) => i.id === id)
  if (!item) throw new Error(`Unknown backlog item ${id}`)
  return item
}

/** Exact optimum over every subset. Ties prefer less effort, then fewer items. */
export function optimalSet(): string[] {
  let best: string[] = []
  for (let mask = 0; mask < 1 << ITEMS.length; mask++) {
    const ids = ITEMS.filter((_, i) => mask & (1 << i)).map((i) => i.id)
    if (effortOf(ids) > CAPACITY) continue
    const better =
      valueOf(ids) > valueOf(best) ||
      (valueOf(ids) === valueOf(best) && (effortOf(ids) < effortOf(best) || (effortOf(ids) === effortOf(best) && ids.length < best.length)))
    if (better) best = ids
  }
  return best
}

/** Fill capacity from the top of a ranking, skipping anything that no longer fits. */
function greedy(rank: (i: BacklogItem) => number): string[] {
  const picked: string[] = []
  for (const item of [...ITEMS].sort((a, b) => rank(b) - rank(a))) {
    if (effortOf(picked) + item.effort <= CAPACITY) picked.push(item.id)
  }
  return picked
}

const sameSet = (a: string[], b: string[]) => a.length === b.length && a.every((id) => b.includes(id))
const titles = (ids: string[]) => ids.map((id) => byId(id).title)
const list = (xs: string[]) => (xs.length <= 1 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`)
const weeks = (n: number) => `${n} person-week${n === 1 ? '' : 's'}`

export interface Evaluation {
  picked: string[]
  optimal: string[]
  pickedValue: number
  optimalValue: number
  /** Modelled score: the plan's modelled value as a share of the optimal plan's, 0-100 */
  score: number
  unused: number
  missed: string[]
  extra: string[]
  insights: string[]
}

export function evaluate(picked: string[]): Evaluation {
  const optimal = optimalSet()
  const pickedValue = valueOf(picked)
  const optimalValue = valueOf(optimal)
  const score = Math.round((pickedValue / optimalValue) * 100)
  const unused = CAPACITY - effortOf(picked)
  const missed = optimal.filter((id) => !picked.includes(id))
  const extra = picked.filter((id) => !optimal.includes(id))
  const insights: string[] = []

  if (picked.length === 0) {
    insights.push('Nothing was selected, so the plan scores zero. Even a rough pick beats an empty plan.')
  } else if (sameSet(picked, optimal)) {
    insights.push('You found the RICE-optimal set: the highest modelled value that fits in the team’s capacity.')
  } else {
    if (sameSet(picked, greedy(riceScore))) {
      insights.push(
        `You ranked by RICE score and filled from the top. That is a strong heuristic, but it left ${weeks(unused)} unused. The optimal plan swaps ${list(titles(extra))} for ${list(titles(missed))}, which fit the capacity exactly and score higher in total.`,
      )
    } else if (sameSet(picked, greedy((i) => i.reach))) {
      insights.push('You prioritised by reach. Reach alone ignores impact, confidence and cost, so big-audience items crowded out higher-scoring work.')
    } else if (sameSet(picked, greedy(value))) {
      insights.push('You chose the highest-value items first. Without dividing by effort, a few large items used up the capacity that several cheaper ones would have used better.')
    }
    if (missed.length) {
      insights.push(
        `Skipped from the optimal set: ${missed
          .map((id) => `${byId(id).title} (RICE ${Math.round(riceScore(byId(id))).toLocaleString('en-GB')}, ${byId(id).effort} wks)`)
          .join('; ')}.`,
      )
    }
    if (extra.length) {
      insights.push(
        `Picked but not in the optimal set: ${extra
          .map((id) => `${byId(id).title} (RICE ${Math.round(riceScore(byId(id))).toLocaleString('en-GB')}, ${byId(id).effort} wks)`)
          .join('; ')}.`,
      )
    }
    const lowConfidence = picked.filter((id) => byId(id).confidence <= 0.5)
    if (lowConfidence.length) {
      insights.push(`${list(titles(lowConfidence))} ${lowConfidence.length > 1 ? 'have' : 'has'} only 50% confidence. Low confidence halves the modelled value; that is a cue to run discovery before committing a sprint to ${lowConfidence.length > 1 ? 'them' : 'it'}.`)
    }
    if (unused > 0 && !sameSet(picked, greedy(riceScore))) {
      insights.push(`${weeks(unused)} of capacity went unused.`)
    }
  }
  insights.push('RICE score is modelled value per person-week. The best plan is not always the top of the ranking: it is the combination with the highest modelled value within capacity.')

  return { picked, optimal, pickedValue, optimalValue, score, unused, missed, extra, insights }
}
