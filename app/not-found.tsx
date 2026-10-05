import Link from 'next/link'
import type { Metadata } from 'next'
import SectionWrapper from '@/components/shared/SectionWrapper'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

const LINKS = [
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Toolkit', href: '/toolkit' },
  { label: 'Contact', href: '/contact' },
]

export default function NotFound() {
  return (
    <main>
      <SectionWrapper className="min-h-[70vh] flex flex-col justify-center">
        <p className="text-highlight text-xs uppercase tracking-widest mb-3 font-mono">404</p>
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary">Page not found</h1>
        <p className="text-text-secondary text-lg mt-4 max-w-xl leading-relaxed">
          This page doesn&apos;t exist or has moved. Blog posts are published on LinkedIn, so older
          article links may now point there.
        </p>
        <div className="flex flex-wrap gap-3 mt-8">
          <Link
            href="/"
            className="bg-violet-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-violet-700 transition-all duration-200"
          >
            Back to home
          </Link>
          <Link
            href="/blog"
            className="border border-[var(--border)] text-text-secondary px-6 py-3 rounded-lg hover:border-[var(--border-strong)] hover:text-text-primary transition-all duration-200"
          >
            Browse articles
          </Link>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-10 text-sm">
          {LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link href={href} className="text-violet-400 hover:text-violet-300 transition-colors duration-200">
                {label} →
              </Link>
            </li>
          ))}
        </ul>
      </SectionWrapper>
    </main>
  )
}
