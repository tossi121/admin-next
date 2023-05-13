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
    USER_ORDER_LIST_DATA: 'AppUser/get-order-list',
    USER_REVIEW_DATA: 'AppUser/get-review-list',
    USER_QUERIES_DATA: 'AppUser/get-query-list',
    ACITVE_PRIME_USER_DATA: 'AppUser/get-active-user-list',
    USER_DETAILS_DATA: 'AppUser/get-user-detail',
    UPDATE_DETAILS_DATA: 'AppUser/update-user-detail',
  },
};

module.exports = nextConfig;
