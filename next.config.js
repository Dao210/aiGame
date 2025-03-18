/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdn.jsdelivr.net'], // 允许从 CDN 加载字体
  },
};

module.exports = nextConfig; 