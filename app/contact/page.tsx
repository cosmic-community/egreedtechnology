import { generateSEO } from '@/lib/seo'
import ContactForm from '@/components/ContactForm'
import type { Metadata } from 'next'

export const metadata: Metadata = generateSEO({
  title: 'Contact Us',
  description: 'Get in touch with Egreed Technology. We\'re here to answer your questions about our courses, certifications, and services.',
  url: '/contact',
})

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600 text-lg">
            Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <ContactForm />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Location</h3>
                <p className="text-gray-600">Kigali, Rwanda</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Email</h3>
                <p className="text-gray-600">info@egreedtech.com</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Office Hours</h3>
                <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="text-primary hover:text-blue-700">Twitter</a>
                  <a href="#" className="text-primary hover:text-blue-700">LinkedIn</a>
                  <a href="#" className="text-primary hover:text-blue-700">GitHub</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}