import type { Metadata } from 'next'
import { SITE_NAME } from './site'

// Fallback for routes without their own opengraph-image file. A route-level
// opengraph-image.tsx takes priority over this config-based value.
const DEFAULT_OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'Akash Jindal — AI Product Owner, Generative AI and Gen BI',
}

interface PageMetadataInput {
  title: string
  description: string
  /** Path relative to the site root, e.g. "/about". Resolved against metadataBase. */
  path: string
  /** Use the title as-is instead of applying the "%s | Akash Jindal" template. */
  absoluteTitle?: boolean
  ogType?: 'website' | 'article'
  /** Path of a route-level opengraph-image, so the Twitter card matches it. */
  image?: string
}

/** Per-route title, description, canonical URL and matching Open Graph / Twitter fields. */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  ogType = 'website',
  image,
}: PageMetadataInput): Metadata {
  const ogImage = image ? { ...DEFAULT_OG_IMAGE, url: image, alt: title } : DEFAULT_OG_IMAGE
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
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [ogImage.url],
    },
  }
}
