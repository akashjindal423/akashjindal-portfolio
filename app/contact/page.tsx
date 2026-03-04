import Link from 'next/link'
import { Clock, Linkedin, Mail, Briefcase } from 'lucide-react'
import PageHeader from '@/components/shared/PageHeader'
import SectionWrapper from '@/components/shared/SectionWrapper'
import ContactForm from '@/components/contact/ContactForm'

export default function ContactPage() {
  return (
    <main>
      <SectionWrapper>
        <PageHeader
          eyebrow="CONTACT"
          title="Let's Talk"
          subtitle="Whether you're hiring, collaborating, or just want to connect — I'd love to hear from you."
        />
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: form */}
          <ContactForm />

          {/* Right: info cards */}
          <div className="flex flex-col gap-4">
            <div className="bg-[#13132A] border border-[#2A2A50] rounded-xl p-6 flex items-start gap-4">
              <Clock className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-text-primary font-semibold text-sm mb-1">Response Time</p>
                <p className="text-text-secondary text-sm">Typically within 24 hours.</p>
              </div>
            </div>

            <a
              href="https://linkedin.com/in/akashjindal"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#13132A] border border-[#2A2A50] hover:border-violet-500/30 rounded-xl p-6 flex items-start gap-4 transition group"
            >
              <Linkedin className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-text-primary font-semibold text-sm mb-1">LinkedIn</p>
                <p className="text-text-secondary text-sm group-hover:text-violet-400 transition-colors duration-200">
                  linkedin.com/in/akashjindal
                </p>
              </div>
            </a>

            <a
              href="mailto:hello@akashjindal.dev"
              className="bg-[#13132A] border border-[#2A2A50] hover:border-violet-500/30 rounded-xl p-6 flex items-start gap-4 transition group"
            >
              <Mail className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-text-primary font-semibold text-sm mb-1">Email</p>
                <p className="text-text-secondary text-sm group-hover:text-violet-400 transition-colors duration-200">
                  hello@akashjindal.dev
                </p>
              </div>
            </a>

            <div className="bg-violet-600/10 border border-violet-500/20 rounded-xl p-6 flex items-start gap-4">
              <Briefcase className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-text-primary font-semibold text-sm mb-1">Currently Open To</p>
                <p className="text-text-secondary text-sm">
                  Senior PO / Lead PO roles in fintech, banking, or growth-stage tech.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  )
}
