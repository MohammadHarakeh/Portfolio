import { EmailTemplate } from '@/components/email-template'
import { Resend } from 'resend'
import { rateLimit, getClientIP } from '@/lib/rate-limit'
import { validateContactForm } from '@/lib/email-validation'

const resend = new Resend(process.env.RESEND_API_KEY)

// Verify Turnstile token
async function verifyTurnstileToken(token: string): Promise<boolean> {
  if (!token) {
    return false
  }

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: token,
        }),
      }
    )

    const data = await response.json()
    return data.success === true
  } catch (error) {
    console.error('Turnstile verification error:', error)
    return false
  }
}

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request)

    // Rate limiting: 3 requests per 15 minutes per IP
    const rateLimitResult = await rateLimit(clientIP, 3, 15 * 60 * 1000)
    if (!rateLimitResult.success) {
      return Response.json(
        {
          error: 'Too many requests. Please try again later.',
          resetTime: rateLimitResult.resetTime,
        },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil(
              (rateLimitResult.resetTime - Date.now()) / 1000
            ).toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
          },
        }
      )
    }

    // Parse request body
    const body = await request.json()
    const { name, email, projectType, message, turnstileToken } = body

    // Verify CAPTCHA token
    if (!turnstileToken) {
      return Response.json(
        { error: 'CAPTCHA verification required' },
        { status: 400 }
      )
    }

    const isCaptchaValid = await verifyTurnstileToken(turnstileToken)
    if (!isCaptchaValid) {
      return Response.json(
        { error: 'CAPTCHA verification failed. Please try again.' },
        { status: 400 }
      )
    }

    // Validate form data
    const validation = validateContactForm({ name, email, projectType, message })
    if (!validation.isValid) {
      return Response.json(
        { error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      )
    }

    // Get contact email from environment or use default
    const contactEmail = process.env.CONTACT_EMAIL || 'mohammad.d.harakeh@gmail.com'

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Update this after domain verification
      to: [contactEmail],
      replyTo: email,
      subject: `New Contact Form Submission: ${projectType || 'General Inquiry'}`,
      react: EmailTemplate({
        name,
        email,
        projectType: projectType || 'Not specified',
        message,
      }),
    })

    if (error) {
      console.error('Resend error:', error)
      return Response.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      )
    }

    return Response.json(
      {
        success: true,
        message: 'Email sent successfully',
        id: data?.id,
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
        },
      }
    )
  } catch (error) {
    console.error('API error:', error)
    return Response.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}
