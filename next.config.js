/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      child_process: false
    };
    return config;
  },
  experimental: {
    serverActions: {
      enabled: true
    }
  },
  // Disable static page generation for auth pages
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Configure build output
  output: 'standalone',
  // Configure image domains if needed
  images: {
    domains: [],
  },
  // Configure redirects if needed
  async redirects() {
    return [];
  },
  // Configure rewrites if needed
  async rewrites() {
    return [];
  }
};

module.exports = nextConfig;
