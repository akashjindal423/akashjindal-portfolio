import { getEducation } from './content'
import { SITE_URL } from './site'

export const LINKEDIN_URL = 'https://www.linkedin.com/in/akash--jindal/'
export const GITHUB_URL = 'https://github.com/akashjindal423'

/** schema.org Person for Akash Jindal, built only from facts in lib/content.ts. */
export function personSchema() {
  return {
    '@context': 'https://schema.org',
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
