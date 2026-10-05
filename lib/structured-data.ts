import { getEducation } from './content'
import { SITE_URL } from './site'

export const LINKEDIN_URL = 'https://www.linkedin.com/in/akash--jindal/'
export const GITHUB_URL = 'https://github.com/akashjindal423'

/** The Person node (no @context), so it can be embedded in other schemas. Built only from facts in lib/content.ts. */
function personNode() {
  return {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Akash Jindal',
    url: SITE_URL,
    image: `${SITE_URL}/profile.jpg`,
    jobTitle: 'AI Product Owner',
    description:
      "AI Product Owner at Lloyds Banking Group's AI Centre of Excellence, building Generative AI and Gen BI products.",
    worksFor: { '@type': 'Organization', name: 'Lloyds Banking Group' },
    address: { '@type': 'PostalAddress', addressLocality: 'Bristol', addressCountry: 'GB' },
    alumniOf: getEducation().map((e) => ({ '@type': 'EducationalOrganization', name: e.institution })),
    knowsAbout: ['Generative AI', 'Gen BI', 'Product ownership', 'Google Cloud', 'BigQuery', 'SAFe'],
    sameAs: [LINKEDIN_URL, GITHUB_URL],
  }
}

/** schema.org Person for Akash Jindal (homepage). */
export function personSchema() {
  return { '@context': 'https://schema.org', ...personNode() }
}

/**
 * schema.org ProfilePage for /about. Its mainEntity is the same Person, with the same
 * @id as the homepage's Person, so search engines treat them as one entity.
 */
export function profilePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/about#profilepage`,
    url: `${SITE_URL}/about`,
    name: 'About Akash Jindal',
    mainEntity: personNode(),
  }
}
