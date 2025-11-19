import { generateSEO } from '@/lib/seo'
import SignupForm from '@/components/SignupForm'
import type { Metadata } from 'next'

export const metadata: Metadata = generateSEO({
  title: 'Sign Up',
  description: 'Create your Egreed Technology account and start your journey in technology education.',
  url: '/signup',
})

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a href="/login" className="font-medium text-primary hover:text-blue-700">
              login to existing account
            </a>
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  )
}