export default function FeaturedCourses() {
  const courses = [
    {
      title: 'DevOps Fundamentals & CI/CD Pipeline',
      description: 'Master modern DevOps practices, containerization with Docker, and automated deployment pipelines.',
      duration: '8 weeks',
      level: 'Intermediate',
    },
    {
      title: 'Full-Stack Web Development',
      description: 'Build complete web applications using React, Node.js, and modern development tools.',
      duration: '12 weeks',
      level: 'Beginner to Advanced',
    },
    {
      title: 'Mobile App Development',
      description: 'Create cross-platform mobile applications with React Native for iOS and Android.',
      duration: '10 weeks',
      level: 'Intermediate',
    },
  ]
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Courses</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive training programs designed to take you from beginner to professional.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div key={index} className="card">
              <h3 className="text-xl font-bold mb-3">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>⏱️ {course.duration}</span>
                <span>📊 {course.level}</span>
              </div>
              
              <a
                href="#"
                className="text-primary hover:text-blue-700 font-medium inline-flex items-center"
              >
                View Details
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}