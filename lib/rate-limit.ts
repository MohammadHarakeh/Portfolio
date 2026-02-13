// Simple in-memory rate limiting for serverless functions
// Note: This works per-instance. For multi-instance deployments, consider Vercel KV

interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(key)
    }
  }
}, 5 * 60 * 1000)

export async function rateLimit(
  identifier: string,
  maxRequests: number = 3,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): Promise<{ success: boolean; remaining: number; resetTime: number }> {
  const now = Date.now()
  const entry = rateLimitMap.get(identifier)

  if (!entry || now > entry.resetTime) {
    // Create new entry or reset expired one
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    })
    return {
      success: true,
      remaining: maxRequests - 1,
      resetTime: now + windowMs,
    }
  }

  if (entry.count >= maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetTime: entry.resetTime,
    }
  }

  // Increment count
  entry.count++
  return {
    success: true,
    remaining: maxRequests - entry.count,
    resetTime: entry.resetTime,
  }
}

export function getClientIP(request: Request): string {
  // Try to get IP from various headers (for proxies/load balancers)
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }

  // Fallback (won't work in serverless, but good for local dev)
  return 'unknown'
}
