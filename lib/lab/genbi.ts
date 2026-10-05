/**
 * Gen BI demo engine. A rule-based prototype: there is no AI model and no network.
 *
 * 1. Data: one synthetic fact table, 12 months x 4 regions x 5 categories, for a
 *    fictional retailer in 2025. Every chart, total and answer is aggregated from
 *    these 240 rows, so figures reconcile across every dimension.
 * 2. Parsing: a question becomes an explicit query (metric, period, grouping,
 *    filters, sort) and every part is validated.
 * 3. Clarification: if any part is unsupported or ambiguous, the engine says so
 *    and lists what it can answer. It never swaps in a different question.
 *
 * All figures are invented. They do not describe any real company.
 */

export const RETAILER = 'Larkfield Home'
export const RETAILER_BLURB = 'a fictional UK homeware retailer with stores in four regions and an online shop'
export const DATA_YEAR = 2025

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const
export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const
export const REGIONS = ['North', 'Midlands', 'South', 'Scotland'] as const
export const CATEGORIES = ['Kitchen', 'Textiles', 'Lighting', 'Furniture', 'Garden'] as const
export type Region = (typeof REGIONS)[number]
export type Category = (typeof CATEGORIES)[number]

// ── 1. The fact table ────────────────────────────────────────────────────────

/** One row per month, region and category. Money is in whole pounds. */
export interface FactRow {
  /** 0 = January */
  month: number
  region: Region
  category: Category
  revenue: number
  onlineRevenue: number
  orders: number
  units: number
  returnedUnits: number
}

/** Small seeded PRNG (mulberry32) so the synthetic table is identical on every build. */
function seeded(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const meanOne = (xs: number[]) => {
  const mean = xs.reduce((a, b) => a + b, 0) / xs.length
  return xs.map((x) => x / mean)
}

// Generator inputs. These shape the synthetic table; nothing reads them directly.
const MONTH_BASE_K = [643, 591, 633, 667, 697, 726, 708, 685, 735, 787, 961, 1120]
const REGION_SHARE: Record<Region, number> = { North: 0.28, Midlands: 0.235, South: 0.335, Scotland: 0.15 }
const REGION_ONLINE: Record<Region, number> = { North: -0.01, Midlands: -0.02, South: 0.02, Scotland: 0.03 }
const ONLINE_BASE = [0.31, 0.32, 0.32, 0.33, 0.34, 0.34, 0.35, 0.36, 0.36, 0.37, 0.41, 0.44]
const AOV_BASE = [48, 46, 47, 49, 51, 53, 52, 50, 54, 57, 63, 68]
const RETURN_MONTH = [1.25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.1]
const CATEGORY_INPUTS: Record<
  Category,
  { share: number; season: number[]; online: number; basket: number; unitPrice: number; returnRate: number }
> = {
  Kitchen: { share: 0.29, season: meanOne([0.95, 0.9, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 1, 1.05, 1.15, 1.25]), online: 0, basket: 0.85, unitPrice: 18, returnRate: 0.041 },
  Textiles: { share: 0.24, season: meanOne([1.1, 0.85, 0.9, 0.9, 0.9, 0.9, 0.9, 0.95, 1, 1.05, 1.2, 1.35]), online: 0.04, basket: 0.8, unitPrice: 22, returnRate: 0.096 },
  Lighting: { share: 0.185, season: meanOne([1, 0.95, 0.95, 0.9, 0.85, 0.8, 0.8, 0.85, 1, 1.15, 1.3, 1.45]), online: 0.02, basket: 1.05, unitPrice: 35, returnRate: 0.068 },
  Furniture: { share: 0.157, season: meanOne([1.25, 1.05, 1, 0.95, 0.95, 0.9, 0.9, 0.9, 0.95, 1, 1.05, 1.1]), online: -0.07, basket: 2.6, unitPrice: 140, returnRate: 0.112 },
  Garden: { share: 0.128, season: meanOne([0.35, 0.45, 0.9, 1.6, 1.9, 1.9, 1.7, 1.3, 0.8, 0.45, 0.35, 0.3]), online: -0.05, basket: 1.1, unitPrice: 25, returnRate: 0.035 },
}

const REGION_BASKET: Record<Region, number> = { North: 0.99, Midlands: 0.98, South: 1.05, Scotland: 0.96 }
// Rescale each month so the category mix moves revenue between categories without inflating the month total
const MIX_NORM = MONTHS.map((_, m) => {
  const inputs = Object.values(CATEGORY_INPUTS)
  return inputs.reduce((t, c) => t + c.share * c.season[m], 0) / inputs.reduce((t, c) => t + c.share, 0)
})

function buildFacts(): FactRow[] {
  const rand = seeded(20250101)
  const jitter = (spread: number) => 1 + (rand() * 2 - 1) * spread
  const rows: FactRow[] = []
  MONTHS.forEach((_, month) => {
    for (const region of REGIONS) {
      for (const category of CATEGORIES) {
        const c = CATEGORY_INPUTS[category]
        const revenue = Math.round(((MONTH_BASE_K[month] * 1000 * REGION_SHARE[region] * c.share * c.season[month]) / MIX_NORM[month]) * jitter(0.05))
        const share = Math.min(0.9, Math.max(0.05, ONLINE_BASE[month] + REGION_ONLINE[region] + c.online + (rand() * 2 - 1) * 0.015))
        const units = Math.round((revenue / c.unitPrice) * jitter(0.03))
        rows.push({
          month,
          region,
          category,
          revenue,
          onlineRevenue: Math.round(revenue * share),
          orders: Math.round(revenue / (AOV_BASE[month] * c.basket * REGION_BASKET[region] * jitter(0.03))),
          units,
          returnedUnits: Math.round(units * c.returnRate * RETURN_MONTH[month] * jitter(0.08)),
        })
      }
    }
  })
  return rows
}

/** The only data the demo has. Every view below is derived from these rows. */
export const FACTS: readonly FactRow[] = Object.freeze(buildFacts())

// ── 2. Queries ───────────────────────────────────────────────────────────────

export type Metric = 'revenue' | 'orders' | 'aov' | 'return_rate' | 'online_share'
export type Grouping = 'none' | 'region' | 'category' | 'month' | 'quarter' | 'channel'
export type Channel = 'online' | 'store'
export type Unit = 'gbp' | 'gbp2' | 'pct' | 'count'

export interface Period {
  /** Inclusive month indexes within DATA_YEAR */
  from: number
  to: number
  label: string
  /** No period in the question, so the whole year was used. */
  defaulted: boolean
  /** A month or quarter was named without a year; 2025 is the only year in the data. */
  yearAssumed: boolean
}

export interface Query {
  metric: Metric
  period: Period
  groupBy: Grouping
  filters: { regions: Region[]; categories: Category[]; channel: Channel | null }
  /** Order of the result rows: by value, or in time order. */
  sort: 'desc' | 'asc' | 'time'
  /** Which end of the ranking the answer is about, if the question asked. */
  rank: 'highest' | 'lowest' | 'both' | null
  limit: number | null
}

export interface DataPoint {
  label: string
  value: number
}

export interface ScopeItem {
  label: string
  value: string
}

export interface GenBiResult {
  question: string
  query: Query
  /** The interpreted scope, shown with every answer. */
  scope: ScopeItem[]
  chart: 'bar' | 'line' | 'stat'
  title: string
  unit: Unit
  data: DataPoint[]
  /** Indexes into `data` that the answer is about. */
  highlight: number[]
  answer: string
  /** The equivalent SQL over the fact table, for transparency. */
  sql: string
}

export type AskOutcome =
  | { kind: 'empty' }
  | { kind: 'answer'; question: string; result: GenBiResult }
  | { kind: 'clarify'; question: string; issues: string[] }

export type ParseResult = { ok: true; query: Query } | { ok: false; issues: string[] }

/** What the demo can answer. Shown with every clarification. */
export const CAPABILITIES: ScopeItem[] = [
  { label: 'Measures', value: 'revenue, orders, average order value, return rate, online share of revenue' },
  { label: 'Periods', value: 'any month, quarter, half or month range in 2025, or the whole year' },
  { label: 'Breakdowns', value: 'one at a time: by region, category, month or quarter; online vs in-store for revenue' },
  { label: 'Filters', value: 'North, Midlands, South, Scotland; Kitchen, Textiles, Lighting, Furniture, Garden; online or in-store (revenue only)' },
  { label: 'Sorting', value: 'highest, lowest, or top / bottom N' },
]

export const SUGGESTED_QUESTIONS = [
  `Which region had the highest revenue in Q4 ${DATA_YEAR}?`,
  `How did monthly revenue trend in ${DATA_YEAR}?`,
  `What were the top 3 product categories by revenue in ${DATA_YEAR}?`,
  `Which category had the highest return rate in ${DATA_YEAR}?`,
  `What share of revenue came from online each month in ${DATA_YEAR}?`,
  `How did average order value change across ${DATA_YEAR}?`,
]

// ── Parsing helpers ──────────────────────────────────────────────────────────

const MONTH_ALT =
  'january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sept|sep|oct|nov|dec'
const MONTH_KEYS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
const monthIndex = (word: string) => MONTH_KEYS.indexOf(word.slice(0, 3))

const ORDINAL: Record<string, number> = {
  '1': 1, '2': 2, '3': 3, '4': 4, one: 1, two: 2, three: 3, four: 4,
  first: 1, second: 2, third: 3, fourth: 4, '1st': 1, '2nd': 2, '3rd': 3, '4th': 4,
}
const NUMBER_WORDS: Record<string, number> = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12,
}

function normalise(question: string) {
  const text = question
    .slice(0, 300)
    .toLowerCase()
    .replace(/[‘’`]/g, "'")
    .replace(/£\s*[\d,.]+\s*[km]?\b/g, ' moneyamount ')
    .replace(/[–—]/g, ' to ')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9%'\-\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return ` ${text} `
}

const unique = <T,>(xs: T[]) => Array.from(new Set(xs))
const titleCase = (s: string) => s.replace(/\b[a-z]/g, (c) => c.toUpperCase())
const quote = (s: string) => `“${s.trim()}”`

function listText(xs: string[], joiner = 'and') {
  if (xs.length <= 1) return xs.join('')
  return `${xs.slice(0, -1).join(', ')} ${joiner} ${xs[xs.length - 1]}`
}

/** All matches of a pattern (the pattern must not carry the g flag). */
function matches(text: string, re: RegExp): RegExpMatchArray[] {
  return Array.from(text.matchAll(new RegExp(re.source, `${re.flags}g`)))
}

function strip(text: string, re: RegExp) {
  return text.replace(new RegExp(re.source, `${re.flags}g`), ' ')
}

const NEGATION =
  /\b(not|no|never|none|neither|nor|excluding|exclude|excludes|excluded|except|excepting|without|minus|omit|omitting|ignoring|ignore|besides|other than|apart from|aside from|outside of|dont|didnt|doesnt|isnt|arent|wasnt|werent)\b|\b[a-z]+n't\b|\bnon-/
const EXPLAIN = /\b(why|because|reason|reasons|cause|caused|causes|explain)\b/
const FORECAST = /\b(forecast|forecasts|forecasting|predict|predicted|prediction|projected|projection|next year)\b|\bwill\b(?! you\b)/
const GRANULARITY = /\b(week|weeks|weekly|weekend|weekends|day|days|daily|today|yesterday|hour|hours|hourly)\b/
const GROWTH = /\b(grow|grew|grown|growth|growing|fastest|year on year|year over year|yoy|month on month|month over month|cumulative|running total)\b/
const THRESHOLD = /\b(over|above|under|below|more than|less than|greater than|at least|at most|exceeding|exceeded)\s+(\d|moneyamount)/
const RELATIVE =
  /\b(last|this|next|previous|past|current|prior|recent)\s+(?:(?:\d+|two|three|four|six|nine|twelve|few)\s+)?(quarter|quarters|month|months|year|years|half|period)\b|\b(ytd|year to date|so far|recently|lately)\b/

const UNSUPPORTED_METRIC =
  /\b(profits?|profitable|profitability|margins?|costs?|expenses?|ebitda|earnings|income|customers?|footfall|visitors?|traffic|conversions?|conversion rate|stock|inventory|prices?|pricing|discounts?|nps|satisfaction|ratings?|reviews?|staff|employees?|headcount|wages?|salary|salaries|budgets?|targets?|units?|volumes?|quantity|quantities|items)\b/

const UNKNOWN_REGION =
  /\b(northern ireland|ireland|irish|london|wales|welsh|east anglia|north[ -]?east|north[ -]?west|south[ -]?east|south[ -]?west|east midlands|west midlands|east|west|eastern|western|yorkshire|england|english|manchester|birmingham|bristol|cardiff|edinburgh|glasgow|belfast|leeds|liverpool|newcastle|europe|international|overseas|abroad)\b/
const REGION_WORDS: [RegExp, Region][] = [
  [/\b(north|northern)\b/, 'North'],
  [/\bmidlands\b/, 'Midlands'],
  [/\b(south|southern)\b/, 'South'],
  [/\b(scotland|scottish)\b/, 'Scotland'],
]
const UNKNOWN_CATEGORY =
  /\b(bathrooms?|bedding|bedroom|beds|electronics|electricals|appliances|toys|clothing|clothes|fashion|beauty|food|grocery|groceries|pets?|diy|decor|rugs|curtains|tableware|books|stationery)\b/
const CATEGORY_WORDS: [RegExp, Category][] = [
  [/\b(kitchen|kitchenware|cookware)\b/, 'Kitchen'],
  [/\b(textiles?|soft furnishings)\b/, 'Textiles'],
  [/\b(lighting|lights|lamps?)\b/, 'Lighting'],
  [/\bfurniture\b/, 'Furniture'],
  [/\b(garden|gardens|gardening|outdoor)\b/, 'Garden'],
]

const AOV_WORDS =
  /\b(aov|average order values?|avg order values?|average order|order values?|average basket(?: size| value)?|basket (?:size|value)|average spend(?: per order)?|spend per order|value per order|revenue per order)\b/
const RETURN_WORDS = /\b(return rates?|returns rates?|returns?|returned|refunds?|refunded|sent back)\b/
const ORDER_WORDS = /\b(orders|order count|order volumes?|transactions)\b/
const REVENUE_WORDS =
  /\b(revenues?|sales|sold|sell|sells|selling|turnover|takings|best[- ]?sellers?|best[- ]?selling|top[- ]?sellers?|top[- ]?selling)\b/
const SHARE_WORDS = /\b(share|shares|percentage|percent|proportion|fraction|mix|split|how much of)\b|%/
const ONLINE_WORDS = /\b(online|web|website|e-?commerce|digital|internet)\b/
const STORE_WORDS = /\b(in-?store|in stores?|in shops?|stores?|shops?|physical|offline|bricks and mortar|high street)\b/
const AVERAGE_WORDS = /\b(average|averages|avg|mean|median)\b/

const REGION_GROUP = /\b(regions?|regional|where|areas?)\b/
const CATEGORY_GROUP =
  /\b(categor(?:y|ies)|products?|product lines?|departments?|best[- ]?sellers?|best[- ]?selling|top[- ]?sellers?|top[- ]?selling)\b/
const MONTH_GROUP =
  /\b(months?|monthly|when|trend|trends|trending|trended|over time|seasonal|seasonality|change|changed|changes|changing|evolve|evolved|(?:across|through|throughout|over|during) (?:the year|2025))\b/
const QUARTER_GROUP = /\b(quarters?|quarterly)\b/
const CHANNEL_GROUP = /\b(channels?|by channel)\b/

const HIGH_WORDS =
  /\b(highest|most|top|best|biggest|largest|greatest|max|maximum|peak|peaked|peaks|leading|led|strongest|best[- ]?sellers?|best[- ]?selling|top[- ]?sellers?|top[- ]?selling)\b/
const LOW_WORDS = /\b(lowest|least|fewest|smallest|bottom|worst|weakest|minimum|min|poorest|slowest|quietest)\b/
const LIMIT_WORDS =
  /\b(?:top|bottom|best|worst|highest|lowest|biggest|smallest)\s+(\d+|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\b/

interface FoundPeriod {
  from: number
  to: number
  label: string
}

function fullYear(defaulted: boolean): Period {
  return { from: 0, to: 11, label: String(DATA_YEAR), defaulted, yearAssumed: false }
}

/** Pull every period phrase out of the text. Returns what it found and the text without them. */
function extractPeriods(input: string): { text: string; found: FoundPeriod[]; issues: string[] } {
  let text = input
  const found: FoundPeriod[] = []
  const issues: string[] = []
  const M = `(${MONTH_ALT})`

  // Month ranges: "between March and May", "from Jan to Mar", "jan-mar"
  const ranges = [
    new RegExp(`\\bbetween ${M}(?: 2025)? and ${M}\\b`),
    new RegExp(`\\b(?:from )?${M}(?: 2025)?\\s*(?:-|\\s(?:to|through|thru|until|till)\\s)\\s*${M}\\b`),
  ]
  for (const re of ranges) {
    for (const m of matches(text, re)) {
      const from = monthIndex(m[1])
      const to = monthIndex(m[2])
      if (from > to) issues.push(`${quote(m[0])} runs backwards or past the end of the year. Use a range within 2025, such as “January to March”.`)
      else found.push({ from, to, label: from === to ? `${MONTH_NAMES[from]} ${DATA_YEAR}` : `${MONTH_NAMES[from]} to ${MONTH_NAMES[to]} ${DATA_YEAR}` })
    }
    text = strip(text, re)
  }

  // Quarter ranges: "Q1 to Q3", "between Q2 and Q4"
  const quarterRanges = [/\bbetween q([1-4]) and q([1-4])\b/, /\bq([1-4])\s*(?:-|\s(?:to|through|thru|until|till)\s)\s*q([1-4])\b/]
  for (const re of quarterRanges) {
    for (const m of matches(text, re)) {
      const a = Number(m[1])
      const b = Number(m[2])
      if (a > b) issues.push(`${quote(m[0])} runs backwards. Use a range such as “Q1 to Q3”.`)
      else found.push({ from: (a - 1) * 3, to: b * 3 - 1, label: a === b ? `Q${a} ${DATA_YEAR}` : `Q${a} to Q${b} ${DATA_YEAR}` })
    }
    text = strip(text, re)
  }

  // Single quarters
  const quarterPatterns = [/\bq([1-4])\b/, /\bquarter ([1-4]|one|two|three|four)\b/, /\b(first|second|third|fourth|1st|2nd|3rd|4th) quarter\b/]
  for (const re of quarterPatterns) {
    for (const m of matches(text, re)) {
      const q = ORDINAL[m[1]]
      found.push({ from: (q - 1) * 3, to: q * 3 - 1, label: `Q${q} ${DATA_YEAR}` })
    }
    text = strip(text, re)
  }
  const badQuarter = text.match(/\bq([05-9]|\d{2,})\b/)
  if (badQuarter) issues.push(`There is no ${badQuarter[0].toUpperCase()}. Use Q1 to Q4.`)

  // Halves
  const half = /\b(h1|h2|first half|1st half|second half|2nd half)\b/
  for (const m of matches(text, half)) {
    const second = /2|second/.test(m[1])
    found.push({ from: second ? 6 : 0, to: second ? 11 : 5, label: `H${second ? 2 : 1} ${DATA_YEAR}` })
  }
  text = strip(text, half)

  // Single months. "May" only counts after a preposition or before the year ("May I see…" is not a month).
  const single = new RegExp(`\\b${M}\\b`)
  for (const m of matches(text, single)) {
    const word = m[1]
    if (word === 'may') {
      const at = m.index ?? 0
      const before = text.slice(0, at)
      const after = text.slice(at + 3)
      if (!/\b(in|during|for|of|from|to|between|and|since|until|through|by|the|than)\s$/.test(before) && !/^\s2025\b/.test(after)) continue
    }
    const i = monthIndex(word)
    found.push({ from: i, to: i, label: `${MONTH_NAMES[i]} ${DATA_YEAR}` })
  }
  text = text.replace(new RegExp(single.source, 'g'), (w, word: string, offset: number) => {
    if (word !== 'may') return ' '
    const before = text.slice(0, offset)
    const after = text.slice(offset + 3)
    return /\b(in|during|for|of|from|to|between|and|since|until|through|by|the|than)\s$/.test(before) || /^\s2025\b/.test(after) ? ' ' : w
  })

  // De-duplicate the same period said twice ("Q1 2025 (Q1)")
  const seen = new Set<string>()
  const distinct = found.filter((p) => {
    const key = `${p.from}-${p.to}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
  return { text, found: distinct, issues }
}

/** Turn a question into a validated query, or the list of reasons it can't be answered. */
export function parseQuestion(question: string): ParseResult {
  const issues: string[] = []
  let text = normalise(question)

  // Questions the demo can't answer from a table of figures
  if (EXPLAIN.test(text)) issues.push('The demo reports figures from the table; it can’t explain why something happened.')
  if (FORECAST.test(text)) issues.push('The demo has no forecasts. It only reports what is in the 2025 table.')
  const negation = text.match(NEGATION)
  if (negation)
    issues.push(
      `Exclusions and negation (${quote(negation[0])}) aren’t supported. Ask about what you want to include instead, for example “revenue from January to November 2025” rather than “excluding December”.`,
    )
  if (GRANULARITY.test(text)) issues.push('The data is monthly, so it can’t answer by week, day or hour.')
  const growth = text.match(GROWTH)
  if (growth) issues.push(`Growth calculations (${quote(growth[0])}) aren’t supported. Ask for a monthly trend instead, for example “How did revenue trend by month in 2025?”.`)
  if (THRESHOLD.test(text) || /moneyamount/.test(text)) issues.push('Thresholds and amounts (“over £50k”) aren’t supported.')

  // Years: only 2025 exists
  const years = unique(matches(text, /\b(?:19|20)\d{2}\b/).map((m) => Number(m[0])))
  const fyYears = unique(matches(text, /\bfy ?(\d{2})\b/).map((m) => 2000 + Number(m[1])))
  const otherYears = unique([...years, ...fyYears]).filter((y) => y !== DATA_YEAR)
  if (otherYears.length) issues.push(`The demo only has data for ${DATA_YEAR}, so it can’t answer about ${listText(otherYears.map(String))}.`)
  const mentionsYear = years.includes(DATA_YEAR) || fyYears.includes(DATA_YEAR)

  // Unambiguous "last quarter of 2025" style phrases, before the relative-date check
  text = text
    .replace(/\b(?:the )?(?:last|final|fourth) quarter of (?:the year|2025)\b/g, ' q4 2025 ')
    .replace(/\b(?:the )?(?:last|final) month of (?:the year|2025)\b/g, ' december 2025 ')
    .replace(/\b(?:the )?first month of (?:the year|2025)\b/g, ' january 2025 ')
  const relative = text.match(RELATIVE)
  if (relative) {
    issues.push(
      `${quote(relative[0])} is relative, and the data covers January to December ${DATA_YEAR} only. Name the period instead, for example “Q4 ${DATA_YEAR}” or “March ${DATA_YEAR}”.`,
    )
    text = strip(text, RELATIVE)
  }

  // Period
  const periods = extractPeriods(text)
  text = periods.text
  issues.push(...periods.issues)
  const fullYearWords = /\b(full year|whole year|entire year|all year|annual|annually|yearly|the year)\b/.test(text)
  let period: Period
  if (periods.found.length > 1) {
    issues.push(
      `The question mentions more than one period (${listText(periods.found.map((p) => p.label))}). Comparing periods isn’t supported: ask about one period, or a range such as “January to June ${DATA_YEAR}”.`,
    )
    period = fullYear(false)
  } else if (periods.found.length === 1) {
    const p = periods.found[0]
    period = { ...p, defaulted: false, yearAssumed: !mentionsYear }
  } else {
    period = fullYear(!mentionsYear && !fullYearWords)
  }
  // "across 2025" asks for a month-by-month view; note it before the year tokens go
  const acrossYear = /\b(?:across|through|throughout|over|during) (?:the year|2025)\b/.test(text)
  // The year and FY tokens have done their job; drop them so "2025" isn't read as a number later
  text = strip(text, /\b(?:19|20)\d{2}\b|\bfy ?\d{2}\b/)

  // Filters
  const unknownRegions = unique(matches(text, UNKNOWN_REGION).map((m) => m[0].trim()))
  if (unknownRegions.length)
    issues.push(`${listText(unknownRegions.map((r) => quote(titleCase(r))))} ${unknownRegions.length > 1 ? 'aren’t regions' : 'isn’t a region'} in this demo. It has ${listText([...REGIONS])}.`)
  text = strip(text, UNKNOWN_REGION)
  const regions = REGION_WORDS.filter(([re]) => re.test(text)).map(([, r]) => r)
  const unknownCategories = unique(matches(text, UNKNOWN_CATEGORY).map((m) => m[0].trim()))
  if (unknownCategories.length)
    issues.push(
      `${listText(unknownCategories.map((c) => quote(titleCase(c))))} ${unknownCategories.length > 1 ? 'aren’t categories' : 'isn’t a category'} in this demo. It has ${listText([...CATEGORIES])}.`,
    )
  const categories = CATEGORY_WORDS.filter(([re]) => re.test(text)).map(([, c]) => c)

  // Channels ("online shop" is the online channel, not a store)
  text = text.replace(/\bonline (shop|store)s?\b/g, ' online ')
  const online = ONLINE_WORDS.test(text)
  const store = STORE_WORDS.test(text)
  const share = SHARE_WORDS.test(text)

  // Metric
  const unsupported = unique(matches(text, UNSUPPORTED_METRIC).map((m) => m[0]))
  if (unsupported.length)
    issues.push(
      `${listText(unsupported.map(quote))} ${unsupported.length > 1 ? 'aren’t' : 'isn’t'} in this dataset. It has revenue, orders, average order value, return rate and online share of revenue.`,
    )
  const metrics: Metric[] = []
  if (AOV_WORDS.test(text)) metrics.push('aov')
  text = strip(text, AOV_WORDS)
  if (AVERAGE_WORDS.test(text)) issues.push('The only average the demo knows is average order value. Other averages (“average monthly revenue”) aren’t supported.')
  if (RETURN_WORDS.test(text)) metrics.push('return_rate')
  if (share && online) metrics.push('online_share')
  else if (share && store)
    issues.push('The demo reports the online share of revenue; the in-store share is the rest. Ask, for example, “What share of revenue came from online in 2025?”.')
  if (ORDER_WORDS.test(text)) metrics.push('orders')
  if (REVENUE_WORDS.test(text) && !metrics.includes('online_share')) metrics.push('revenue')

  let metric: Metric = 'revenue'
  if (metrics.length > 1) {
    issues.push(`The question asks about more than one measure (${listText(metrics.map((m) => METRIC_NAME[m]))}). Ask about one at a time.`)
  } else if (metrics.length === 1) {
    metric = metrics[0]
  } else if (online || store) {
    issues.push(
      `Do you mean revenue from ${online ? 'online' : 'stores'} (in £), or the online share of revenue (%)? Ask, for example, “What was ${online ? 'online' : 'in-store'} revenue in Q4 2025?” or “What share of revenue came from online in Q4 2025?”.`,
    )
  } else if (!unsupported.length) {
    issues.push('I couldn’t tell which measure you want. Try revenue, orders, average order value, return rate or online share.')
  }

  // Channel filter or split: revenue only
  let channel: Channel | null = null
  let channelSplit = false
  if (metric !== 'online_share' && (online || store)) {
    if (metric !== 'revenue' && metrics.length === 1) issues.push('Online and in-store figures are only available for revenue in this demo.')
    else if (online && store) channelSplit = true
    else channel = online ? 'online' : 'store'
  }

  // Grouping
  const groupings: Grouping[] = []
  if (REGION_GROUP.test(text)) groupings.push('region')
  if (CATEGORY_GROUP.test(text)) groupings.push('category')
  if (MONTH_GROUP.test(text) || acrossYear) groupings.push('month')
  if (QUARTER_GROUP.test(text)) groupings.push('quarter')
  if (channelSplit || (CHANNEL_GROUP.test(text) && metric === 'revenue')) groupings.push('channel')
  if (groupings.length === 0 && regions.length > 1) groupings.push('region')
  if (groupings.length === 0 && categories.length > 1) groupings.push('category')
  if (CHANNEL_GROUP.test(text) && metric !== 'revenue' && metric !== 'online_share' && metrics.length === 1)
    issues.push('Online and in-store figures are only available for revenue in this demo.')

  let groupBy: Grouping = 'none'
  if (groupings.length > 1) {
    issues.push(`The question asks for more than one breakdown (by ${listText(groupings, 'and by')}). The demo shows one at a time.`)
  } else if (groupings.length === 1) {
    groupBy = groupings[0]
  }

  // Sort and limit
  const high = HIGH_WORDS.test(text)
  const low = LOW_WORDS.test(text)
  if (metric === 'return_rate' && /\b(best|worst)\b/.test(text))
    issues.push('For return rate, “best” and “worst” are ambiguous. Say “highest” or “lowest”.')
  const rank: Query['rank'] = high && low ? 'both' : high ? 'highest' : low ? 'lowest' : null
  const limitMatch = text.match(LIMIT_WORDS)
  const limit = limitMatch ? (NUMBER_WORDS[limitMatch[1]] ?? Number(limitMatch[1])) : null

  // A single value on the grouped dimension is a total, not a ranking
  const singleOnGroup =
    (groupBy === 'region' && regions.length === 1) ||
    (groupBy === 'category' && categories.length === 1) ||
    (groupBy === 'month' && period.from === period.to) ||
    (groupBy === 'quarter' && period.to - period.from === 2 && period.from % 3 === 0)
  if (singleOnGroup) {
    if (rank) issues.push('Only one item is selected, so there is nothing to rank.')
    groupBy = 'none'
  }
  if (groupBy === 'quarter' && (period.from % 3 !== 0 || (period.to + 1) % 3 !== 0))
    issues.push('A quarterly breakdown needs whole quarters. Ask about the year, a half or a range of quarters.')

  if (rank && groupBy === 'none' && !singleOnGroup && groupings.length === 0)
    issues.push(`${rank === 'lowest' ? '“Lowest”' : '“Highest”'} needs something to compare. Add “by region”, “by category”, “by month” or “by quarter”.`)

  if (limit !== null) {
    const size = groupSize(groupBy, period, regions, categories)
    if (groupBy === 'none') issues.push('“Top” needs a breakdown, such as “top 3 categories”.')
    else if (limit < 1 || limit > size) issues.push(`There ${size === 1 ? 'is' : 'are'} only ${size} ${GROUP_NOUN[groupBy][size === 1 ? 0 : 1]} to rank, so “${limitMatch?.[0]}” can’t be answered.`)
  }

  if (issues.length) return { ok: false, issues: unique(issues) }

  const sort: Query['sort'] =
    groupBy === 'month' || groupBy === 'quarter' ? (rank === 'lowest' ? 'asc' : rank ? 'desc' : 'time') : rank === 'lowest' ? 'asc' : 'desc'
  return {
    ok: true,
    query: {
      metric,
      period,
      groupBy,
      filters: { regions, categories, channel },
      sort,
      rank: limit !== null && rank === 'both' ? 'highest' : rank,
      limit,
    },
  }
}

function groupSize(groupBy: Grouping, period: Period, regions: Region[], categories: Category[]) {
  switch (groupBy) {
    case 'region':
      return regions.length || REGIONS.length
    case 'category':
      return categories.length || CATEGORIES.length
    case 'month':
      return period.to - period.from + 1
    case 'quarter':
      return Math.floor((period.to - period.from + 1) / 3)
    case 'channel':
      return 2
    default:
      return 1
  }
}

// ── 3. Running a query ───────────────────────────────────────────────────────

const METRIC_NAME: Record<Metric, string> = {
  revenue: 'revenue',
  orders: 'orders',
  aov: 'average order value',
  return_rate: 'return rate',
  online_share: 'online share of revenue',
}
const METRIC_DEFINITION: Record<Metric, string> = {
  revenue: 'Revenue (sum, £)',
  orders: 'Orders (count)',
  aov: 'Average order value (revenue ÷ orders)',
  return_rate: 'Return rate (returned units ÷ units sold)',
  online_share: 'Online share (online revenue ÷ revenue)',
}
const METRIC_UNIT: Record<Metric, Unit> = { revenue: 'gbp', orders: 'count', aov: 'gbp2', return_rate: 'pct', online_share: 'pct' }
const GROUP_NOUN: Record<Grouping, [string, string]> = {
  none: ['total', 'totals'],
  region: ['region', 'regions'],
  category: ['category', 'categories'],
  month: ['month', 'months'],
  quarter: ['quarter', 'quarters'],
  channel: ['channel', 'channels'],
}

interface Totals {
  revenue: number
  onlineRevenue: number
  orders: number
  units: number
  returnedUnits: number
}

export function totals(rows: readonly FactRow[]): Totals {
  return rows.reduce<Totals>(
    (t, r) => ({
      revenue: t.revenue + r.revenue,
      onlineRevenue: t.onlineRevenue + r.onlineRevenue,
      orders: t.orders + r.orders,
      units: t.units + r.units,
      returnedUnits: t.returnedUnits + r.returnedUnits,
    }),
    { revenue: 0, onlineRevenue: 0, orders: 0, units: 0, returnedUnits: 0 },
  )
}

function measure(metric: Metric, t: Totals, channel: Channel | null): number {
  switch (metric) {
    case 'revenue':
      return channel === 'online' ? t.onlineRevenue : channel === 'store' ? t.revenue - t.onlineRevenue : t.revenue
    case 'orders':
      return t.orders
    case 'aov':
      return t.orders ? t.revenue / t.orders : 0
    case 'return_rate':
      return t.units ? (t.returnedUnits / t.units) * 100 : 0
    case 'online_share':
      return t.revenue ? (t.onlineRevenue / t.revenue) * 100 : 0
  }
}

export function formatValue(value: number, unit: Unit): string {
  switch (unit) {
    case 'pct':
      return `${value.toLocaleString('en-GB', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`
    case 'gbp2':
      return `£${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    case 'count':
      return Math.round(value).toLocaleString('en-GB')
    case 'gbp':
      if (Math.abs(value) >= 1_000_000) return `£${(value / 1_000_000).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}m`
      if (Math.abs(value) >= 10_000) return `£${Math.round(value / 1000).toLocaleString('en-GB')}k`
      if (Math.abs(value) >= 1000) return `£${(value / 1000).toLocaleString('en-GB', { maximumFractionDigits: 1 })}k`
      return `£${Math.round(value).toLocaleString('en-GB')}`
  }
}

/** Compact axis labels: £250k, £1.5m, 40%, 12,000. */
export function formatTick(value: number, unit: Unit): string {
  if (unit === 'pct') return `${value.toLocaleString('en-GB', { maximumFractionDigits: 1 })}%`
  if (unit === 'count') return value.toLocaleString('en-GB', { maximumFractionDigits: 0 })
  if (value === 0) return '£0'
  if (unit === 'gbp2') return `£${value.toLocaleString('en-GB', { maximumFractionDigits: 0 })}`
  if (value >= 1_000_000) return `£${(value / 1_000_000).toLocaleString('en-GB', { maximumFractionDigits: 2 })}m`
  if (value >= 1000) return `£${(value / 1000).toLocaleString('en-GB', { maximumFractionDigits: 0 })}k`
  return `£${value}`
}

const regionPhrase = (r: string) => (r === 'Scotland' ? r : `the ${r}`)
const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

function metricPhrase(q: Query) {
  if (q.metric === 'revenue' && q.filters.channel) return `${q.filters.channel === 'online' ? 'online' : 'in-store'} revenue`
  return METRIC_NAME[q.metric]
}

/** " for Kitchen in the North", leaving out the dimension being broken down. */
function filterPhrase(q: Query) {
  const parts: string[] = []
  if (q.filters.categories.length && q.groupBy !== 'category') parts.push(`for ${listText(q.filters.categories)}`)
  if (q.filters.regions.length && q.groupBy !== 'region') parts.push(`in ${listText(q.filters.regions.map(regionPhrase))}`)
  return parts.length ? ` ${parts.join(' ')}` : ''
}

function itemPhrase(groupBy: Grouping, label: string) {
  if (groupBy === 'region') return `in ${regionPhrase(label)}`
  if (groupBy === 'month' || groupBy === 'quarter') return `in ${label}`
  if (groupBy === 'channel') return label === 'Online' ? 'online' : 'in stores'
  return `for ${label}`
}

function compare(a: number, b: number, unit: Unit) {
  if (unit === 'pct') {
    const diff = Math.abs(a - b)
    return diff < 0.05 ? 'level with' : `${diff.toLocaleString('en-GB', { maximumFractionDigits: 1, minimumFractionDigits: 1 })} points ${a > b ? 'above' : 'below'}`
  }
  const pct = b ? Math.round((Math.abs(a - b) / b) * 100) : 0
  return pct === 0 ? 'level with' : `${pct}% ${a > b ? 'above' : 'below'}`
}

function changeText(from: number, to: number, unit: Unit) {
  if (unit === 'pct') {
    const d = to - from
    return `${d >= 0 ? '+' : '−'}${Math.abs(d).toLocaleString('en-GB', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} points`
  }
  const pct = from ? Math.round(((to - from) / from) * 100) : 0
  return `${pct >= 0 ? '+' : '−'}${Math.abs(pct)}%`
}

function describePeriod(p: Period) {
  const range = p.from === p.to ? `${MONTH_NAMES[p.from]} ${DATA_YEAR}` : `${MONTH_NAMES[p.from]} to ${MONTH_NAMES[p.to]} ${DATA_YEAR}`
  const notes: string[] = []
  if (p.label !== range && !(p.from === 0 && p.to === 11)) notes.push(p.label)
  if (p.defaulted) notes.push('no period given, so all of the data')
  if (p.yearAssumed) notes.push(`year not stated; ${DATA_YEAR} is the only year in the data`)
  return notes.length ? `${range} (${notes.join('; ')})` : range
}

function describeFilters(q: Query) {
  const parts: string[] = []
  if (q.filters.regions.length) parts.push(`Region: ${q.filters.regions.join(', ')}`)
  if (q.filters.categories.length) parts.push(`Category: ${q.filters.categories.join(', ')}`)
  if (q.filters.channel) parts.push(`Channel: ${q.filters.channel === 'online' ? 'online' : 'in-store'}`)
  return parts.length ? parts.join(' · ') : 'None'
}

function describeSort(q: Query) {
  if (q.groupBy === 'none') return 'Not applicable (single total)'
  const order = q.sort === 'time' ? 'Time order' : q.sort === 'asc' ? 'Lowest first' : 'Highest first'
  const limit = q.limit ? `, ${q.sort === 'asc' ? 'bottom' : 'top'} ${q.limit}` : ''
  const timeRank = (q.groupBy === 'month' || q.groupBy === 'quarter') && q.rank ? ' (chart in time order)' : ''
  return `${order}${limit}${timeRank}`
}

function describeScope(q: Query): ScopeItem[] {
  return [
    { label: 'Metric', value: METRIC_DEFINITION[q.metric] },
    { label: 'Date range', value: describePeriod(q.period) },
    { label: 'Grouping', value: q.groupBy === 'none' ? 'None (single total)' : `By ${GROUP_NOUN[q.groupBy][0]}` },
    { label: 'Filters', value: describeFilters(q) },
    { label: 'Sort', value: describeSort(q) },
  ]
}

const pad = (n: number) => String(n).padStart(2, '0')
const sqlList = (xs: string[]) => xs.map((x) => `'${x}'`).join(', ')
const METRIC_SQL: Record<Metric, string> = {
  revenue: 'SUM(revenue)',
  orders: 'SUM(orders)',
  aov: 'SUM(revenue) / SUM(orders)',
  return_rate: 'SUM(returned_units) / SUM(units)',
  online_share: 'SUM(online_revenue) / SUM(revenue)',
}

function sqlFor(q: Query): string {
  const where = [`month BETWEEN '${DATA_YEAR}-${pad(q.period.from + 1)}' AND '${DATA_YEAR}-${pad(q.period.to + 1)}'`]
  if (q.filters.regions.length) where.push(`region IN (${sqlList(q.filters.regions)})`)
  if (q.filters.categories.length) where.push(`category IN (${sqlList(q.filters.categories)})`)
  const whereSql = `WHERE ${where.join('\n  AND ')}`
  const alias = q.metric
  if (q.groupBy === 'channel') {
    return [
      `SELECT 'Online' AS channel, SUM(online_revenue) AS revenue`,
      'FROM sales',
      whereSql,
      'UNION ALL',
      `SELECT 'In-store', SUM(revenue - online_revenue)`,
      'FROM sales',
      whereSql,
      `ORDER BY revenue ${q.sort === 'asc' ? 'ASC' : 'DESC'}`,
    ].join('\n')
  }
  let expr = METRIC_SQL[q.metric]
  if (q.metric === 'revenue' && q.filters.channel === 'online') expr = 'SUM(online_revenue)'
  if (q.metric === 'revenue' && q.filters.channel === 'store') expr = 'SUM(revenue - online_revenue)'
  const lines = [q.groupBy === 'none' ? `SELECT ${expr} AS ${alias}` : `SELECT ${q.groupBy}, ${expr} AS ${alias}`, 'FROM sales', whereSql]
  if (q.groupBy !== 'none') lines.push(`GROUP BY ${q.groupBy}`)
  if (q.groupBy === 'month' || q.groupBy === 'quarter') lines.push(`ORDER BY ${q.groupBy}`)
  else if (q.groupBy !== 'none') lines.push(`ORDER BY ${alias} ${q.sort === 'asc' ? 'ASC' : 'DESC'}`)
  if (q.limit && q.groupBy !== 'month' && q.groupBy !== 'quarter') lines.push(`LIMIT ${q.limit}`)
  return lines.join('\n')
}

/** Aggregate the fact table for a validated query and phrase the answer. */
export function runQuery(q: Query, question = ''): GenBiResult {
  const unit = METRIC_UNIT[q.metric]
  const rows = FACTS.filter(
    (r) =>
      r.month >= q.period.from &&
      r.month <= q.period.to &&
      (!q.filters.regions.length || q.filters.regions.includes(r.region)) &&
      (!q.filters.categories.length || q.filters.categories.includes(r.category)),
  )
  const value = (subset: readonly FactRow[], channel = q.filters.channel) => measure(q.metric, totals(subset), channel)

  let data: DataPoint[]
  switch (q.groupBy) {
    case 'region':
      data = (q.filters.regions.length ? q.filters.regions : [...REGIONS]).map((r) => ({ label: r, value: value(rows.filter((x) => x.region === r)) }))
      break
    case 'category':
      data = (q.filters.categories.length ? q.filters.categories : [...CATEGORIES]).map((c) => ({ label: c, value: value(rows.filter((x) => x.category === c)) }))
      break
    case 'channel':
      data = [
        { label: 'Online', value: value(rows, 'online') },
        { label: 'In-store', value: value(rows, 'store') },
      ]
      break
    case 'month':
      data = []
      for (let m = q.period.from; m <= q.period.to; m++) data.push({ label: MONTHS[m], value: value(rows.filter((x) => x.month === m)) })
      break
    case 'quarter':
      data = []
      for (let m = q.period.from; m <= q.period.to; m += 3) data.push({ label: `Q${m / 3 + 1}`, value: value(rows.filter((x) => x.month >= m && x.month < m + 3)) })
      break
    default:
      data = [{ label: q.period.label, value: value(rows) }]
  }

  const isTime = q.groupBy === 'month' || q.groupBy === 'quarter'
  if (!isTime && q.groupBy !== 'none') {
    data.sort((a, b) => (q.sort === 'asc' ? a.value - b.value : b.value - a.value))
    if (q.limit) data = data.slice(0, q.limit)
  }

  const metricText = metricPhrase(q)
  const filters = filterPhrase(q)
  const period = q.period.label
  const during = q.period.label.includes(' to ') ? `from ${q.period.label}` : `in ${q.period.label}`
  const rankWord = (r: 'highest' | 'lowest') => (q.metric === 'orders' ? (r === 'highest' ? 'most' : 'fewest') : r)
  const fmt = (v: number) => formatValue(v, unit)
  const label = (d: DataPoint) => (q.groupBy === 'month' ? MONTH_NAMES[MONTHS.indexOf(d.label as (typeof MONTHS)[number])] : d.label)
  const ranked = data.map((d, i) => ({ ...d, i })).sort((a, b) => b.value - a.value)
  const top = ranked[0]
  const bottom = ranked[ranked.length - 1]

  let answer: string
  let highlight: number[]
  if (q.groupBy === 'none' || data.length === 1) {
    answer = `${capitalise(metricText)}${filters} ${during} ${q.metric === 'orders' ? 'totalled' : 'was'} ${fmt(data[0].value)}.`
    highlight = [0]
  } else if (q.limit) {
    const picked = isTime ? (q.sort === 'asc' ? [...ranked].reverse() : ranked).slice(0, q.limit) : data.map((d, i) => ({ ...d, i }))
    answer = `The ${q.sort === 'asc' ? 'bottom' : 'top'} ${q.limit} ${GROUP_NOUN[q.groupBy][1]} by ${metricText}${filters} ${during} were ${listText(
      picked.map((d) => `${label(d)} (${fmt(d.value)})`),
    )}.`
    highlight = picked.map((d) => d.i)
  } else if (q.rank === 'highest' || q.rank === 'lowest') {
    const order = q.rank === 'lowest' ? [...ranked].reverse() : ranked
    const [first, second] = order
    answer = `${label(first)} had the ${rankWord(q.rank)} ${metricText}${filters} ${during}, at ${fmt(first.value)}, ${compare(first.value, second.value, unit)} ${label(second)} (${fmt(second.value)}).`
    highlight = [first.i]
  } else if (isTime && !q.rank) {
    const first = data[0]
    const last = data[data.length - 1]
    const clauses: string[] = []
    if (bottom.i !== 0 && bottom.i !== data.length - 1) clauses.push(`a low in ${label(bottom)} (${fmt(bottom.value)})`)
    if (top.i !== 0 && top.i !== data.length - 1) clauses.push(`a peak in ${label(top)} (${fmt(top.value)})`)
    answer = `${capitalise(metricText)}${filters} went from ${fmt(first.value)} in ${label(first)} to ${fmt(last.value)} in ${label(last)} ${q.period.label === String(DATA_YEAR) ? DATA_YEAR + ' ' : ''}(${changeText(first.value, last.value, unit)})${clauses.length ? `, with ${listText(clauses)}` : ''}.`
    highlight = unique([top.i, bottom.i])
  } else {
    answer = `${capitalise(metricText)}${filters} ${during} was highest ${itemPhrase(q.groupBy, label(top))} (${fmt(top.value)}) and lowest ${itemPhrase(q.groupBy, label(bottom))} (${fmt(bottom.value)}).`
    highlight = unique([top.i, bottom.i])
  }

  const titleBase = `${capitalise(metricText)}${q.groupBy === 'none' ? '' : ` by ${GROUP_NOUN[q.groupBy][0]}`}${filters}`
  return {
    question,
    query: q,
    scope: describeScope(q),
    chart: q.groupBy === 'none' || data.length === 1 ? 'stat' : q.groupBy === 'month' ? 'line' : 'bar',
    title: `${titleBase}, ${period}`,
    unit,
    data,
    highlight,
    answer,
    sql: sqlFor(q),
  }
}

/** Answer a plain-English question, or explain what needs clarifying. Deterministic. */
export function ask(question: string): AskOutcome {
  const trimmed = (typeof question === 'string' ? question : '').trim()
  if (!trimmed) return { kind: 'empty' }
  const parsed = parseQuestion(trimmed)
  if (!parsed.ok) return { kind: 'clarify', question: trimmed, issues: parsed.issues }
  return { kind: 'answer', question: trimmed, result: runQuery(parsed.query, trimmed) }
}
