'use client'

import Link from 'next/link'
import SectionWrapper from '@/components/shared/SectionWrapper'
import AnimatedEntry from '@/components/shared/AnimatedEntry'
import PostCard from '@/components/blog/PostCard'
import { getBlogPosts } from '@/lib/content'

const posts = getBlogPosts().filter((p) => !p.draft).slice(0, 3)

export default function LatestPosts() {
  return (
    <SectionWrapper id="blog">
      {/* Header */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <span className="block text-violet-400 text-xs uppercase tracking-widest mb-2">
            Writing
          </span>
          <h2 className="text-3xl font-bold text-text-primary">Latest Writing</h2>
        </div>
        <Link
          href="/blog"
          className="text-violet-400 text-sm hover:text-violet-300 transition-colors duration-200 whitespace-nowrap"
        >
          All articles →
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <AnimatedEntry key={post.slug} delay={i * 0.1} className="group">
            <PostCard {...post} />
          </AnimatedEntry>
        ))}
      </div>
    </SectionWrapper>
  )
}
