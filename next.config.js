/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'www.datocms-assets.com',
        },
      ],
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig
