import Link from 'next/link'
import { ExternalLink, Github, Mail } from 'lucide-react'
import { GITHUB_URL, LINKEDIN_URL } from '@/lib/structured-data'
import { PRIMARY_NAV, SECONDARY_NAV } from '@/lib/nav'

const MAIN_LINKS = [{ label: 'Home', href: '/' }, ...PRIMARY_NAV, { label: 'Contact', href: '/contact' }]

const CONNECT_LINKS = [
  { label: 'LinkedIn', href: LINKEDIN_URL, icon: ExternalLink, external: true },
  { label: 'GitHub', href: GITHUB_URL, icon: Github, external: true },
  { label: 'akashjindal423@gmail.com', href: 'mailto:akashjindal423@gmail.com', icon: Mail, external: false },
]

export default function Footer() {
  return (
    <footer className="bg-[var(--background)] border-t border-[var(--border)] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3-col grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1 — Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 bg-violet-600 text-white font-bold text-sm flex items-center justify-center rounded shrink-0">
                AJ
              </span>
              <span className="font-medium text-[var(--text-primary)]">Akash Jindal</span>
            </div>
            <p className="text-text-secondary text-sm mt-2">AI Product Owner</p>
            <p className="text-text-subtle text-sm mt-3">
              Open to AI Product Manager roles, contract or permanent.
            </p>
          </div>

          {/* Col 2 — Main pages */}
          <nav aria-label="Footer">
            <p className="text-xs uppercase tracking-widest text-text-subtle mb-4">Navigation</p>
            <ul className="flex flex-col gap-2">
              {MAIN_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-text-secondary hover:text-violet-400 text-sm transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3 — Pages linked from About rather than the main navigation */}
          <nav aria-label="More about me">
            <p className="text-xs uppercase tracking-widest text-text-subtle mb-4">More about me</p>
            <ul className="flex flex-col gap-2">
              {SECONDARY_NAV.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-text-secondary hover:text-violet-400 text-sm transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 4 — Connect */}
          <div>
            <p className="text-xs uppercase tracking-widest text-text-subtle mb-4">Connect</p>
            <ul className="flex flex-col gap-2">
              {CONNECT_LINKS.map(({ label, href, icon: Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2 text-text-secondary hover:text-violet-400 text-sm transition-colors duration-200"
                  >
                    <Icon size={14} aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--border)] mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-text-subtle text-xs">
          <span>© 2026 Akash Jindal. All rights reserved.</span>
          <span>Built with Next.js &amp; deployed on Vercel</span>
        </div>
      </div>
    </footer>
  )
}
