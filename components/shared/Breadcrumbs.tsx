import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import JsonLd from '@/components/shared/JsonLd'
import { SITE_URL } from '@/lib/site'

export interface Crumb {
  label: string
  href: string
}

/** Visible breadcrumb trail plus matching BreadcrumbList JSON-LD. The last crumb is the current page. */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: `${SITE_URL}${item.href === '/' ? '' : item.href}`,
    })),
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-10">
      <JsonLd data={schema} />
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className="text-text-secondary">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link href={item.href} className="text-violet-400 hover:text-violet-300 transition-colors duration-200">
                    {item.label}
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-text-muted" aria-hidden="true" />
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
