import HeroSection from '@/components/home/HeroSection'
import FeaturedWork from '@/components/home/FeaturedWork'
import ExperienceHighlights from '@/components/home/ExperienceHighlights'
import AboutSnippet from '@/components/home/AboutSnippet'
import LatestPosts from '@/components/home/LatestPosts'
import ContactCta from '@/components/home/ContactCta'
import JsonLd from '@/components/shared/JsonLd'
import { pageMetadata } from '@/lib/seo'
import { personSchema } from '@/lib/structured-data'
import { SITE_DESCRIPTION, SITE_TITLE } from '@/lib/site'

export const metadata = pageMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: '/',
  absoluteTitle: true,
})

// Each section renders its own <section> with a unique id
export default function HomePage() {
  return (
    <main>
      <JsonLd data={personSchema()} />
      <HeroSection />
      <FeaturedWork />
      <ExperienceHighlights />
      <AboutSnippet />
      <LatestPosts />
      <ContactCta />
    </main>
  )
}
