import Link from 'next/link'
import { ExternalLink, Mail } from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import { CONTACT_EMAIL } from '@/lib/site'
import { LINKEDIN_URL } from '@/lib/structured-data'

export default function ContactCta() {
  return (
    <SectionWrapper id="contact">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-10">
        <span className="block text-violet-400 text-xs uppercase tracking-widest mb-2">Contact</span>
        <h2 className="text-3xl font-bold text-text-primary">Let&apos;s talk</h2>
        <p className="mt-3 max-w-2xl text-text-secondary leading-relaxed">
          Open to AI Product Manager roles. Email or LinkedIn is the quickest way to reach me.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700 transition-colors duration-200"
          >
            <Mail className="h-4 w-4" aria-hidden="true" /> {CONTACT_EMAIL}
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-6 py-3 font-semibold text-text-secondary hover:border-[var(--border-strong)] hover:text-text-primary transition-colors duration-200"
          >
            LinkedIn <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
          <Link href="/contact" className="inline-flex items-center px-2 py-3 text-violet-400 hover:text-violet-300">
            Contact page →
          </Link>
        </div>
      </div>
    </SectionWrapper>
  )
}
