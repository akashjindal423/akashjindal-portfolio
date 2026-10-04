import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BacklogGame from '@/components/lab/BacklogGame'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Backlog Game',
  description:
    'A 60-second prioritisation game by Akash Jindal: choose from eight backlog items within a fixed capacity and see how your plan compares with the RICE-optimal set.',
  path: '/lab/backlog-game',
})

export default function BacklogGamePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Lab', href: '/lab' },
          { label: 'Backlog game', href: '/lab/backlog-game' },
        ]}
      />
      <p className="text-violet-400 text-xs uppercase tracking-widest mb-3">Lab · Prioritisation</p>
      <h1 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight">Can you beat RICE in 60 seconds?</h1>
      <p className="text-text-secondary text-lg mt-4 max-w-2xl leading-relaxed">
        Every quarter starts the same way: more good ideas than capacity. Pick a plan, then see how it compares with
        the best plan under a simple RICE model, and why. The result is a modelled score on fictional data, not value
        delivered.
      </p>
      <div className="mt-10">
        <BacklogGame />
      </div>
    </main>
  )
}
