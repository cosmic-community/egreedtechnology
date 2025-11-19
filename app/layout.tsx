import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Egreed Technology - Empowering Innovation in Rwanda',
    template: '%s | Egreed Technology'
  },
  description: 'Pioneering technology and innovation firm in Rwanda, offering web development, mobile apps, embedded systems, and comprehensive IT training programs.',
  keywords: ['Rwanda technology', 'IT training', 'DevOps', 'web development', 'mobile apps', 'IoT', 'embedded systems'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string
  
  return (
    <html lang="en">
      <head>
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <CosmicBadge bucketSlug={bucketSlug} />
          </div>
        </Providers>
      </body>
    </html>
  )
}