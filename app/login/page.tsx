import { generateSEO } from '@/lib/seo'
import LoginForm from '@/components/LoginForm'
import type { Metadata } from 'next'

export const metadata: Metadata = generateSEO({
  title: 'Login',
  description: 'Login to your Egreed Technology account to access courses and track your certifications.',
  url: '/login',
})

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Login to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a href="/signup" className="font-medium text-primary hover:text-blue-700">
              create a new account
            </a>
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}