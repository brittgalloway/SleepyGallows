// Server-only — never import this file in client components
import Stripe from 'stripe'

const env = process.env.ENVIRONMENT || 'sandbox';

const STRIPE_SECRET = env === 'sandbox'
  ? process.env.STRIPE_SECRET_TEST
  : process.env.STRIPE_SECRET;

if (!STRIPE_SECRET) {
  throw new Error(`Missing Stripe secret key for environment: ${env}`);
}

export const stripe = new Stripe(STRIPE_SECRET);

export const STRIPE_WH_SECRET = env === 'sandbox'
  ? process.env.STRIPE_WH_SECRET_TEST
  : process.env.STRIPE_WH_SECRET;

export const PATRON_PRODUCT = env === 'sandbox'
  ? (process.env.STRIPE_PATRON_PRODUCT_TEST ?? 'prod_RnZ1n8UFz12j3c')
  : process.env.STRIPE_PATRON_PRODUCT;

export const PATRON_COUPON = env === 'sandbox'
  ? (process.env.STRIPE_PATRON_COUPON_TEST ?? '6BusZfcF')
  : process.env.STRIPE_PATRON_COUPON;

if (!PATRON_PRODUCT || !PATRON_COUPON) {
  console.warn(`[stripe.server] PATRON_PRODUCT or PATRON_COUPON not set for environment: ${env}`);
}