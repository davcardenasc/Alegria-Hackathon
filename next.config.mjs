/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable ESLint and TypeScript checks during builds for better code quality
  // Note: If you need to temporarily disable these for deployment, 
  // consider fixing the underlying issues instead
  eslint: {
    // ignoreDuringBuilds: false, // Default behavior - enable ESLint checks
  },
  typescript: {
    // ignoreBuildErrors: false, // Default behavior - enable TypeScript checks
  },
  
  // Image optimization disabled - consider enabling for production
  // This may be needed for static exports or specific deployment requirements
  images: {
    unoptimized: true,
  },
  
  // Security headers to improve domain reputation and trust
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ]
  },
  
  // Enable experimental features if needed
  experimental: {
    // Add any experimental features here
  },
  
  // Environment variables validation (optional but recommended)
  env: {
    // Add any public environment variables here
  },
}

export default nextConfig
