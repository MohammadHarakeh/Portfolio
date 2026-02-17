import { Resend } from 'resend'
import { rateLimit, getClientIP } from '@/lib/rate-limit'
import { validateContactForm } from '@/lib/email-validation'

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

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
    const clientIP = getClientIP(request);

    // Rate limiting: 3 requests per 15 minutes per IP
    const rateLimitResult = await rateLimit(clientIP, 3, 15 * 60 * 1000);
    if (!rateLimitResult.success) {
      return Response.json(
        {
          error: "Too many requests. Please try again later.",
          resetTime: rateLimitResult.resetTime,
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil(
              (rateLimitResult.resetTime - Date.now()) / 1000,
            ).toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateLimitResult.resetTime.toString(),
          },
        },
      );
    }

    // Parse request body
    const body = await request.json();
    const { name, email, projectType, message, turnstileToken } = body;

    // Verify CAPTCHA token
    if (!turnstileToken) {
      return Response.json(
        { error: "CAPTCHA verification required" },
        { status: 400 },
      );
    }

    const isCaptchaValid = await verifyTurnstileToken(turnstileToken);
    if (!isCaptchaValid) {
      return Response.json(
        { error: "CAPTCHA verification failed. Please try again." },
        { status: 400 },
      );
    }

    // Validate form data
    const validation = validateContactForm({
      name,
      email,
      projectType,
      message,
    });
    if (!validation.isValid) {
      return Response.json(
        { error: "Validation failed", errors: validation.errors },
        { status: 400 },
      );
    }

    // Get contact email from environment or use default
    const contactEmail =
      process.env.CONTACT_EMAIL || "mohammad.d.harakeh@gmail.com";

    // Get sender email from environment (use verified domain) or fallback to Resend test domain
    const fromEmail =
      process.env.RESEND_FROM_EMAIL ||
      "Portfolio Contact <onboarding@resend.dev>";

    // Validate environment variables
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set')
      return Response.json(
        { error: 'Server configuration error. Please contact the administrator.' },
        { status: 500 }
      )
    }

    // Initialize Resend client (after validation to prevent build-time errors)
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Send email via Resend
    try {
      // Build HTML body (avoids React serialization issues in serverless)
      const projectLabel = projectType || "Not specified";
      const html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 10px;">New Contact Form Submission</h1>
          <div style="margin-top: 30px;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">Contact Information</h2>
            <p><strong style="color: #4b5563;">Name:</strong> ${escapeHtml(name)}</p>
            <p><strong style="color: #4b5563;">Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color: #10b981;">${escapeHtml(email)}</a></p>
            <p><strong style="color: #4b5563;">Project Type:</strong> ${escapeHtml(projectLabel)}</p>
          </div>
          <div style="margin-top: 30px;">
            <h2 style="color: #1f2937; margin-bottom: 15px;">Message</h2>
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; white-space: pre-wrap;">${escapeHtml(message)}</div>
          </div>
          <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">This email was sent from your portfolio contact form. Reply directly to respond to ${escapeHtml(name)}.</p>
        </div>
      `;

      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: [contactEmail],
        replyTo: email,
        subject: `New Contact Form Submission: ${projectType || "General Inquiry"}`,
        html,
      });

      if (error) {
        console.error("Resend error:", error);
        const err = error as { message?: string; name?: string };
        const resendMessage = err?.message ?? (typeof error === 'string' ? error : 'Unknown Resend error');
        const resendCode = err?.name ?? null;
        return Response.json(
          {
            error: "Failed to send email. Please try again later.",
            reason: resendMessage,
            ...(resendCode && { code: resendCode }),
          },
          { status: 500 }
        );
      }

      return Response.json(
        {
          success: true,
          message: "Email sent successfully",
          id: data?.id,
        },
        {
          status: 200,
          headers: {
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": rateLimitResult.resetTime.toString(),
          },
        }
      );
    } catch (resendError) {
      console.error("Resend send error:", resendError);
      if (resendError instanceof Error) {
        console.error("Resend error message:", resendError.message);
        console.error("Resend error stack:", resendError.stack);
        console.error("Resend error name:", resendError.name);
      }
      const caughtMessage = resendError instanceof Error ? resendError.message : String(resendError);
      return Response.json(
        {
          error: "Failed to send email. Please try again later.",
          reason: caughtMessage,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API error:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    const outerMessage = error instanceof Error ? error.message : String(error);
    return Response.json(
      {
        error: 'An unexpected error occurred. Please try again later.',
        reason: outerMessage,
      },
      { status: 500 }
    )
  }
}
