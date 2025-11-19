import type { Metadata } from 'next'

interface SEOProps {
  title: string
  description: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  author?: string
  tags?: string[]
}

export function generateSEO({
  title,
  description,
  image = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=630&fit=crop&auto=format,compress',
  url,
  type = 'website',
  publishedTime,
  author,
  tags = []
}: SEOProps): Metadata {
  const siteUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'Egreed Technology',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
      ...(type === 'article' && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: fullUrl,
    },
    keywords: tags.join(', '),
  }
}

export function generateStructuredData(data: any) {
  return {
    '@context': 'https://schema.org',
    ...data,
  }
}