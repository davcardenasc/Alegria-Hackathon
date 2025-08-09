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
