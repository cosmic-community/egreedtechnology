'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'

export default function Header() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="https://cdn.cosmicjs.com/b67de7d0-c810-11ed-b01d-23d7b265c299-logo508x500.svg"
              alt="Egreed Technology"
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-primary">Egreed Technology</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="/search" className="text-gray-700 hover:text-primary transition-colors">
              Search
            </Link>
            
            {session ? (
              <>
                <Link href="/profile" className="text-gray-700 hover:text-primary transition-colors">
                  Profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="btn btn-secondary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-primary transition-colors">
                  Login
                </Link>
                <Link href="/signup" className="btn btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <Link href="/" className="block text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/blog" className="block text-gray-700 hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="block text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="/search" className="block text-gray-700 hover:text-primary transition-colors">
              Search
            </Link>
            
            {session ? (
              <>
                <Link href="/profile" className="block text-gray-700 hover:text-primary transition-colors">
                  Profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left text-gray-700 hover:text-primary transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block text-gray-700 hover:text-primary transition-colors">
                  Login
                </Link>
                <Link href="/signup" className="block text-gray-700 hover:text-primary transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}