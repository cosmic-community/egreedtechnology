import { NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/email'
import { cosmic } from '@/lib/cosmic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body
    
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Send email
    await sendContactEmail({ name, email, message })
    
    // Save to Cosmic
    await cosmic.objects.insertOne({
      type: 'contact-submissions',
      title: `Contact from ${name}`,
      slug: `contact-${Date.now()}`,
      metadata: {
        name,
        email,
        message,
        submitted_at: new Date().toISOString(),
        status: 'new'
      }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}