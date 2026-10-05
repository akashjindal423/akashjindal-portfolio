import { describe, expect, it } from 'vitest'
import {
  CATEGORIES,
  FACTS,
  REGIONS,
  SUGGESTED_QUESTIONS,
  ask,
  parseQuestion,
  runQuery,
  totals,
  type AskOutcome,
  type FactRow,
  type GenBiResult,
  type Query,
} from './genbi'

function answer(question: string): GenBiResult {
  const outcome = ask(question)
  if (outcome.kind !== 'answer') throw new Error(`Expected an answer for "${question}", got ${JSON.stringify(outcome)}`)
  return outcome.result
}

function clarify(question: string): string[] {
  const outcome: AskOutcome = ask(question)
  if (outcome.kind !== 'clarify') throw new Error(`Expected a clarification for "${question}", got ${JSON.stringify(outcome)}`)
  expect(outcome).not.toHaveProperty('result')
  expect(outcome.issues.length).toBeGreaterThan(0)
  return outcome.issues
}

const sumBy = <K extends string | number>(rows: readonly FactRow[], key: (r: FactRow) => K, field: keyof Omit<FactRow, 'month' | 'region' | 'category'>) => {
  const out = new Map<K, number>()
  for (const r of rows) out.set(key(r), (out.get(key(r)) ?? 0) + r[field])
  return [...out.values()].reduce((a, b) => a + b, 0)
}

describe('fact table', () => {
  it('has one row per month, region and category', () => {
    expect(FACTS).toHaveLength(12 * REGIONS.length * CATEGORIES.length)
    const keys = new Set(FACTS.map((r) => `${r.month}|${r.region}|${r.category}`))
    expect(keys.size).toBe(FACTS.length)
  })

  it('holds whole, non-negative numbers with online revenue and returns inside their totals', () => {
    for (const r of FACTS) {
      for (const v of [r.revenue, r.onlineRevenue, r.orders, r.units, r.returnedUnits]) {
        expect(Number.isInteger(v)).toBe(true)
        expect(v).toBeGreaterThanOrEqual(0)
      }
      expect(r.onlineRevenue).toBeLessThanOrEqual(r.revenue)
      expect(r.returnedUnits).toBeLessThanOrEqual(r.units)
    }
  })

  it.each(['revenue', 'onlineRevenue', 'orders', 'units', 'returnedUnits'] as const)(
    'reconciles %s across region, category, month and quarter',
    (field) => {
      const total = totals(FACTS)[field]
      expect(sumBy(FACTS, (r) => r.region, field)).toBe(total)
      expect(sumBy(FACTS, (r) => r.category, field)).toBe(total)
      expect(sumBy(FACTS, (r) => r.month, field)).toBe(total)
      expect(sumBy(FACTS, (r) => Math.floor(r.month / 3), field)).toBe(total)
    },
  )

  it('gives the same yearly revenue in every view the demo can draw', () => {
    const total = totals(FACTS).revenue
    for (const q of [
      'Revenue by region in 2025',
      'Revenue by category in 2025',
      'How did monthly revenue trend in 2025?',
      'Revenue by quarter in 2025',
      'Compare online vs in-store revenue in 2025',
    ]) {
      const r = answer(q)
      expect(r.data.reduce((t, d) => t + d.value, 0), q).toBe(total)
    }
    expect(answer('What was revenue in 2025?').data[0].value).toBe(total)
  })
})

describe('required cases', () => {
  it('answers "Which region had the lowest revenue in Q1 2025?" from the fact table', () => {
    const r = answer('Which region had the lowest revenue in Q1 2025?')
    expect(r.query).toMatchObject<Partial<Query>>({
      metric: 'revenue',
      groupBy: 'region',
      sort: 'asc',
      rank: 'lowest',
      limit: null,
      filters: { regions: [], categories: [], channel: null },
    })
    expect(r.query.period).toMatchObject({ from: 0, to: 2, label: 'Q1 2025', defaulted: false, yearAssumed: false })

    const q1 = FACTS.filter((f) => f.month <= 2)
    const byRegion = REGIONS.map((region) => ({ region, revenue: totals(q1.filter((f) => f.region === region)).revenue }))
    const lowest = byRegion.reduce((a, b) => (b.revenue < a.revenue ? b : a))
    expect(r.data[0]).toEqual({ label: lowest.region, value: lowest.revenue })
    expect(r.highlight).toEqual([0])
    expect(r.answer.startsWith(`${lowest.region} had the lowest revenue in Q1 2025`)).toBe(true)
    expect(r.data.map((d) => d.value)).toEqual([...r.data.map((d) => d.value)].sort((a, b) => a - b))
  })

  it.each(['What was revenue in 2024?', 'Which region had the highest revenue in Q4 2024?', 'How did 2024 compare with 2025?'])(
    'asks for clarification on a 2024 question: %s',
    (q) => {
      expect(clarify(q).join(' ')).toMatch(/only has data for 2025.*2024/)
    },
  )

  it.each(['Which region made the most profit in 2025?', 'What was the profit margin on Kitchen?', 'Show profit by month'])(
    'asks for clarification on a profit question: %s',
    (q) => {
      expect(clarify(q).join(' ')).toMatch(/“profit”.*(isn’t|aren’t) in this dataset/)
    },
  )

  it.each(['excluding December', 'What was total revenue in 2025 excluding December?', 'Revenue by region, excluding December'])(
    'asks for clarification on an exclusion: %s',
    (q) => {
      expect(clarify(q).join(' ')).toMatch(/Exclusions and negation \(“excluding”\) aren’t supported/)
    },
  )
})

describe('parsing into an explicit query', () => {
  it('answers every suggested question', () => {
    for (const q of SUGGESTED_QUESTIONS) expect(ask(q).kind, q).toBe('answer')
  })

  it.each<[string, Partial<Query>]>([
    ['Which region had the highest revenue in Q4 2025?', { metric: 'revenue', groupBy: 'region', sort: 'desc', rank: 'highest' }],
    ['How did monthly revenue trend in 2025?', { metric: 'revenue', groupBy: 'month', sort: 'time', rank: null }],
    ['What were the top 3 product categories by revenue in 2025?', { metric: 'revenue', groupBy: 'category', sort: 'desc', limit: 3 }],
    ['Which category had the highest return rate in 2025?', { metric: 'return_rate', groupBy: 'category', sort: 'desc' }],
    ['What share of revenue came from online each month in 2025?', { metric: 'online_share', groupBy: 'month', sort: 'time' }],
    ['How did average order value change across 2025?', { metric: 'aov', groupBy: 'month', sort: 'time' }],
    ['Which month had the most orders in 2025?', { metric: 'orders', groupBy: 'month', sort: 'desc', rank: 'highest' }],
    ['What was online revenue in Q4 2025?', { metric: 'revenue', groupBy: 'none', filters: { regions: [], categories: [], channel: 'online' } }],
    ['Compare online vs in-store revenue in 2025', { metric: 'revenue', groupBy: 'channel' }],
    ['North vs South revenue in Q2 2025', { groupBy: 'region', filters: { regions: ['North', 'South'], categories: [], channel: null } }],
    ['What were Kitchen sales in the North in H1 2025?', { groupBy: 'none', filters: { regions: ['North'], categories: ['Kitchen'], channel: null } }],
    ['Bottom 2 categories by online share in 2025', { metric: 'online_share', groupBy: 'category', sort: 'asc', limit: 2 }],
  ])('%s', (question, expected) => {
    const parsed = parseQuestion(question)
    expect(parsed.ok).toBe(true)
    if (parsed.ok) expect(parsed.query).toMatchObject(expected)
  })

  it.each<[string, number, number, string]>([
    ['Revenue in Q2 2025', 3, 5, 'Q2 2025'],
    ['Revenue in March 2025', 2, 2, 'March 2025'],
    ['Revenue from January to March 2025', 0, 2, 'January to March 2025'],
    ['Revenue between March and May 2025', 2, 4, 'March to May 2025'],
    ['Revenue in H2 2025', 6, 11, 'H2 2025'],
    ['Revenue in the second quarter of 2025', 3, 5, 'Q2 2025'],
    ['Revenue from Q1 to Q3 2025', 0, 8, 'Q1 to Q3 2025'],
    ['Revenue in the last quarter of 2025', 9, 11, 'Q4 2025'],
    ['What was revenue in 2025?', 0, 11, '2025'],
  ])('reads the period in "%s"', (question, from, to, label) => {
    const parsed = parseQuestion(question)
    expect(parsed.ok).toBe(true)
    if (parsed.ok) expect(parsed.query.period).toMatchObject({ from, to, label })
  })

  it('flags an assumed year and a defaulted period in the scope', () => {
    expect(answer('Revenue by region in June').scope.find((s) => s.label === 'Date range')?.value).toMatch(/year not stated/)
    expect(answer('Which month had the most orders?').scope.find((s) => s.label === 'Date range')?.value).toMatch(/no period given/)
  })

  it('does not read "May I…" as the month of May', () => {
    const r = answer('May I see revenue by region in June 2025?')
    expect(r.query.period).toMatchObject({ from: 5, to: 5 })
  })
})

describe('clarifies instead of substituting a different question', () => {
  it.each<[string, RegExp]>([
    ['Which region had the highest revenue last quarter?', /“last quarter” is relative/],
    ['What was revenue this year?', /“this year” is relative/],
    ['How did online do in Q4 2025?', /online share of revenue/],
    ['Revenue and orders by region in 2025', /more than one measure/],
    ['Revenue by region and month', /more than one breakdown/],
    ['Revenue in Q1 and Q4 2025', /more than one period/],
    ['What were orders in London?', /“London” isn’t a region/],
    ['How much bedding did we sell?', /“Bedding” isn’t a category/],
    ['Which category has the best return rate?', /“best” and “worst” are ambiguous/],
    ['Which categories did not sell well?', /negation \(“not”\)/],
    ["Which regions didn't hit target?", /negation/],
    ['What was average monthly revenue?', /only average the demo knows/],
    ['Top 10 regions by revenue', /only 4 regions/],
    ['How did revenue grow in 2025?', /Growth calculations/],
    ['Why did Garden sales fall?', /can’t explain why/],
    ['Forecast revenue for next year', /no forecasts/],
    ['Weekly revenue in 2025', /monthly/],
    ['What was the highest revenue in 2025?', /needs something to compare/],
    ['Online orders in 2025', /only available for revenue/],
    ['Regions with revenue over £500k', /Thresholds/],
    ['Q5 revenue', /no Q5/],
    ['hello', /couldn’t tell which measure/],
  ])('%s', (question, pattern) => {
    expect(clarify(question).join(' ')).toMatch(pattern)
  })

  it('returns nothing for a blank question', () => {
    expect(ask('')).toEqual({ kind: 'empty' })
    expect(ask('   ')).toEqual({ kind: 'empty' })
  })
})

describe('answers', () => {
  it('always show the interpreted scope: metric, date range, grouping, filters and sort', () => {
    for (const q of [...SUGGESTED_QUESTIONS, 'What were Kitchen sales in the North in H1 2025?']) {
      const r = answer(q)
      expect(r.scope.map((s) => s.label)).toEqual(['Metric', 'Date range', 'Grouping', 'Filters', 'Sort'])
      for (const s of r.scope) expect(s.value.length).toBeGreaterThan(0)
    }
    const filtered = answer('What were Kitchen sales in the North in H1 2025?')
    expect(filtered.scope.find((s) => s.label === 'Filters')?.value).toBe('Region: North · Category: Kitchen')
    expect(filtered.sql).toContain("region IN ('North')")
    expect(filtered.sql).toContain("category IN ('Kitchen')")
    expect(filtered.sql).toContain("month BETWEEN '2025-01' AND '2025-06'")
  })

  it('computes ratio metrics from summed components, not averaged ratios', () => {
    const t = totals(FACTS)
    expect(answer('What was average order value in 2025?').data[0].value).toBeCloseTo(t.revenue / t.orders, 10)
    expect(answer('What was the return rate in 2025?').data[0].value).toBeCloseTo((t.returnedUnits / t.units) * 100, 10)
    expect(answer('What share of revenue came from online in 2025?').data[0].value).toBeCloseTo((t.onlineRevenue / t.revenue) * 100, 10)
  })

  it('is deterministic', () => {
    for (const q of SUGGESTED_QUESTIONS) expect(ask(q)).toEqual(ask(q))
  })

  it('limits a top-N ranking to N rows', () => {
    const r = answer('What were the top 3 product categories by revenue in 2025?')
    expect(r.data).toHaveLength(3)
    expect(r.sql).toContain('LIMIT 3')
  })

  it('runs a query directly', () => {
    const parsed = parseQuestion('Revenue by region in Q4 2025')
    expect(parsed.ok).toBe(true)
    if (parsed.ok) expect(runQuery(parsed.query).data).toHaveLength(REGIONS.length)
  })
})
