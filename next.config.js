/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

const nextConfig = {
  styledComponents: true,
  reactStrictMode: true,
  images: {
    domains: ['file.homacall.com'],
  },
}

module.exports = withPWA(nextConfig)
