import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://akashjindal.dev', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: 'https://akashjindal.dev/projects', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://akashjindal.dev/experience', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
    { url: 'https://akashjindal.dev/skills', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
    { url: 'https://akashjindal.dev/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://akashjindal.dev/about', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
    { url: 'https://akashjindal.dev/contact', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
  ]
}
