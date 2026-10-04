import Breadcrumbs from '@/components/shared/Breadcrumbs'
import GenBiDemo from '@/components/lab/GenBiDemo'
import { DATA_YEAR } from '@/lib/lab/genbi'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Gen BI Demo',
  description:
    'A rule-based Gen BI prototype by Akash Jindal over fictional 2025 retail data, with no AI model. Ask a plain-English question and see the answer, a chart and how the question was read; unsupported questions get a clarification.',
  path: '/lab/gen-bi',
})

export default function GenBiPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Lab', href: '/lab' },
          { label: 'Gen BI demo', href: '/lab/gen-bi' },
        ]}
      />
      <p className="text-highlight text-xs uppercase tracking-widest mb-3">Lab · Gen BI</p>
      <h1 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight">Ask the data in plain English</h1>
      <p className="text-text-secondary text-lg mt-4 max-w-2xl leading-relaxed">
        Gen BI replaces &ldquo;raise a ticket and wait for a report&rdquo; with a question anyone can ask. This page is a
        rule-based prototype of that experience over fictional {DATA_YEAR} data. There is no AI model: fixed rules turn
        your question into a query, and every answer shows how the question was read.
      </p>
      <p className="text-text-secondary mt-3 max-w-2xl leading-relaxed">
        If any part of a question is unsupported or ambiguous, such as another year, profit or an exclusion, you get a
        clarification that says what the demo can answer, not an answer to a different question.
      </p>
      <div className="mt-10">
        <GenBiDemo />
      </div>
      <section className="mt-12 grid gap-4 sm:grid-cols-3">
        {[
          {
            title: 'Rules, not a model',
            body: 'Fixed rules read the measure, period, breakdown, filters and sort from your question. The same question always gives the same answer. No AI model, no API key, nothing leaves your browser.',
          },
          {
            title: 'One table, consistent totals',
            body: 'Every figure comes from a single 240-row table (12 months × 4 regions × 5 categories), so totals agree whichever way you slice them. “How this was answered” shows the equivalent SQL.',
          },
          {
            title: 'Clarifies instead of guessing',
            body: 'Questions about other years, missing measures such as profit, exclusions or vague dates get a clarification listing what the demo can answer.',
          },
        ].map((c) => (
          <div key={c.title} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="text-sm font-semibold text-text-primary">{c.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">{c.body}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
