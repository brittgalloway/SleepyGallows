require('dotenv').config();

export const env = process.env.ENVIRONMENT || 'sandbox';

export const STRIPE_SECRET = env === 'sandbox' ? process.env.STRIPE_SECRET_TEST : process.env.STRIPE_SECRET;
export const STRIPE_PUBLIC = env === 'sandbox' ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;