import type { NextConfig } from 'next';
import nextI18NextConfig from './next-i18next.config.js';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: nextI18NextConfig.i18n.locales,
    defaultLocale: nextI18NextConfig.i18n.defaultLocale,
  },
};

export default nextConfig;
