import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join hundreds of students who have transformed their careers through our professional certification programs.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup" className="btn bg-white text-blue-600 hover:bg-gray-100">
            Get Started Now
          </Link>
          <Link href="/contact" className="btn bg-blue-700 text-white hover:bg-blue-900">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}