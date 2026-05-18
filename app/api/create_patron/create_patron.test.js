import { POST } from '@/api/create_patron/route'

// ─── Mocks ───────────────────────────────────────────────────────────────────

jest.mock('@/lib/stripe.server', () => ({
  stripe: {
    checkout: {
      sessions: {
        create: jest.fn().mockResolvedValue({ id: 'mock-session-id' }),
      },
    },
  },
  PATRON_PRODUCT: 'prod_test_patron',
}));

// Mock fetch so create_promotion calls don't go to the network
global.fetch = jest.fn();

// ─── Helpers ─────────────────────────────────────────────────────────────────

const { stripe } = require('@/lib/stripe.server');

const makeReq = (body) => ({
  url: 'http://localhost/api/create_patron',
  json: jest.fn().mockResolvedValue(body),
});

// Simulates a successful create_promotion response
const mockPromoSuccess = (code = 'TESTPROMO123') =>
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ promo: { code } }),
  });

// Simulates a failed create_promotion response
const mockPromoFailure = () =>
  fetch.mockResolvedValueOnce({
    ok: false,
    json: async () => ({ error: 'Failed to create promo' }),
  });

// ─── Setup ───────────────────────────────────────────────────────────────────

beforeEach(() => {
  jest.clearAllMocks();
});

// ─── Input validation ─────────────────────────────────────────────────────────

describe('Input validation', () => {
  it('returns 400 if patron is missing', async () => {
    const res = await POST(makeReq({}));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: 'Patron tier not selected' });
  });

  it('returns 400 if patron.interval is missing', async () => {
    const res = await POST(makeReq({ patron: { price: 5 } }));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: 'Patron tier not selected' });
  });
});

// ─── Promo code creation ──────────────────────────────────────────────────────

describe('Promo code creation', () => {
  it('calls create_promotion with the correct interval', async () => {
    mockPromoSuccess();
    await POST(makeReq({ patron: { price: 5, interval: 'once' } }));
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost/api/create_promotion',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ interval: 'once' }),
      })
    );
  });

  it('calls create_promotion with the internal secret header', async () => {
    mockPromoSuccess();
    await POST(makeReq({ patron: { price: 5, interval: 'once' } }));
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          'x-internal-secret': process.env.INTERNAL_API_SECRET,
        }),
      })
    );
  });

  it('embeds promo code in success_url', async () => {
    mockPromoSuccess('MYCODE99');
    await POST(makeReq({ patron: { price: 5, interval: 'once' } }));
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        success_url: expect.stringContaining('promo=MYCODE99'),
      })
    );
  });

  it('embeds interval in success_url', async () => {
    mockPromoSuccess();
    await POST(makeReq({ patron: { price: 5, interval: 'month' } }));
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        success_url: expect.stringContaining('interval=month'),
      })
    );
  });

  it('still creates a session even if create_promotion fails', async () => {
    mockPromoFailure();
    const res = await POST(makeReq({ patron: { price: 5, interval: 'once' } }));
    expect(res.status).toBe(200);
    expect(stripe.checkout.sessions.create).toHaveBeenCalled();
  });

  it('uses an empty promo code string if create_promotion fails', async () => {
    mockPromoFailure();
    await POST(makeReq({ patron: { price: 5, interval: 'once' } }));
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        success_url: expect.stringContaining('promo=&'),
      })
    );
  });
});

// ─── One-time payment session (interval === 'once') ───────────────────────────

describe("One-time payment (interval === 'once')", () => {
  beforeEach(() => mockPromoSuccess());

  it('creates a payment mode session', async () => {
    await POST(makeReq({ patron: { price: 10, interval: 'once' } }));
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({ mode: 'payment' })
    );
  });

  it('uses submit_type donate', async () => {
    await POST(makeReq({ patron: { price: 10, interval: 'once' } }));
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({ submit_type: 'donate' })
    );
  });

  it('enables invoice creation with promo code in description', async () => {
    mockPromoSuccess.call(null); // already called in beforeEach, this overrides
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ promo: { code: 'INVOICECODE' } }),
    });
    await POST(makeReq({ patron: { price: 10, interval: 'once' } }));
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        invoice_creation: expect.objectContaining({
          enabled: true,
          invoice_data: expect.objectContaining({
            description: expect.stringContaining('TESTPROMO123'),
          }),
        }),
      })
    );
  });

  it('does not include shipping', async () => {
    await POST(makeReq({ patron: { price: 10, interval: 'once' } }));
    const call = stripe.checkout.sessions.create.mock.calls[0][0];
    expect(call).not.toHaveProperty('shipping_address_collection');
    expect(call).not.toHaveProperty('shipping_options');
  });

  it('converts price to cents correctly', async () => {
    await POST(makeReq({ patron: { price: 15, interval: 'once' } }));
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        line_items: expect.arrayContaining([
          expect.objectContaining({
            price_data: expect.objectContaining({ unit_amount: 1500 }),
          }),
        ]),
      })
    );
  });

  it('sets cancel_url to /shop/patron', async () => {
    await POST(makeReq({ patron: { price: 5, interval: 'once' } }));
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({ cancel_url: 'http://localhost/shop/patron' })
    );
  });
});

// ─── Recurring subscription session ──────────────────────────────────────────

describe('Recurring subscription (month / year)', () => {
  beforeEach(() => mockPromoSuccess());

  it('creates a subscription mode session for monthly', async () => {
    await POST(makeReq({ patron: { price: 5, interval: 'month' } }));
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({ mode: 'subscription' })
    );
  });

  it('creates a subscription mode session for yearly', async () => {
    await POST(makeReq({ patron: { price: 60, interval: 'year' } }));
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({ mode: 'subscription' })
    );
  });

  it('sets recurring interval on the price_data', async () => {
    await POST(makeReq({ patron: { price: 5, interval: 'month' } }));
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        line_items: expect.arrayContaining([
          expect.objectContaining({
            price_data: expect.objectContaining({
              recurring: { interval: 'month' },
            }),
          }),
        ]),
      })
    );
  });

  it('embeds promo code in subscription_data description', async () => {
    await POST(makeReq({ patron: { price: 5, interval: 'month' } }));
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        subscription_data: expect.objectContaining({
          description: expect.stringContaining('TESTPROMO123'),
        }),
      })
    );
  });

  it('does not include shipping', async () => {
    await POST(makeReq({ patron: { price: 5, interval: 'month' } }));
    const call = stripe.checkout.sessions.create.mock.calls[0][0];
    expect(call).not.toHaveProperty('shipping_address_collection');
    expect(call).not.toHaveProperty('shipping_options');
  });

  it('uses submit_type donate', async () => {
    await POST(makeReq({ patron: { price: 5, interval: 'month' } }));
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({ submit_type: 'donate' })
    );
  });
});

// ─── Status codes ─────────────────────────────────────────────────────────────

describe('Status codes', () => {
  it('returns 200 with session id on success', async () => {
    mockPromoSuccess();
    const res = await POST(makeReq({ patron: { price: 5, interval: 'once' } }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ id: 'mock-session-id' });
  });

  it('returns 400 if patron tier is missing', async () => {
    const res = await POST(makeReq({}));
    expect(res.status).toBe(400);
  });

  it('returns 500 if Stripe throws', async () => {
    mockPromoSuccess();
    stripe.checkout.sessions.create.mockRejectedValueOnce(new Error('Stripe Error'));
    const res = await POST(makeReq({ patron: { price: 5, interval: 'once' } }));
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: 'Stripe Error' });
  });
});