/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      { hostname: '*.googleapis.com' },
      { hostname: '*.fbcdn.net' },
      { hostname: '*.instagram.com' },
      { hostname: '*.twitter.com' },
      { hostname: '*.twimg.com' },
      { hostname: '*.ytimg.com' },
      { hostname: '*.linkedin.com' },
      { hostname: '*.lnkd.in' },
    ],
  },
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
