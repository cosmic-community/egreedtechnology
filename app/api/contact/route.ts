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
    
    // Send email (will gracefully handle missing RESEND_API_KEY)
    try {
      await sendContactEmail({ name, email, message })
    } catch (emailError) {
      console.error('Email sending failed, but continuing:', emailError)
      // Continue with saving to Cosmic even if email fails
    }
    
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