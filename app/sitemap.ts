import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://akashjindal.com', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: 'https://akashjindal.com/projects', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://akashjindal.com/experience', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
    { url: 'https://akashjindal.com/skills', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
    { url: 'https://akashjindal.com/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://akashjindal.com/about', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
    { url: 'https://akashjindal.com/contact', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
  ]
}
