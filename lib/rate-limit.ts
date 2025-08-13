import { Ratelimit } from "@upstash/ratelimit"
import { kv } from "@vercel/kv"

// Use Vercel KV (built-in Redis) - automatically configured in Vercel
const redis = kv

// Create rate limiters with different limits for different endpoints
export const applicationRateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "15 m"), // 5 requests per 15 minutes
  analytics: true,
})

export const generalRateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(100, "1 m"), // 100 requests per minute
  analytics: true,
})

export const authRateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "15 m"), // 10 login attempts per 15 minutes
  analytics: true,
})

// Helper function to get client IP
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")
  
  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  return "unknown"
}

// Rate limit wrapper for API routes
export async function withRateLimit(
  request: Request,
  rateLimit: typeof applicationRateLimit,
  identifier?: string
) {
  const ip = identifier || getClientIP(request)
  const { success, limit, reset, remaining } = await rateLimit.limit(ip)

  return {
    success,
    limit,
    reset,
    remaining,
    headers: {
      "X-RateLimit-Limit": limit.toString(),
      "X-RateLimit-Remaining": remaining.toString(),
      "X-RateLimit-Reset": new Date(reset).toISOString(),
    },
  }
}