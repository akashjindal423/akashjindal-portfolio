import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Blog',
  description:
    'Articles by Akash Jindal on product ownership, agile delivery and product thinking, published on LinkedIn.',
  path: '/blog',
})

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
