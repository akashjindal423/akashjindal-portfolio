/**
 * Gen BI demo engine. A small synthetic dataset for a fictional retailer and a
 * deterministic keyword matcher that maps a plain-English question to one of six
 * pre-defined "semantic layer" intents. No AI calls and no network: the same
 * question always produces the same chart and answer.
 *
 * All figures are invented for the demo. They do not describe any real company.
 */

export const RETAILER = 'Larkfield Home'
export const RETAILER_BLURB = 'a fictional UK homeware retailer with stores in four regions and an online shop'
export const DATA_YEAR = 2025

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const
export const REGIONS = ['North', 'Midlands', 'South', 'Scotland'] as const
export type Region = (typeof REGIONS)[number]

/** Monthly revenue in £k by region (synthetic). */
const REVENUE_BY_REGION: Record<Region, number[]> = {
  North: [182, 165, 178, 186, 194, 201, 196, 190, 205, 221, 268, 312],
  Midlands: [151, 140, 149, 158, 163, 170, 166, 161, 172, 186, 229, 266],
  South: [214, 198, 212, 224, 236, 247, 241, 233, 249, 262, 318, 371],
  Scotland: [96, 88, 94, 99, 104, 108, 105, 101, 109, 118, 146, 171],
}

/** Annual revenue in £k and return rate (%) by product category (synthetic). */
const CATEGORIES = [
  { name: 'Kitchen', revenue: 2384, returnRate: 4.1 },
  { name: 'Textiles', revenue: 1962, returnRate: 9.6 },
  { name: 'Lighting', revenue: 1517, returnRate: 6.8 },
  { name: 'Furniture', revenue: 1288, returnRate: 11.2 },
  { name: 'Garden', revenue: 1046, returnRate: 3.5 },
]

/** Share of revenue taken online, % by month (synthetic). */
const ONLINE_SHARE = [31, 32, 32, 33, 34, 34, 35, 36, 36, 37, 41, 44]

/** Average order value, £ by month (synthetic). */
const AVG_ORDER_VALUE = [48, 46, 47, 49, 51, 53, 52, 50, 54, 57, 63, 68]

export interface DataPoint {
  label: string
  value: number
}

export type ChartKind = 'bar' | 'line'

export interface GenBiResult {
  intentId: IntentId
  question: string
  chart: ChartKind
  title: string
  unit: 'gbpk' | 'gbp' | 'pct'
  data: DataPoint[]
  /** Index of the point the answer is about (highlighted on bar charts, labelled on lines). */
  highlight: number
  answer: string
  /** The semantic-layer query this intent maps to, shown so the mapping is visible. */
  query: string
  matchedTerms: string[]
  region?: Region
}

export type IntentId = 'region-q4' | 'monthly-trend' | 'top-categories' | 'returns' | 'online-share' | 'aov'

interface Intent {
  id: IntentId
  suggestion: string
  /** Distinctive terms score 3; supporting terms score 1. */
  strong: string[]
  weak: string[]
  build: (ctx: { region?: Region; category?: string }) => Omit<GenBiResult, 'question' | 'matchedTerms' | 'intentId'>
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const ORDINALS = ['highest', 'second highest', 'third highest', 'fourth highest', 'lowest']

const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0)
const totalByMonth = MONTHS.map((_, i) => sum(REGIONS.map((r) => REVENUE_BY_REGION[r][i])))
const maxIndex = (xs: number[]) => xs.indexOf(Math.max(...xs))
const minIndex = (xs: number[]) => xs.indexOf(Math.min(...xs))

export function formatValue(value: number, unit: GenBiResult['unit']): string {
  if (unit === 'pct') return `${value.toLocaleString('en-GB', { maximumFractionDigits: 1 })}%`
  if (unit === 'gbp') return `£${value.toLocaleString('en-GB')}`
  return value >= 1000
    ? `£${(value / 1000).toLocaleString('en-GB', { maximumFractionDigits: 2 })}m`
    : `£${value.toLocaleString('en-GB')}k`
}

const pctChange = (from: number, to: number) => Math.round(((to - from) / from) * 100)

const INTENTS: Intent[] = [
  {
    id: 'region-q4',
    suggestion: 'Which region had the highest revenue last quarter?',
    strong: ['region', 'regions', 'regional', 'where', 'area', 'areas'],
    weak: ['quarter', 'q4', 'last quarter', 'highest', 'most', 'best', 'top', 'sold', 'revenue', 'sales'],
    build: () => {
      const data = REGIONS.map((r) => ({ label: r, value: sum(REVENUE_BY_REGION[r].slice(9)) }))
      const sorted = [...data].sort((a, b) => b.value - a.value)
      const [first, second] = sorted
      return {
        chart: 'bar',
        title: `Revenue by region, Q4 ${DATA_YEAR}`,
        unit: 'gbpk',
        data: sorted,
        highlight: 0,
        answer: `${first.label} led Q4 with ${formatValue(first.value, 'gbpk')} in revenue, ${pctChange(second.value, first.value)}% ahead of ${second.label}.`,
        query: `SELECT region, SUM(revenue) AS revenue\nFROM sales\nWHERE quarter = 'Q4-${DATA_YEAR}'\nGROUP BY region\nORDER BY revenue DESC`,
      }
    },
  },
  {
    id: 'monthly-trend',
    suggestion: `How did monthly revenue trend in ${DATA_YEAR}?`,
    strong: ['trend', 'trending', 'monthly', 'month', 'months', 'over time', 'over the year', 'growth', 'seasonal', 'seasonality'],
    weak: ['revenue', 'sales', 'grow', 'year', 'change', DATA_YEAR.toString()],
    build: ({ region }) => {
      const series = region ? REVENUE_BY_REGION[region] : totalByMonth
      const peak = maxIndex(series)
      const low = minIndex(series)
      const scope = region ? `${region} revenue` : 'Revenue'
      return {
        chart: 'line',
        title: `${region ? `${region} revenue` : 'Revenue'} by month, ${DATA_YEAR}`,
        unit: 'gbpk',
        data: MONTHS.map((m, i) => ({ label: m, value: series[i] })),
        highlight: peak,
        answer: `${scope} rose ${pctChange(series[0], series[11])}% from January to December, with a low in ${MONTHS[low]} (${formatValue(series[low], 'gbpk')}) and a peak in ${MONTHS[peak]} (${formatValue(series[peak], 'gbpk')}).`,
        query: `SELECT month, SUM(revenue) AS revenue\nFROM sales\nWHERE year = ${DATA_YEAR}${region ? `\n  AND region = '${region}'` : ''}\nGROUP BY month\nORDER BY month`,
        region,
      }
    },
  },
  {
    id: 'top-categories',
    suggestion: 'What are the top product categories by revenue?',
    strong: ['category', 'categories', 'product', 'products', 'best seller', 'best sellers', 'best selling', 'range', 'department'],
    weak: ['top', 'best', 'most', 'revenue', 'sales', 'sold', 'biggest'],
    build: () => {
      const data = CATEGORIES.map((c) => ({ label: c.name, value: c.revenue })).sort((a, b) => b.value - a.value)
      const total = sum(data.map((d) => d.value))
      const share = Math.round((data[0].value / total) * 100)
      return {
        chart: 'bar',
        title: `Revenue by product category, ${DATA_YEAR}`,
        unit: 'gbpk',
        data,
        highlight: 0,
        answer: `${data[0].label} is the top category at ${formatValue(data[0].value, 'gbpk')}, ${share}% of the year's revenue, followed by ${data[1].label}.`,
        query: `SELECT category, SUM(revenue) AS revenue\nFROM sales\nWHERE year = ${DATA_YEAR}\nGROUP BY category\nORDER BY revenue DESC`,
      }
    },
  },
  {
    id: 'returns',
    suggestion: 'Which category has the highest return rate?',
    strong: ['return', 'returns', 'returned', 'refund', 'refunds', 'refunded', 'sent back'],
    weak: ['rate', 'category', 'categories', 'highest', 'worst', 'most', 'product'],
    build: ({ category }) => {
      const data = CATEGORIES.map((c) => ({ label: c.name, value: c.returnRate })).sort((a, b) => b.value - a.value)
      const worst = data[0]
      const best = data[data.length - 1]
      const asked = category ? data.findIndex((d) => d.label === category) : -1
      const answer =
        asked > 0
          ? `${data[asked].label} returns ${formatValue(data[asked].value, 'pct')} of units, ${ORDINALS[asked]} of ${data.length} categories; ${worst.label} is highest at ${formatValue(worst.value, 'pct')}.`
          : `${worst.label} has the highest return rate at ${formatValue(worst.value, 'pct')}, roughly ${Math.round(worst.value / best.value)}x ${best.label} (${formatValue(best.value, 'pct')}).`
      return {
        chart: 'bar',
        title: `Return rate by product category, ${DATA_YEAR}`,
        unit: 'pct',
        data,
        highlight: Math.max(asked, 0),
        answer,
        query: `SELECT category,\n  SUM(returned_units) / SUM(units) AS return_rate\nFROM sales\nWHERE year = ${DATA_YEAR}\nGROUP BY category\nORDER BY return_rate DESC`,
      }
    },
  },
  {
    id: 'online-share',
    suggestion: 'How much of our revenue came from online each month?',
    strong: ['online', 'web', 'website', 'ecommerce', 'e-commerce', 'digital', 'channel', 'in-store', 'instore', 'store vs'],
    weak: ['share', 'percentage', 'percent', 'proportion', 'how much', 'revenue', 'sales', 'stores'],
    build: () => {
      const peak = maxIndex(ONLINE_SHARE)
      const jumps = ONLINE_SHARE.slice(1).map((v, i) => v - ONLINE_SHARE[i])
      const biggestJump = maxIndex(jumps) + 1
      return {
        chart: 'line',
        title: `Online share of revenue by month, ${DATA_YEAR}`,
        unit: 'pct',
        data: MONTHS.map((m, i) => ({ label: m, value: ONLINE_SHARE[i] })),
        highlight: peak,
        answer: `Online grew from ${ONLINE_SHARE[0]}% of revenue in January to ${ONLINE_SHARE[11]}% in December, ${ONLINE_SHARE[11] - ONLINE_SHARE[0]} points up, with the biggest monthly jump in ${MONTH_NAMES[biggestJump]} (+${jumps[biggestJump - 1]} points).`,
        query: `SELECT month,\n  SUM(CASE WHEN channel = 'online' THEN revenue END)\n    / SUM(revenue) AS online_share\nFROM sales\nWHERE year = ${DATA_YEAR}\nGROUP BY month\nORDER BY month`,
      }
    },
  },
  {
    id: 'aov',
    suggestion: 'How did average order value change across the year?',
    strong: ['aov', 'average order', 'order value', 'basket', 'basket size', 'spend per', 'per order', 'average spend'],
    weak: ['average', 'order', 'orders', 'spend', 'change', 'value'],
    build: () => {
      const peak = maxIndex(AVG_ORDER_VALUE)
      const low = minIndex(AVG_ORDER_VALUE)
      return {
        chart: 'line',
        title: `Average order value by month, ${DATA_YEAR}`,
        unit: 'gbp',
        data: MONTHS.map((m, i) => ({ label: m, value: AVG_ORDER_VALUE[i] })),
        highlight: peak,
        answer: `Average order value ranged from ${formatValue(AVG_ORDER_VALUE[low], 'gbp')} in ${MONTHS[low]} to ${formatValue(AVG_ORDER_VALUE[peak], 'gbp')} in ${MONTHS[peak]}, ${pctChange(AVG_ORDER_VALUE[0], AVG_ORDER_VALUE[11])}% higher by year end.`,
        query: `SELECT month, SUM(revenue) / COUNT(DISTINCT order_id) AS aov\nFROM sales\nWHERE year = ${DATA_YEAR}\nGROUP BY month\nORDER BY month`,
      }
    },
  },
]

export const SUGGESTED_QUESTIONS = INTENTS.map((i) => i.suggestion)

/** Minimum score to accept a match: one distinctive term, or three supporting ones. */
const MATCH_THRESHOLD = 3

function normalise(text: string) {
  return ` ${text.toLowerCase().replace(/[^a-z0-9%\s-]/g, ' ').replace(/\s+/g, ' ').trim()} `
}

function hasTerm(haystack: string, term: string) {
  return haystack.includes(` ${term} `)
}

function findRegion(haystack: string): Region | undefined {
  return REGIONS.find((r) => hasTerm(haystack, r.toLowerCase()))
}

function findCategory(haystack: string): string | undefined {
  return CATEGORIES.find((c) => hasTerm(haystack, c.name.toLowerCase()))?.name
}

export type AskOutcome = { ok: true; result: GenBiResult } | { ok: false; question: string; reason: 'empty' | 'unmatched' }

/** Deterministically map a question to an intent. Ties go to the earlier intent in the list. */
export function ask(question: string): AskOutcome {
  const trimmed = question.trim()
  if (!trimmed) return { ok: false, question: trimmed, reason: 'empty' }

  const haystack = normalise(trimmed)
  const region = findRegion(haystack)
  const category = findCategory(haystack)

  let best: { intent: Intent; score: number; terms: string[] } | null = null
  for (const intent of INTENTS) {
    const strong = intent.strong.filter((t) => hasTerm(haystack, t))
    const weak = intent.weak.filter((t) => hasTerm(haystack, t))
    let score = strong.length * 3 + weak.length
    // Naming a region alongside a time word is a strong hint for the trend intent
    if (intent.id === 'monthly-trend' && region && weak.length > 0) score += 2
    if (!best || score > best.score) best = { intent, score, terms: [...strong, ...weak] }
  }

  if (!best || best.score < MATCH_THRESHOLD) return { ok: false, question: trimmed, reason: 'unmatched' }

  const built = best.intent.build({ region, category })
  const matchedTerms = region && built.region ? [...best.terms, region.toLowerCase()] : best.terms
  return { ok: true, result: { ...built, intentId: best.intent.id, question: trimmed, matchedTerms } }
}
