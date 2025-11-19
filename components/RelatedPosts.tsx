import { cosmic, hasStatus } from '@/lib/cosmic'
import BlogPostCard from './BlogPostCard'
import type { BlogPost, Category } from '@/types'

interface RelatedPostsProps {
  currentPostId: string
  category?: Category
}

async function getRelatedPosts(currentPostId: string, category?: Category): Promise<BlogPost[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'blog-posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    if (!response.objects) {
      return []
    }
    
    const posts = response.objects as BlogPost[]
    
    // Filter out current post
    let filtered = posts.filter(post => post.id !== currentPostId)
    
    // Prioritize posts from same category
    if (category) {
      const sameCategoryPosts = filtered.filter(
        post => post.metadata?.category?.id === category.id
      )
      
      if (sameCategoryPosts.length > 0) {
        filtered = sameCategoryPosts
      }
    }
    
    // Return up to 3 related posts
    return filtered.slice(0, 3)
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

export default async function RelatedPosts({ currentPostId, category }: RelatedPostsProps) {
  const relatedPosts = await getRelatedPosts(currentPostId, category)
  
  if (relatedPosts.length === 0) {
    return null
  }
  
  return (
    <section className="mt-16 pt-16 border-t border-gray-200">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Related Posts</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {relatedPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}