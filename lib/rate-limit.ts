import { Ratelimit } from "@upstash/ratelimit"

// Check if we're in a production environment with KV available
const isProduction = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN

// Simple in-memory storage for local development
const localRateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Mock redis interface for local development
const mockRedis = {
  async get(key: string) {
    const entry = localRateLimitStore.get(key)
    if (!entry || Date.now() > entry.resetTime) {
      return null
    }
    return entry.count.toString()
  },
  async set(key: string, value: string, options?: any) {
    const count = parseInt(value)
    const resetTime = options?.ex ? Date.now() + (options.ex * 1000) : Date.now() + (15 * 60 * 1000)
    localRateLimitStore.set(key, { count, resetTime })
    return 'OK'
  },
  async incr(key: string) {
    const entry = localRateLimitStore.get(key) || { count: 0, resetTime: Date.now() + (15 * 60 * 1000) }
    entry.count += 1
    localRateLimitStore.set(key, entry)
    return entry.count
  },
  async eval(script: string, keys: string[], args: string[]) {
    // Mock eval for rate limiting scripts - just return success for local dev
    return [1, Date.now() + 900000] // 15 minutes from now
  },
  async evalsha(sha: string, keys: string[], args: string[]) {
    // Mock evalsha for rate limiting scripts - just return success for local dev
    return [1, Date.now() + 900000] // 15 minutes from now
  }
}

let redis: any = mockRedis

if (isProduction) {
  // Use Vercel KV in production
  const { kv } = require("@vercel/kv")
  redis = kv
}

// Create rate limiters with different limits for different endpoints
export const applicationRateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "15 m"), // 5 requests per 15 minutes
  analytics: isProduction,
})

export const generalRateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(100, "1 m"), // 100 requests per minute
  analytics: isProduction,
})

export const authRateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "15 m"), // 10 login attempts per 15 minutes
  analytics: isProduction,
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