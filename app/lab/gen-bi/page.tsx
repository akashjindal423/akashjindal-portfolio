import Breadcrumbs from '@/components/shared/Breadcrumbs'
import GenBiDemo from '@/components/lab/GenBiDemo'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Gen BI Demo',
  description:
    'Ask a plain-English question about a fictional retailer and get a chart and a one-line answer. A Gen BI demo by Akash Jindal using synthetic data and deterministic matching, with no AI calls.',
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
      <p className="text-violet-400 text-xs uppercase tracking-widest mb-3">Lab · Gen BI</p>
      <h1 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight">Ask the data in plain English</h1>
      <p className="text-text-secondary text-lg mt-4 max-w-2xl leading-relaxed">
        Gen BI replaces &ldquo;raise a ticket and wait for a report&rdquo; with a question anyone can ask. This demo shows
        the shape of that experience: a question goes in, it is mapped to a defined metric, and a chart and a one-line
        answer come back.
      </p>
      <div className="mt-10">
        <GenBiDemo />
      </div>
      <section className="mt-12 grid gap-4 sm:grid-cols-3">
        {[
          {
            title: 'Deterministic by design',
            body: 'Keyword rules map each question to one of six metrics, so the same question always gives the same answer. No model, no API key, nothing leaves your browser.',
          },
          {
            title: 'The semantic layer is the product',
            body: 'The quality of a Gen BI answer depends on well-defined metrics and dimensions underneath. "How this was answered" shows the query each question maps to.',
          },
          {
            title: 'Honest about limits',
            body: 'Questions outside the model get a clear "can’t answer that yet" and suggestions, rather than a confident guess.',
          },
        ].map((c) => (
          <div key={c.title} className="rounded-xl border border-[#2A2A50] bg-[var(--surface)] p-5">
            <h2 className="text-sm font-semibold text-text-primary">{c.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">{c.body}</p>
          </div>
        ))}
      </section>
    </main>
  )
}
