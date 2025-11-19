import Link from 'next/link'
import type { BlogPost } from '@/types'

interface BlogPostCardProps {
  post: BlogPost
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const featuredImage = post.metadata?.featured_image
  const excerpt = post.metadata?.excerpt || ''
  const author = post.metadata?.author
  const publishedDate = post.metadata?.published_date
  const readingTime = post.metadata?.reading_time
  
  return (
    <Link href={`/blog/${post.slug}`} className="card block hover:shadow-xl transition-shadow">
      {featuredImage && (
        <img
          src={`${featuredImage.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
          alt={post.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      
      <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
      
      <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>
      
      <div className="flex items-center gap-4 text-sm text-gray-500">
        {author && (
          <div className="flex items-center gap-2">
            {author.metadata?.avatar && (
              <img
                src={`${author.metadata.avatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                alt={author.title}
                className="w-6 h-6 rounded-full"
              />
            )}
            <span>{author.title}</span>
          </div>
        )}
        
        {publishedDate && (
          <time dateTime={publishedDate}>
            {new Date(publishedDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </time>
        )}
        
        {readingTime && <span>{readingTime} min read</span>}
      </div>
    </Link>
  )
}