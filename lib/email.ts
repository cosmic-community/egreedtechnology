import { Resend } from 'resend'
import type { ContactFormData } from '@/types'

// Lazy initialization to avoid build-time errors
let resendClient: Resend | null = null

function getResendClient(): Resend | null {
  if (resendClient) {
    return resendClient
  }
  
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set - email functionality will be disabled')
    return null
  }
  
  resendClient = new Resend(apiKey)
  return resendClient
}

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const { name, email, message } = data
  
  const resend = getResendClient()
  
  // If Resend is not configured, log and return without throwing
  if (!resend) {
    console.log('Email not sent - RESEND_API_KEY not configured')
    console.log('Contact form submission:', { name, email, message })
    return
  }
  
  try {
    await resend.emails.send({
      from: 'contact@yourdomain.com', // Replace with your verified domain
      to: 'contact@yourdomain.com', // Replace with your email
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })
  } catch (error) {
    console.error('Failed to send email:', error)
    throw new Error('Failed to send email')
  }
}