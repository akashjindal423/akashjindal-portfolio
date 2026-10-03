import HeroSection from '@/components/home/HeroSection'
import AboutSnippet from '@/components/home/AboutSnippet'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import ExperienceHighlights from '@/components/home/ExperienceHighlights'
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel'
import SkillsSnapshot from '@/components/home/SkillsSnapshot'
import TrainingHighlights from '@/components/home/TrainingHighlights'
import LatestPosts from '@/components/home/LatestPosts'
import { pageMetadata } from '@/lib/seo'
import { SITE_DESCRIPTION, SITE_TITLE } from '@/lib/site'

export const metadata = pageMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: '/',
  absoluteTitle: true,
})

export default function HomePage() {
  return (
    <main>
      <section id="hero"><HeroSection /></section>
      <section id="about"><AboutSnippet /></section>
      <section id="projects"><FeaturedProjects /></section>
      <section id="experience"><ExperienceHighlights /></section>
      <section id="testimonials"><TestimonialsCarousel /></section>
      <section id="skills"><SkillsSnapshot /></section>
      <section id="training"><TrainingHighlights /></section>
      <section id="blog"><LatestPosts /></section>
    </main>
  )
}
