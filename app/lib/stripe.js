// Shared constants — safe to import in both server and client code.
// For the Stripe SDK (server): import from '@/lib/stripe.server'
// For stripePromise (client): import from '@/lib/stripe.client'

export const env = process.env.ENVIRONMENT || 'sandbox';

export const USER_ACCOUNT_LINK = env === 'sandbox'
  ? 'https://billing.stripe.com/p/login/test_dR615302V1Hz1K8fYY'
  : 'https://billing.stripe.com/p/login/aEU16L6Aq6EP7yE000';

// Patron tier options
export const PATRON_5          = { price: 5,   interval: 'once' };
export const PATRON_10         = { price: 10,  interval: 'once' };
export const PATRON_15         = { price: 15,  interval: 'once' };
export const PATRON_MONTHLY_5  = { price: 5,   interval: 'month' };
export const PATRON_MONTHLY_10 = { price: 10,  interval: 'month' };
export const PATRON_MONTHLY_15 = { price: 15,  interval: 'month' };
export const PATRON_YEARLY_12  = { price: 12,  interval: 'year' };
export const PATRON_YEARLY_60  = { price: 60,  interval: 'year' };
export const PATRON_YEARLY_120 = { price: 120, interval: 'year' };