/** @type {import('next').NextConfig} */
import type { NextConfig } from 'next'

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io",
  "media-src 'self' https://cdn.sanity.io",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-src https://ko-fi.com https://www.youtube.com https://www.youtube-nocookie.com",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "upgrade-insecure-requests",
].join('; ');


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
  async headers() {
    return [
      {
        source: '/((?!admin).*)',
        headers: [{ key: 'Content-Security-Policy-Report-Only', value: csp }],
      },
    ];
  },
}
 
export default nextConfig