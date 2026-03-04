'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

interface MDXContentProps {
  content: MDXRemoteSerializeResult
}

export default function MDXContent({ content }: MDXContentProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <MDXRemote {...content} />
    </div>
  )
}
