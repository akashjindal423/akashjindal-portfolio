import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import PageHeader from '@/components/shared/PageHeader'
import SectionWrapper from '@/components/shared/SectionWrapper'
import Badge from '@/components/shared/Badge'
import { getTraining } from '@/lib/content'

function formatYM(ym: string) {
  const [year, month] = ym.split('-')
  return new Date(Number(year), Number(month) - 1).toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
  })
}

export default function TrainingPage() {
  const certs = getTraining()

  return (
    <main>
      <SectionWrapper>
        <PageHeader
          eyebrow="CERTIFICATIONS"
          title="Training & Certifications"
        />
      </SectionWrapper>

      <SectionWrapper>
        {/* Grid of certs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {certs.map((cert) => (
            <div
              key={cert.slug}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5"
            >
              <Badge variant="accent">{cert.provider}</Badge>
              <p className="font-semibold text-sm text-text-primary mt-3 leading-snug">
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

        {/* In Progress */}
        <p className="text-violet-400 text-xs uppercase tracking-widest mb-4">In Progress</p>
        <div className="max-w-sm">
          <div className="bg-[var(--surface)] border border-dashed border-[var(--border)] rounded-xl p-6">
            <span className="inline-block bg-violet-600/20 text-violet-400 text-xs px-2 py-1 rounded-full mb-3">
              In Progress
            </span>
            <p className="font-semibold text-text-primary text-sm leading-snug mb-1">
              CSPO — Certified Scrum Product Owner
            </p>
            <p className="text-text-muted text-xs">Scrum Alliance · Expected Q3 2026</p>
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}
