import { cosmic, hasStatus } from '@/lib/cosmic'
import type { BlogPost, Certification } from '@/types'

export async function GET() {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  
  const staticPages = [
    '',
    '/blog',
    '/contact',
    '/login',
    '/signup',
    '/search',
  ]
  
  const urls: string[] = staticPages.map(page => `
    <url>
      <loc>${baseUrl}${page}</loc>
      <changefreq>weekly</changefreq>
      <priority>${page === '' ? '1.0' : '0.8'}</priority>
    </url>
  `)
  
  // Add blog posts
  try {
    const response = await cosmic.objects
      .find({ type: 'blog-posts' })
      .props(['slug', 'modified_at'])
    
    if (response.objects) {
      const blogUrls = (response.objects as BlogPost[]).map(post => `
        <url>
          <loc>${baseUrl}/blog/${post.slug}</loc>
          <lastmod>${post.modified_at}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.6</priority>
        </url>
      `)
      urls.push(...blogUrls)
    }
  } catch (error) {
    if (!hasStatus(error) || error.status !== 404) {
      console.error('Error fetching blog posts for sitemap:', error)
    }
  }
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.join('')}
    </urlset>
  `
  
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}