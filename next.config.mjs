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
  
  // Image optimization re-enabled for better performance
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    domains: ['localhost'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Enable gzip compression
  compress: true,
  
  // Enable SWC minification
  swcMinify: true,
  
  // Optimize bundle
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
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
