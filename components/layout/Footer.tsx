import Link from 'next/link'
import { ExternalLink, Github, Mail } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Skills', href: '/skills' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const CONNECT_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/akash--jindal/', icon: ExternalLink },
  { label: 'GitHub', href: '#', icon: Github },
  { label: 'akashjindal423@gmail.com', href: 'mailto:akashjindal423@gmail.com', icon: Mail },
]

export default function Footer() {
  return (
    <footer className="bg-[var(--background)] border-t border-[var(--border)] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3-col grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Col 1 — Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 bg-violet-600 text-white font-bold text-sm flex items-center justify-center rounded shrink-0">
                AJ
              </span>
              <span className="font-medium text-[var(--text-primary)]">Akash Jindal</span>
            </div>
            <p className="text-[#A09EC0] text-sm mt-2">Technical Product Owner</p>
            <p className="text-[#4F4D70] text-sm mt-3">
              Open to contract and permanent roles in banking, fintech, and tech.
            </p>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <p className="text-xs uppercase tracking-widest text-[#4F4D70] mb-4">Navigation</p>
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[#A09EC0] hover:text-violet-400 text-sm transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Connect */}
          <div>
            <p className="text-xs uppercase tracking-widest text-[#4F4D70] mb-4">Connect</p>
            <ul className="flex flex-col gap-2">
              {CONNECT_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="inline-flex items-center gap-2 text-[#A09EC0] hover:text-violet-400 text-sm transition-colors duration-200"
                  >
                    <Icon size={14} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--border)] mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-[#4F4D70] text-xs">
          <span>© 2026 Akash Jindal. All rights reserved.</span>
          <span>Built with Next.js &amp; deployed on Vercel</span>
        </div>
      </div>
    </footer>
  )
}
