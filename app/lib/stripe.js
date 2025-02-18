import Stripe from 'stripe'
import { loadStripe } from '@stripe/stripe-js'

require('dotenv').config();

export const env = process.env.ENVIRONMENT || 'sandbox';

const STRIPE_SECRET = env === 'sandbox' ? process.env.STRIPE_SECRET_TEST : process.env.STRIPE_SECRET;
const STRIPE_PUBLIC = env === 'sandbox' ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export const stripe = new Stripe(STRIPE_SECRET);
export const stripePromise = loadStripe(STRIPE_PUBLIC);

export const PATRON_LINK = 'https://donate.stripe.com/8wMg2PbGA6XV8CIcMM';
export const PATRON_LINK_MONTHLY = 'https://donate.stripe.com/5kA9Erh0U1DBbOUcMN';
export const PATRON_LINK_YEARLY = 'https://donate.stripe.com/6oE4k7aCwdmj5qw4gi';