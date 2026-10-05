export interface NavLink {
  label: string
  href: string
  /** One line for the About page's "more about me" links */
  blurb?: string
}

/** Main navigation (desktop bar and mobile menu). Contact is a separate button. */
export const PRIMARY_NAV: NavLink[] = [
  { label: 'Projects', href: '/projects' },
  { label: 'Lab', href: '/lab' },
  { label: 'Toolkit', href: '/toolkit' },
  { label: 'About', href: '/about' },
]

/** Linked from the About page and the footer rather than the main navigation. */
export const SECONDARY_NAV: NavLink[] = [
  { label: 'Experience', href: '/experience', blurb: 'Full career history, roles and tools' },
  { label: 'Skills', href: '/skills', blurb: 'AI and data, product, and delivery skills' },
  { label: 'Blog', href: '/blog', blurb: 'Articles on product and delivery' },
  { label: 'Training', href: '/training', blurb: 'Certifications, with links to verify them' },
  { label: 'Recommendations', href: '/recommendations', blurb: 'What managers and colleagues have said' },
]

export const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`)
