'use client'
// Client-only — never import this file in server components or API routes
import { loadStripe } from '@stripe/stripe-js'

const env = process.env.ENVIRONMENT || 'sandbox';

const STRIPE_PUBLIC = env === 'sandbox'
  ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST
  : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export const stripePromise = loadStripe(STRIPE_PUBLIC);