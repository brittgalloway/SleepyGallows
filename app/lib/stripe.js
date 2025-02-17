import Stripe from 'stripe'
import { loadStripe } from '@stripe/stripe-js'

require('dotenv').config();

export const env = process.env.ENVIRONMENT || 'sandbox';

const STRIPE_SECRET = env === 'sandbox' ? process.env.STRIPE_SECRET_TEST : process.env.STRIPE_SECRET;
const STRIPE_PUBLIC = env === 'sandbox' ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export const stripe = new Stripe(STRIPE_SECRET);
export const stripePromise = loadStripe(STRIPE_PUBLIC);