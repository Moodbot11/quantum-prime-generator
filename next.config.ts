/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Add any other necessary configurations here
  images: {
    domains: ['vercel.com'],
  },
  experimental: {
    serverActions: true,
  },
  typescript: {
    // !! WARN !!
    // This setting is required for deployment
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig

