/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable static file serving and optimization
  output: 'standalone',
  optimizeFonts: true,
  swcMinify: true,
  poweredByHeader: false,
  // Keep existing image configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig

