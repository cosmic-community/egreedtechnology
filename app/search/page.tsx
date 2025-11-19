import { generateSEO } from '@/lib/seo'
import SearchInterface from '@/components/SearchInterface'
import type { Metadata } from 'next'

export const metadata: Metadata = generateSEO({
  title: 'Search',
  description: 'Search for courses, certifications, and blog posts at Egreed Technology.',
  url: '/search',
})

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Search</h1>
        <SearchInterface />
      </div>
    </div>
  )
}