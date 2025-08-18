import Stripe from 'stripe'
import { loadStripe } from '@stripe/stripe-js'

require('dotenv').config();

export const env = process.env.ENVIRONMENT || 'sandbox';

// Stripe constants
const STRIPE_SECRET = env === 'sandbox' ? process.env.STRIPE_SECRET_TEST : process.env.STRIPE_SECRET;
const STRIPE_PUBLIC = env === 'sandbox' ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export const STRIPE_WH_SECRET = env === 'sandbox' ? process.env.STRIPE_WH_SECRET_TEST : process.env.STRIPE_WH_SECRET;

export const stripe = new Stripe(STRIPE_SECRET);
export const stripePromise = loadStripe(STRIPE_PUBLIC);

export const USER_ACCOUNT_LINK = env === 'sandbox' ? 'https://billing.stripe.com/p/login/test_dR615302V1Hz1K8fYY' : 'https://billing.stripe.com/p/login/aEU16L6Aq6EP7yE000';

// Patron constants
export const PATRON_PRODUCT = env === 'sandbox' ? 'prod_RnZ1n8UFz12j3c' :
'';
export const PATRON_COUPON = env === 'sandbox' ? '6BusZfcF' : '';
export const PATRON_5 = {
    price: 5,
    interval: 'once',
};
export const PATRON_10 = {
    price: 10,
    interval: 'once',
};
export const PATRON_15 = {
    price: 15,
    interval: 'once',
};
export const PATRON_MONTHLY_5 = {
    price: 5,
    interval: 'month',
};
export const PATRON_MONTHLY_10 = {
    price: 10,
    interval: 'month',
};
export const PATRON_MONTHLY_15 = {
    price: 15,
    interval: 'month',
};
export const PATRON_YEARLY_12 = {
    price: 12,
    interval: 'year',
};
export const PATRON_YEARLY_60 = {
    price: 60,
    interval: 'year',
};
export const PATRON_YEARLY_120 = {
    price: 120,
    interval: 'year',
};