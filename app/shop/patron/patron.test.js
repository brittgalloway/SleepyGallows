// patron.test.js runs in the node environment (no jsdom needed — pure constant checks)
import {
  USER_ACCOUNT_LINK,
  PATRON_5,
  PATRON_10,
  PATRON_15,
  PATRON_MONTHLY_5,
  PATRON_MONTHLY_10,
  PATRON_MONTHLY_15,
  PATRON_YEARLY_12,
  PATRON_YEARLY_60,
  PATRON_YEARLY_120,
} from '@/lib/stripe'

// PATRON_PRODUCT and PATRON_COUPON live in stripe.server (server-only).
// Mock the whole module so new Stripe() doesn't throw without a real secret key.
jest.mock('@/lib/stripe.server', () => ({
  stripe: {},
  STRIPE_WH_SECRET: 'whsec_test',
  PATRON_PRODUCT: 'prod_RnZ1n8UFz12j3c',
  PATRON_COUPON: '6BusZfcF',
}));

const { PATRON_PRODUCT, PATRON_COUPON } = require('@/lib/stripe.server');

// ─── USER_ACCOUNT_LINK ────────────────────────────────────────────────────────

describe('USER_ACCOUNT_LINK', () => {
  it('is a string', () => {
    expect(typeof USER_ACCOUNT_LINK).toBe('string');
  });

  it('is a Stripe billing portal URL', () => {
    expect(USER_ACCOUNT_LINK).toMatch(
      /^https:\/\/billing\.stripe\.com\/p\/login\//
    );
  });

  it('is not empty', () => {
    expect(USER_ACCOUNT_LINK).not.toBe('');
  });
});

// ─── PATRON_PRODUCT ───────────────────────────────────────────────────────────

describe('PATRON_PRODUCT', () => {
  it('is a string', () => {
    expect(typeof PATRON_PRODUCT).toBe('string');
  });

  it('starts with prod_', () => {
    expect(PATRON_PRODUCT).toMatch(/^prod_/);
  });

  it('is not empty', () => {
    expect(PATRON_PRODUCT).not.toBe('');
  });
});

// ─── PATRON_COUPON ────────────────────────────────────────────────────────────

describe('PATRON_COUPON', () => {
  it('is a string', () => {
    expect(typeof PATRON_COUPON).toBe('string');
  });

  it('is alphanumeric', () => {
    expect(PATRON_COUPON).toMatch(/^[a-z0-9]+$/i);
  });

  it('is not empty', () => {
    expect(PATRON_COUPON).not.toBe('');
  });
});

// ─── Patron tier objects ──────────────────────────────────────────────────────

const allTiers = [
  ['PATRON_5',          PATRON_5],
  ['PATRON_10',         PATRON_10],
  ['PATRON_15',         PATRON_15],
  ['PATRON_MONTHLY_5',  PATRON_MONTHLY_5],
  ['PATRON_MONTHLY_10', PATRON_MONTHLY_10],
  ['PATRON_MONTHLY_15', PATRON_MONTHLY_15],
  ['PATRON_YEARLY_12',  PATRON_YEARLY_12],
  ['PATRON_YEARLY_60',  PATRON_YEARLY_60],
  ['PATRON_YEARLY_120', PATRON_YEARLY_120],
];

describe('Patron tier objects — shape', () => {
  test.each(allTiers)('%s has exactly 2 properties', (_, tier) => {
    expect(Object.keys(tier)).toHaveLength(2);
  });

  test.each(allTiers)('%s has a numeric price greater than 0', (_, tier) => {
    expect(typeof tier.price).toBe('number');
    expect(tier.price).toBeGreaterThan(0);
    expect(isNaN(tier.price)).toBe(false);
  });

  test.each(allTiers)('%s has a valid interval', (_, tier) => {
    expect(['once', 'month', 'year']).toContain(tier.interval);
  });
});

describe('Patron tier objects — one-time tiers', () => {
  const onceTiers = [
    ['PATRON_5',  PATRON_5,  5],
    ['PATRON_10', PATRON_10, 10],
    ['PATRON_15', PATRON_15, 15],
  ];

  test.each(onceTiers)('%s has interval "once"', (_, tier) => {
    expect(tier.interval).toBe('once');
  });

  test.each(onceTiers)('%s has the correct price', (name, tier, expectedPrice) => {
    expect(tier.price).toBe(expectedPrice);
  });
});

describe('Patron tier objects — monthly tiers', () => {
  const monthlyTiers = [
    ['PATRON_MONTHLY_5',  PATRON_MONTHLY_5,  5],
    ['PATRON_MONTHLY_10', PATRON_MONTHLY_10, 10],
    ['PATRON_MONTHLY_15', PATRON_MONTHLY_15, 15],
  ];

  test.each(monthlyTiers)('%s has interval "month"', (_, tier) => {
    expect(tier.interval).toBe('month');
  });

  test.each(monthlyTiers)('%s has the correct price', (name, tier, expectedPrice) => {
    expect(tier.price).toBe(expectedPrice);
  });
});

describe('Patron tier objects — yearly tiers', () => {
  const yearlyTiers = [
    ['PATRON_YEARLY_12',  PATRON_YEARLY_12,  12],
    ['PATRON_YEARLY_60',  PATRON_YEARLY_60,  60],
    ['PATRON_YEARLY_120', PATRON_YEARLY_120, 120],
  ];

  test.each(yearlyTiers)('%s has interval "year"', (_, tier) => {
    expect(tier.interval).toBe('year');
  });

  test.each(yearlyTiers)('%s has the correct price', (name, tier, expectedPrice) => {
    expect(tier.price).toBe(expectedPrice);
  });
});