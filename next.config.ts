/** @type {import('next').NextConfig} */
import type { NextConfig } from 'next'
const path = require('path')
 
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}
 
export default nextConfig