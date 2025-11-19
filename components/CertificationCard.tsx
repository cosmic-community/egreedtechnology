import type { Certification } from '@/types'

interface CertificationCardProps {
  certification: Certification
}

export default function CertificationCard({ certification }: CertificationCardProps) {
  const badge = certification.metadata?.badge
  const level = certification.metadata?.level || 'Professional'
  const skills = certification.metadata?.skills || []
  
  return (
    <div className="card">
      {badge && (
        <img
          src={`${badge.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
          alt={certification.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      
      <div className="mb-3">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
          {level}
        </span>
      </div>
      
      <h3 className="text-xl font-bold mb-2">{certification.title}</h3>
      
      <p className="text-gray-600 mb-4 line-clamp-3">
        {certification.metadata?.description}
      </p>
      
      {skills.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-sm text-gray-700 mb-2">Skills Covered:</h4>
          <div className="flex flex-wrap gap-2">
            {skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
              >
                {skill}
              </span>
            ))}
            {skills.length > 3 && (
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                +{skills.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
      
      <a
        href={`#${certification.slug}`}
        className="text-primary hover:text-blue-700 font-medium inline-flex items-center"
      >
        Learn More
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  )
}