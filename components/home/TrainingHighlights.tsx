'use client'

import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import SectionWrapper from '@/components/shared/SectionWrapper'
import Badge from '@/components/shared/Badge'
import { getTraining } from '@/lib/content'

const certs = getTraining()

function formatYM(ym: string) {
  const [year, month] = ym.split('-')
  return new Date(Number(year), Number(month) - 1).toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
  })
}

export default function TrainingHighlights() {
  return (
    <SectionWrapper id="training">
      {/* Header */}
      <div className="mb-12">
        <span className="block text-violet-400 text-xs uppercase tracking-widest mb-2">
          Certifications
        </span>
        <h2 className="text-3xl font-bold text-text-primary">Training &amp; Certifications</h2>
      </div>

      {/* Horizontal scroll row */}
      <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth scrollbar-none">
        {certs.map((cert) => (
          <div
            key={cert.slug}
            className="flex-shrink-0 w-72 bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5"
          >
            <Badge variant="accent">{cert.provider}</Badge>
            <p className="font-semibold text-sm text-text-primary mt-3 leading-snug line-clamp-2">
              {cert.title}
            </p>
            <p className="text-text-muted text-xs mt-2">{formatYM(cert.date)}</p>
            {cert.credentialUrl && (
              <Link
                href={cert.credentialUrl}
                target="_blank"
                className="inline-flex items-center gap-1 text-violet-400 text-xs mt-4 hover:text-violet-300 transition-colors duration-200"
              >
                Verify credential
                <ExternalLink className="w-3 h-3" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
