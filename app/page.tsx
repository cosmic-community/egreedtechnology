import { cosmic, hasStatus } from '@/lib/cosmic'
import { generateSEO, generateStructuredData } from '@/lib/seo'
import HeroSection from '@/components/HeroSection'
import CertificationGrid from '@/components/CertificationGrid'
import FeaturedCourses from '@/components/FeaturedCourses'
import CTASection from '@/components/CTASection'
import type { Certification } from '@/types'
import type { Metadata } from 'next'

export const metadata: Metadata = generateSEO({
  title: 'Home - Egreed Technology',
  description: 'Transform your tech career with Egreed Technology. Offering professional certifications in DevOps, Full-Stack Development, Mobile Apps, and IoT Systems in Rwanda.',
  url: '/',
})

async function getCertifications(): Promise<Certification[]> {
  const types = [
    'certified-devops-professional',
    'certified-full-stack-web-developer',
    'certified-mobile-app-developer',
    'certified-embedded-systems-iot-specialist'
  ]
  
  const allCertifications: Certification[] = []
  
  for (const type of types) {
    try {
      const response = await cosmic.objects
        .find({ type })
        .props(['id', 'title', 'slug', 'metadata'])
        .depth(1)
      
      if (response.objects) {
        allCertifications.push(...(response.objects as Certification[]))
      }
    } catch (error) {
      if (!hasStatus(error) || error.status !== 404) {
        console.error(`Error fetching ${type}:`, error)
      }
      // Continue with other types even if one fails
    }
  }
  
  return allCertifications
}

export default async function HomePage() {
  const certifications = await getCertifications()
  
  const structuredData = generateStructuredData({
    '@type': 'Organization',
    name: 'Egreed Technology',
    description: 'Pioneering technology and innovation firm in Rwanda',
    url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    logo: 'https://cdn.cosmicjs.com/b67de7d0-c810-11ed-b01d-23d7b265c299-logo508x500.svg',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'Rwanda',
    },
    sameAs: [
      'https://twitter.com/egreedtech',
      'https://linkedin.com/company/egreed-technology',
    ],
  })
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <HeroSection />
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Professional Certifications
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Earn industry-recognized certifications that validate your expertise and advance your career in technology.
            </p>
          </div>
          
          <CertificationGrid certifications={certifications} />
        </div>
      </section>
      
      <FeaturedCourses />
      
      <CTASection />
    </>
  )
}