import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import { Clock } from 'lucide-react'
import { format } from 'date-fns'
import { getBlogPostBySlug, getBlogPosts } from '@/lib/content'
import Badge from '@/components/shared/Badge'
import PostCard from '@/components/blog/PostCard'
import MDXContent from '@/components/blog/MDXContent'
import CopyLinkButton from '@/components/blog/CopyLinkButton'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) return {}
  return { title: post.title, description: post.excerpt }
}

export async function generateStaticParams() {
  return getBlogPosts()
    .filter(p => !p.draft)
    .map(p => ({ slug: p.slug }))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  const mdxPath = path.join(process.cwd(), 'content/blog', `${slug}.mdx`)
  let mdxSource: string | null = null
  if (fs.existsSync(mdxPath)) {
    const raw = fs.readFileSync(mdxPath, 'utf-8')
    const { content } = matter(raw)
    mdxSource = content
  }

  const related = getBlogPosts()
    .filter(p => !p.draft && p.slug !== slug && p.tags.some(t => post.tags.includes(t)))
    .slice(0, 2)

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/blog" className="text-violet-400 text-sm hover:text-violet-300 transition-colors mb-8 inline-block">
        ← All Articles
      </Link>

      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
      </div>

      <h1 className="text-4xl md:text-5xl font-bold leading-tight text-text-primary">{post.title}</h1>

      <div className="flex items-center gap-4 mt-4 text-sm text-text-muted">
        <span>{format(new Date(post.date), 'd MMM yyyy')}</span>
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {post.readingTime} min read
        </span>
      </div>

      <hr className="border-[var(--border)] mt-8 mb-8" />

      {mdxSource && <MDXContent source={mdxSource} />}

      <div className="mt-12 pt-8 border-t border-[var(--border)]">
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
        </div>

        <div className="mb-10">
          <p className="text-sm text-text-muted mb-2">Share this article</p>
          <CopyLinkButton />
        </div>

        {related.length > 0 && (
          <>
            <h2 className="text-xl font-semibold text-text-primary mb-4">More articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map(p => <PostCard key={p.slug} {...p} />)}
            </div>
          </>
        )}
      </div>
    </main>
  )
}
