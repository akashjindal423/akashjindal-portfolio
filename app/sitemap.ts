import { MetadataRoute } from 'next'
import { getHostedBlogPosts, getProjects } from '@/lib/content'
import { SITE_URL } from '@/lib/site'

type Entry = MetadataRoute.Sitemap[number]

const STATIC_ROUTES: { path: string; changeFrequency: Entry['changeFrequency']; priority: number }[] = [
  { path: '', changeFrequency: 'monthly', priority: 1 },
  { path: '/projects', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/experience', changeFrequency: 'yearly', priority: 0.8 },
  { path: '/about', changeFrequency: 'yearly', priority: 0.8 },
  { path: '/skills', changeFrequency: 'yearly', priority: 0.7 },
  { path: '/toolkit', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/lab', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/training', changeFrequency: 'yearly', priority: 0.6 },
  { path: '/recommendations', changeFrequency: 'yearly', priority: 0.6 },
  { path: '/blog', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.5 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Entry[] = STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency,
    priority,
  }))

  // Project write-ups that have their own page under app/projects/<slug>
  const projects: Entry[] = getProjects()
    .passion.filter((p) => p.clickable)
    .map((p) => ({ url: `${SITE_URL}/projects/${p.slug}`, changeFrequency: 'yearly', priority: 0.8 }))

  // Only blog posts with a body are rendered on this site; the rest link out to LinkedIn
  const posts: Entry[] = getHostedBlogPosts().map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: p.date, changeFrequency: 'yearly', priority: 0.5 }))

  return [...pages, ...projects, ...posts]
}
