import type { Metadata } from 'next'
import { SITE_NAME } from './site'

interface PageMetadataInput {
  title: string
  description: string
  /** Path relative to the site root, e.g. "/about". Resolved against metadataBase. */
  path: string
  /** Use the title as-is instead of applying the "%s | Akash Jindal" template. */
  absoluteTitle?: boolean
  ogType?: 'website' | 'article'
}

/** Per-route title, description, canonical URL and matching Open Graph / Twitter fields. */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  ogType = 'website',
}: PageMetadataInput): Metadata {
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: ogType,
      locale: 'en_GB',
      siteName: SITE_NAME,
      url: path,
      title: socialTitle,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
    },
  }
}
