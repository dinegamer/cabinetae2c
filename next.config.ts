/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@splinetool/react-spline'],
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['maps.googleapis.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/maps/:path*',
        destination: 'https://maps.googleapis.com/maps/api/:path*',
      },
    ]
  }
}

module.exports = nextConfig