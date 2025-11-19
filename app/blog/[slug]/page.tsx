// app/blog/[slug]/page.tsx
import { cosmic, hasStatus } from '@/lib/cosmic'
import { generateSEO, generateStructuredData } from '@/lib/seo'
import { notFound } from 'next/navigation'
import RelatedPosts from '@/components/RelatedPosts'
import type { BlogPost } from '@/types'
import type { Metadata } from 'next'

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'blog-posts',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)
    
    if (!response.object) {
      return null
    }
    
    return response.object as BlogPost
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)
  
  if (!post) {
    return {}
  }
  
  return generateSEO({
    title: post.title,
    description: post.metadata?.excerpt || 'Read more on Egreed Technology blog',
    image: post.metadata?.featured_image?.imgix_url,
    url: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.metadata?.published_date,
    author: post.metadata?.author?.title,
    tags: post.metadata?.tags || [],
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  
  if (!post) {
    notFound()
  }
  
  const structuredData = generateStructuredData({
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metadata?.excerpt,
    image: post.metadata?.featured_image?.imgix_url,
    datePublished: post.metadata?.published_date || post.created_at,
    dateModified: post.modified_at,
    author: {
      '@type': 'Person',
      name: post.metadata?.author?.title || 'Egreed Technology',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Egreed Technology',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cdn.cosmicjs.com/b67de7d0-c810-11ed-b01d-23d7b265c299-logo508x500.svg',
      },
    },
  })
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {post.metadata?.featured_image && (
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
          )}
          
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center gap-4 text-gray-600">
              {post.metadata?.author && (
                <div className="flex items-center gap-2">
                  {post.metadata.author.metadata?.avatar && (
                    <img
                      src={`${post.metadata.author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                      alt={post.metadata.author.title}
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <span>{post.metadata.author.title}</span>
                </div>
              )}
              
              {post.metadata?.published_date && (
                <time dateTime={post.metadata.published_date}>
                  {new Date(post.metadata.published_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              )}
              
              {post.metadata?.reading_time && (
                <span>{post.metadata.reading_time} min read</span>
              )}
            </div>
            
            {post.metadata?.tags && post.metadata.tags.length > 0 && (
              <div className="flex gap-2 mt-4">
                {post.metadata.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>
          
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.metadata?.content || '' }}
          />
        </div>
        
        <RelatedPosts currentPostId={post.id} category={post.metadata?.category} />
      </article>
    </>
  )
}