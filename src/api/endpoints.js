/**
 * PLACEHOLDER — no Copper Road backend exists yet.
 *
 * Swap these URLs and set USE_MOCK_API to false; every service in this folder
 * already has its real `api.*` call written beside the mock branch it returns.
 */
const DEV_API_URL = 'https://copperroad.demoappprojects.com/public/api';
const LIVE_API_URL = 'https://api.copperroadmainecoons.com/public/api';

export const API_DOMAIN = __DEV__ ? DEV_API_URL : LIVE_API_URL;

/** While true, services resolve from src/lib/copper-data.js instead of the network. */
export const USE_MOCK_API = true;

export const ENDPOINTS = {
  AUTH_LOGIN: '/v1/auth/login',
  AUTH_REGISTER: '/v1/auth/register',
  AUTH_LOGOUT: '/v1/auth/logout',
  AUTH_RESET_PASSWORD: '/v1/auth/reset-password',
  AUTH_SOCIAL: '/v1/auth/social',
  AUTH_ME: '/v1/auth/me',

  PROFILE_UPDATE: '/v1/profile',
  PROFILE_PASSWORD: '/v1/profile/password',
  PROFILE_DELETE: '/v1/profile',
  PROFILE_NOTIFICATIONS: '/v1/profile/notifications',

  CATS: '/v1/cats',
  CAT: id => `/v1/cats/${id}`,
  PEDIGREE: id => `/v1/cats/${id}/pedigree`,
  KITTENS: '/v1/kittens',
  KITTEN: id => `/v1/kittens/${id}`,
  LITTERS: '/v1/litters',
  WAITLIST: '/v1/litters/waitlist',
  GALLERY: '/v1/gallery',

  PRODUCTS: '/v1/products',
  PRODUCT: id => `/v1/products/${id}`,
  CART: '/v1/cart',
  ORDERS: '/v1/orders',
  ORDER: id => `/v1/orders/${id}`,
  WISHLIST: '/v1/wishlist',

  ARTICLES: '/v1/articles',
  ARTICLE: id => `/v1/articles/${id}`,
  FAQS: '/v1/faqs',
  REVIEWS: '/v1/reviews',

  APPLICATIONS: '/v1/applications',
  APPLICATION: id => `/v1/applications/${id}`,
  APPLICATION_DRAFT: '/v1/applications/draft',

  MESSAGES: '/v1/messages',
  NOTIFICATIONS: '/v1/notifications',
  CONTACT: '/v1/contact',
};
