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
    // BASE_URL: 'http://192.168.29.205:83/services/webapi/',
    BASE_URL: 'https://dev-api.niftytrader.in:83/services/webapi/',
    USER_LIST_DATA: 'AppUser/get-user-list',
    LOGIN: 'AppUser/admin-login',
    USER_ORDER_LIST_DATA: 'AppUser/get-order-list',
    USER_REVIEW_DATA: 'AppUser/get-review-list',
    USER_QUERIES_DATA: 'AppUser/get-query-list',
    ACITVE_PRIME_USER_DATA: 'AppUser/get-active-user-list',
    USER_DETAILS_DATA: 'AppUser/get-user-detail',
    UPDATE_DETAILS_DATA: 'AppUser/update-user-detail',
    STOCK_DATA_LIST: 'stock/get-stock-list',
    DELETE_STOCK_DATA_LIST: 'stock/delete-stock-by-id',
    CREATE_STOCK_DATA_LIST: 'stock/save-stock',
    GET_STOCK_DATA_LIST: 'stock/get-stock-by-id',
    GET_NIFTY50_DATA_LIST: 'stock/get-nifty50-list',
    GET_FNOLIST_DATA_LIST: 'stock/get-fno-list',
    GET_TERMS_DATA: 'terms/terms-list',
    SAVE_TERMS_DATA: 'terms/save-terms',
    DELETE_TERMS_DATA: 'terms/delete-terms',
    UPDATE_TERMS_DATA: 'terms/get-terms-by-id',
    INDIAN_STOCK_DATA: 'stock/indian-stock-list',
    BORKER_REVIEW_DATA: 'broker/get-broker-review-list',
    UPDATE_BORKER_REVIEW_DATA: 'broker/save-broker-review',
    BORKER_ENQUIRY_DATA: 'broker/get-broker-ac-enquiry-list',
    COMPARE_BORKER_LIST_DATA: 'broker/get-compare-broker-list',
    ADD_BORKER_DATA: 'broker/save-compare-broker',
    DELETE_BORKER_DATA: 'broker/delete-compare-broker-by-id',
    UPDATE_BORKER_DATA: 'broker/get-compare-broker-by-id',
    GET_PRIME_PLAN_DATA: 'prime/get-prime-plan-list',
    DELETE_PRIME_PLAN_DATA: 'prime/delete-prime-plan-by-id',
    UPDATE_PRIME_PLAN_DATA: 'prime/get-prime-plan-by-id',
    SAVE_PRIME_PLAN_DATA: 'prime/save-prime-plan',
    GET_GLOVAL_SETTING_DATA: 'settings/get-global-setting',
    SAVE_GLOVAL_SETTING_DATA: 'settings/save-global-setting',
    GET_GENRAL_PROMO_LIST: 'settings/get-general-promo-list',
    UPDATE_GENRAL_PROMO_LIST: 'settings/get-general-promo-by-id',
    ADD_GENRAL_PROMO_LIST: 'settings/save-general-promo',
    GET_GLOBAL_PROMO_LIST: 'settings/get-promo-global',
    SAVE_GLOBAL_PROMO_LIST: 'settings/save-promo-global',
    GET_ALERT_DATA: 'settings/get-alert-data',
    SAVE_ALERT_DATA: 'settings/save-alert-data',
    GET_APP_VERSION: 'settings/get-version-data',
    UPDATE_APP_VERSION: 'settings/save-version-data',
    GET_SCREENER_LIST_DATA: 'screener/get-screener-group-list',
    ADD_SCREENER_LIST_DATA: 'screener/save-screener-group',
    DELETE_SCREENER_LIST_DATA: 'screener/delete-screener-group-by-id',
    UPDATE_SCREENER_LIST_DATA: 'screener/get-screener-group-by-id',
  },
};

module.exports = nextConfig;
