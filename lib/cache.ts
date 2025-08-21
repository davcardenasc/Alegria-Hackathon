import { kv } from "@vercel/kv"

// Use Vercel KV (built-in Redis) - automatically configured in Vercel
const redis = kv

export class Cache {
  private static instance: Cache
  private redis: typeof redis

  private constructor() {
    this.redis = redis
  }

  public static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache()
    }
    return Cache.instance
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await this.redis.get(key)
      return data as T
    } catch (error) {
      console.error('Cache get error:', error)
      return null
    }
  }

  async set(key: string, value: any, ttlSeconds: number = 300): Promise<boolean> {
    try {
      await this.redis.setex(key, ttlSeconds, JSON.stringify(value))
      return true
    } catch (error) {
      console.error('Cache set error:', error)
      return false
    }
  }

  async del(key: string): Promise<boolean> {
    try {
      await this.redis.del(key)
      return true
    } catch (error) {
      console.error('Cache delete error:', error)
      return false
    }
  }

  async invalidatePattern(pattern: string): Promise<void> {
    try {
      const keys = await this.redis.keys(pattern)
      if (keys.length > 0) {
        await this.redis.del(...keys)
      }
    } catch (error) {
      console.error('Cache invalidate pattern error:', error)
    }
  }

  // Helper method for caching database queries
  async cachedQuery<T>(
    key: string,
    queryFn: () => Promise<T>,
    ttlSeconds: number = 300
  ): Promise<T> {
    // Try to get from cache first
    const cached = await this.get<T>(key)
    if (cached !== null) {
      return cached
    }

    // If not in cache, execute query
    const result = await queryFn()
    
    // Cache the result
    await this.set(key, result, ttlSeconds)
    
    return result
  }
}

// Pre-defined cache keys
export const CacheKeys = {
  // Applications
  applications: (status?: string, page?: number) => 
    `applications:${status || 'all'}:page:${page || 1}`,
  applicationCount: (status?: string) => 
    `applications:count:${status || 'all'}`,
  
  // School Applications  
  schoolApplications: (status?: string, page?: number) => 
    `school_applications:${status || 'all'}:page:${page || 1}`,
  schoolApplicationCount: (status?: string) => 
    `school_applications:count:${status || 'all'}`,
    
  // Admin dashboard stats
  dashboardStats: 'dashboard:stats',
  
  // Email templates
}

// Cache TTL values (in seconds)
export const CacheTTL = {
  SHORT: 60,        // 1 minute
  MEDIUM: 300,      // 5 minutes  
  LONG: 1800,       // 30 minutes
  VERY_LONG: 3600,  // 1 hour
}

export default Cache.getInstance()