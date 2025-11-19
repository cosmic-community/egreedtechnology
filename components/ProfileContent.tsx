'use client'

import type { User } from '@/types'

interface ProfileContentProps {
  user: User
}

export default function ProfileContent({ user }: ProfileContentProps) {
  const name = user.metadata?.name || 'User'
  const email = user.metadata?.email || ''
  const enrolledCourses = user.metadata?.enrolled_courses || []
  const certifications = user.metadata?.certifications_earned || []
  
  return (
    <div className="space-y-8">
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
        
        <div className="space-y-4">
          <div>
            <label className="label">Full Name</label>
            <p className="text-lg">{name}</p>
          </div>
          
          <div>
            <label className="label">Email Address</label>
            <p className="text-lg">{email}</p>
          </div>
        </div>
      </div>
      
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Enrolled Courses</h2>
        
        {enrolledCourses.length === 0 ? (
          <p className="text-gray-600">You haven't enrolled in any courses yet.</p>
        ) : (
          <ul className="space-y-3">
            {enrolledCourses.map((course, index) => (
              <li key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>{course}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Earned Certifications</h2>
        
        {certifications.length === 0 ? (
          <p className="text-gray-600">You haven't earned any certifications yet.</p>
        ) : (
          <ul className="space-y-3">
            {certifications.map((cert, index) => (
              <li key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>{cert}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}