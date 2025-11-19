import CertificationCard from './CertificationCard'
import type { Certification } from '@/types'

interface CertificationGridProps {
  certifications: Certification[]
}

export default function CertificationGrid({ certifications }: CertificationGridProps) {
  if (!certifications || certifications.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No certifications available yet.</p>
      </div>
    )
  }
  
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {certifications.map((cert) => (
        <CertificationCard key={cert.id} certification={cert} />
      ))}
    </div>
  )
}