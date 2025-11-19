import { NextResponse } from 'next/server'
import { cosmic, hasStatus } from '@/lib/cosmic'
import type { SearchResult, Certification, Course, BlogPost } from '@/types'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  const type = searchParams.get('type')
  
  if (!query) {
    return NextResponse.json({ results: [] })
  }
  
  const results: SearchResult[] = []
  
  try {
    // Search certifications
    if (!type || type === 'certification') {
      const certTypes = [
        'certified-devops-professional',
        'certified-full-stack-web-developer',
        'certified-mobile-app-developer',
        'certified-embedded-systems-iot-specialist'
      ]
      
      for (const certType of certTypes) {
        try {
          const response = await cosmic.objects
            .find({ type: certType })
            .props(['id', 'title', 'slug', 'metadata'])
            .depth(0)
          
          if (response.objects) {
            const filtered = (response.objects as Certification[]).filter(cert =>
              cert.title.toLowerCase().includes(query.toLowerCase()) ||
              cert.metadata?.description?.toLowerCase().includes(query.toLowerCase())
            )
            
            results.push(...filtered.map(cert => ({
              id: cert.id,
              type: 'certification' as const,
              title: cert.title,
              slug: cert.slug,
              excerpt: cert.metadata?.description?.substring(0, 150),
              thumbnail: cert.metadata?.badge?.imgix_url
            })))
          }
        } catch (error) {
          if (!hasStatus(error) || error.status !== 404) {
            console.error(`Error searching ${certType}:`, error)
          }
        }
      }
    }
    
    // Search blog posts
    if (!type || type === 'blog-post') {
      try {
        const response = await cosmic.objects
          .find({ type: 'blog-posts' })
          .props(['id', 'title', 'slug', 'metadata'])
          .depth(0)
        
        if (response.objects) {
          const filtered = (response.objects as BlogPost[]).filter(post =>
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.metadata?.excerpt?.toLowerCase().includes(query.toLowerCase()) ||
            post.metadata?.content?.toLowerCase().includes(query.toLowerCase())
          )
          
          results.push(...filtered.map(post => ({
            id: post.id,
            type: 'blog-post' as const,
            title: post.title,
            slug: post.slug,
            excerpt: post.metadata?.excerpt || post.metadata?.content?.substring(0, 150),
            thumbnail: post.metadata?.featured_image?.imgix_url
          })))
        }
      } catch (error) {
        if (!hasStatus(error) || error.status !== 404) {
          console.error('Error searching blog posts:', error)
        }
      }
    }
    
    return NextResponse.json({ results: results.slice(0, 10) })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    )
  }
}