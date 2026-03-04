'use client'

import { useState, useMemo } from 'react'
import { getBlogPosts } from '@/lib/content'
import PostCard from '@/components/blog/PostCard'
import PageHeader from '@/components/shared/PageHeader'
import TagFilter from '@/components/blog/TagFilter'
import AnimatedEntry from '@/components/shared/AnimatedEntry'

const posts = getBlogPosts().filter(p => !p.draft)

const allTags = Array.from(new Set(posts.flatMap(p => p.tags)))

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState('All')

  const filtered = useMemo(() =>
    activeTag === 'All' ? posts : posts.filter(p => p.tags.includes(activeTag)),
    [activeTag]
  )

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <PageHeader
        eyebrow="WRITING"
        title="Blog"
        subtitle="Thoughts on product, delivery, and working in tech and banking."
      />

      <TagFilter tags={allTags} activeTag={activeTag} onTag={setActiveTag} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filtered.map((post, i) => (
          <AnimatedEntry key={post.slug} delay={i * 0.08}>
            <PostCard {...post} />
          </AnimatedEntry>
        ))}
      </div>
    </main>
  )
}
