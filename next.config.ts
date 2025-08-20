import type { NextConfig } from 'next';
import { i18n } from './next-i18next.config.js';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
    ],
  },
};

export default nextConfig;
