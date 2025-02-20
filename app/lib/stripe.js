import Stripe from 'stripe'
import { loadStripe } from '@stripe/stripe-js'

require('dotenv').config();

export const env = process.env.ENVIRONMENT || 'sandbox';

const STRIPE_SECRET = env === 'sandbox' ? process.env.STRIPE_SECRET_TEST : process.env.STRIPE_SECRET;
const STRIPE_PUBLIC = env === 'sandbox' ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export const stripe = new Stripe(STRIPE_SECRET);
export const stripePromise = loadStripe(STRIPE_PUBLIC);

export const PATRON_LINK_CHOOSE = env === 'sandbox' ? '' : 'https://donate.stripe.com/8wMg2PbGA6XV8CIcMM';
export const PATRON_LINK_5 = env === 'sandbox' ? 'https://donate.stripe.com/test_14keVR3WpaM8f9m6oo' : 'https://donate.stripe.com/8wMg2PbGA6XV8CIcMM';
export const PATRON_LINK_10 = env === 'sandbox' ? 'https://donate.stripe.com/test_4gw5lh1Ohf2ogdq6ou' : 'https://donate.stripe.com/8wMg2PbGA6XV8CIcMM';
export const PATRON_LINK_MONTHLY_5 = env === 'sandbox' ? 'https://donate.stripe.com/test_eVa5lhakN1by7GUcMR' : 'https://donate.stripe.com/5kA9Erh0U1DBbOUcMN';
export const PATRON_LINK_MONTHLY_10 = env === 'sandbox' ? 'https://donate.stripe.com/test_28o295dwZ9I4aT6bIJ' : 'https://donate.stripe.com/5kA9Erh0U1DBbOUcMN';
export const PATRON_LINK_MONTHLY_15 = env === 'sandbox' ? 'https://donate.stripe.com/test_5kA8xt78B7zW7GU007' : 'https://donate.stripe.com/5kA9Erh0U1DBbOUcMN';
export const PATRON_LINK_YEARLY_12 = env === 'sandbox' ? 'https://donate.stripe.com/test_14keVR3WpaM8f9m6oo' : 'https://donate.stripe.com/6oE4k7aCwdmj5qw4gi';
export const PATRON_LINK_YEARLY_60 = env === 'sandbox' ? 'https://buy.stripe.com/test_aEUcNJ8cF9I40es5kn' : 'https://donate.stripe.com/6oE4k7aCwdmj5qw4gi';
export const PATRON_LINK_YEARLY_120 = env === 'sandbox' ? 'https://donate.stripe.com/test_00g6pldwZ1byf9m6os' : 'https://donate.stripe.com/6oE4k7aCwdmj5qw4gi';