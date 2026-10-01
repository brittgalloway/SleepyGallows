/** @type {import('next').NextConfig} */
import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/webdev/:path*',
        destination: 'https://github.com/brittgalloway',
        permanent: true,
      },
    ]
  },
}
 
export default nextConfig