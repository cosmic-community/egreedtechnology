'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { SearchResult } from '@/types'

export default function SearchInterface() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [filter, setFilter] = useState<'all' | 'certification' | 'blog-post'>(
    (searchParams.get('type') as any) || 'all'
  )
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length >= 2) {
        performSearch()
      } else {
        setResults([])
      }
    }, 300)
    
    return () => clearTimeout(delayDebounce)
  }, [query, filter])
  
  const performSearch = async () => {
    setLoading(true)
    
    try {
      const params = new URLSearchParams({ q: query })
      if (filter !== 'all') {
        params.append('type', filter)
      }
      
      const response = await fetch(`/api/search?${params}`)
      const data = await response.json()
      
      setResults(data.results || [])
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="card">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Search for courses, certifications, or articles..."
            className="input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('certification')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'certification'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Certifications
            </button>
            <button
              onClick={() => setFilter('blog-post')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'blog-post'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Blog Posts
            </button>
          </div>
        </div>
      </div>
      
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      
      {!loading && query.length >= 2 && results.length === 0 && (
        <div className="text-center py-8 text-gray-600">
          No results found for "{query}"
        </div>
      )}
      
      {!loading && results.length > 0 && (
        <div className="space-y-4">
          {results.map((result) => (
            <a
              key={result.id}
              href={
                result.type === 'blog-post'
                  ? `/blog/${result.slug}`
                  : `#${result.slug}`
              }
              className="card block hover:shadow-xl transition-shadow"
            >
              <div className="flex gap-4">
                {result.thumbnail && (
                  <img
                    src={`${result.thumbnail}?w=320&h=180&fit=crop&auto=format,compress`}
                    alt={result.title}
                    className="w-40 h-24 object-cover rounded-lg"
                  />
                )}
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                      {result.type === 'certification' ? 'Certification' : 'Blog Post'}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2">{result.title}</h3>
                  
                  {result.excerpt && (
                    <p className="text-gray-600 text-sm line-clamp-2">{result.excerpt}</p>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}