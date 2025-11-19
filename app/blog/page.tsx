import { cosmic, hasStatus } from '@/lib/cosmic'
import { generateSEO } from '@/lib/seo'
import BlogPostCard from '@/components/BlogPostCard'
import Pagination from '@/components/Pagination'
import type { BlogPost } from '@/types'
import type { Metadata } from 'next'

export const metadata: Metadata = generateSEO({
  title: 'Blog',
  description: 'Read the latest articles about technology, development, and innovation from Egreed Technology.',
  url: '/blog',
})

async function getBlogPosts(page: number = 1): Promise<{ posts: BlogPost[], total: number }> {
  const limit = 9
  const skip = (page - 1) * limit
  
  try {
    const response = await cosmic.objects
      .find({ type: 'blog-posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    if (!response.objects) {
      return { posts: [], total: 0 }
    }
    
    // Manual sorting by published_date (newest first)
    const sortedPosts = (response.objects as BlogPost[]).sort((a, b) => {
      const dateA = new Date(a.metadata?.published_date || '').getTime()
      const dateB = new Date(b.metadata?.published_date || '').getTime()
      return dateB - dateA
    })
    
    return {
      posts: sortedPosts.slice(skip, skip + limit),
      total: sortedPosts.length
    }
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return { posts: [], total: 0 }
    }
    throw error
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page: pageParam } = await searchParams
  const currentPage = Number(pageParam) || 1
  const { posts, total } = await getBlogPosts(currentPage)
  const totalPages = Math.ceil(total / 9)
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Insights, tutorials, and stories about technology and innovation.
        </p>
      </div>
      
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No blog posts available yet.</p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/blog"
            />
          )}
        </>
      )}
    </div>
  )
}