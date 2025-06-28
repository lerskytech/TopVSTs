/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/avif', 'image/webp'],
  },
  eslint: {
    dirs: ['src'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
}

module.exports = nextConfig
