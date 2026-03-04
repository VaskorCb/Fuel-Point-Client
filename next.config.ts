import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/lab', 'notistack', 'react-hook-form', 'dayjs'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9001',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'prium.github.io',
        pathname: '/aurora/images/**',
      },
    ],
  },
};

export default nextConfig;
