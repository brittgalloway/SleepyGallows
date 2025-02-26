import Stripe from 'stripe'
import { loadStripe } from '@stripe/stripe-js'

require('dotenv').config();

export const env = process.env.ENVIRONMENT || 'sandbox';

const STRIPE_SECRET = env === 'sandbox' ? process.env.STRIPE_SECRET_TEST : process.env.STRIPE_SECRET;
const STRIPE_PUBLIC = env === 'sandbox' ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export const stripe = new Stripe(STRIPE_SECRET);
export const stripePromise = loadStripe(STRIPE_PUBLIC);

export const userAccountLink = env === 'sandbox' ? 'https://billing.stripe.com/p/login/test_dR615302V1Hz1K8fYY' : 'https://billing.stripe.com/p/login/aEU16L6Aq6EP7yE000';

// Patron variables
export const PATRON_PRODUCT = env === 'sandbox' ? 'prod_RnZ1n8UFz12j3c' :
'';
export const PATRON_5 = env === 'sandbox' ? {
    price: 5,
    interval: 'once',
} : 'https://donate.stripe.com/8wMg2PbGA6XV8CIcMM';
export const PATRON_10 = env === 'sandbox' ? {
    price: 10,
    interval: 'once',
} : 'https://donate.stripe.com/8wMg2PbGA6XV8CIcMM';
export const PATRON_15 = env === 'sandbox' ? {
    price: 15,
    interval: 'once',
} : '';
export const PATRON_MONTHLY_5 = env === 'sandbox' ? {
    price: 5,
    interval: 'month',
} : 'https://donate.stripe.com/5kA9Erh0U1DBbOUcMN';
export const PATRON_MONTHLY_10 = env === 'sandbox' ? {
    price: 10,
    interval: 'month',
} : 'https://donate.stripe.com/5kA9Erh0U1DBbOUcMN';
export const PATRON_MONTHLY_15 = env === 'sandbox' ? {
    price: 15,
    interval: 'month',
} : 'https://donate.stripe.com/5kA9Erh0U1DBbOUcMN';
export const PATRON_YEARLY_12 = env === 'sandbox' ? {
    price: 12,
    interval: 'year',
} : 'https://donate.stripe.com/6oE4k7aCwdmj5qw4gi';
export const PATRON_YEARLY_60 = env === 'sandbox' ? {
    price: 60,
    interval: 'year',
} : 'https://donate.stripe.com/6oE4k7aCwdmj5qw4gi';
export const PATRON_YEARLY_120 = env === 'sandbox' ? {
    price: 120,
    interval: 'year',
} : 'https://donate.stripe.com/6oE4k7aCwdmj5qw4gi';
export const PATRON_COUPON = env === 'sandbox' ? '6BusZfcF' : '';