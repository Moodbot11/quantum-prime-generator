import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['vercel.com'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'vercel.app']
    }
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

export default nextConfig

