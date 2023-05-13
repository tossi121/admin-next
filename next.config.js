/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    BASE_URL: 'http://192.168.29.205:83/services/webapi/',
    USER_LIST_DATA: 'AppUser/get-user-list',
    LOGIN: 'AppUser/admin-login',
  },
};

module.exports = nextConfig;
