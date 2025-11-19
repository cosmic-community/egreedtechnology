import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { getUserByEmail } from '@/lib/auth'
import { generateSEO } from '@/lib/seo'
import ProfileContent from '@/components/ProfileContent'
import type { Metadata } from 'next'

export const metadata: Metadata = generateSEO({
  title: 'Profile',
  description: 'Manage your profile and view your enrolled courses and certifications.',
  url: '/profile',
})

export default async function ProfilePage() {
  const session = await getServerSession()
  
  if (!session?.user?.email) {
    redirect('/login')
  }
  
  const user = await getUserByEmail(session.user.email)
  
  if (!user) {
    redirect('/login')
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Profile</h1>
        <ProfileContent user={user} />
      </div>
    </div>
  )
}