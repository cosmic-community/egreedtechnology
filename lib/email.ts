import { Resend } from 'resend'
import type { ContactFormData } from '@/types'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const { name, email, message } = data
  
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