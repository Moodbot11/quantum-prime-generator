/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['vercel.com'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'vercel.app']
    }
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    })
    return config
  }
}

module.exports = nextConfig

