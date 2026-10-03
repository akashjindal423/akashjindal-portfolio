import { Clock, Linkedin, Mail, Briefcase } from 'lucide-react'
import PageHeader from '@/components/shared/PageHeader'
import SectionWrapper from '@/components/shared/SectionWrapper'
import ContactForm from '@/components/contact/ContactForm'
import CopyEmail from '@/components/contact/CopyEmail'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Contact',
  description:
    'Get in touch with Akash Jindal by email or LinkedIn about AI product roles, collaboration or speaking.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <main>
      <SectionWrapper className="pb-0 sm:pb-0">
        <PageHeader
          eyebrow="CONTACT"
          title="Let's Talk"
          subtitle="Whether you're hiring, collaborating, or just want to connect — I'd love to hear from you."
        />
      </SectionWrapper>

      <SectionWrapper className="pt-10 sm:pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: form, with a plain-address fallback for visitors without a mail app */}
          <div className="flex flex-col gap-6">
            <ContactForm />
            <CopyEmail />
          </div>

          {/* Right: info cards */}
          <div className="flex flex-col gap-4">
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 flex items-start gap-4">
              <Clock className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-text-primary font-semibold text-sm mb-1">Response Time</p>
                <p className="text-text-secondary text-sm">Typically within 24 hours.</p>
              </div>
            </div>

            <a
              href="https://www.linkedin.com/in/akash--jindal/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--surface)] border border-[var(--border)] hover:border-violet-500/30 rounded-xl p-6 flex items-start gap-4 transition group"
            >
              <Linkedin className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-text-primary font-semibold text-sm mb-1">LinkedIn</p>
                <p className="text-text-secondary text-sm group-hover:text-violet-400 transition-colors duration-200">
                  linkedin.com/in/akash--jindal
                </p>
              </div>
            </a>

            <a
              href="mailto:akashjindal423@gmail.com"
              className="bg-[var(--surface)] border border-[var(--border)] hover:border-violet-500/30 rounded-xl p-6 flex items-start gap-4 transition group"
            >
              <Mail className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-text-primary font-semibold text-sm mb-1">Email</p>
                <p className="text-text-secondary text-sm group-hover:text-violet-400 transition-colors duration-200">
                  akashjindal423@gmail.com
                </p>
              </div>
            </a>

            <div className="bg-violet-600/10 border border-violet-500/20 rounded-xl p-6 flex items-start gap-4">
              <Briefcase className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-text-primary font-semibold text-sm mb-1">Currently Open To</p>
                <p className="text-text-secondary text-sm">
                  AI Product Manager roles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}
