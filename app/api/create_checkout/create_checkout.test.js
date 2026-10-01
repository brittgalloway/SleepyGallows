import { POST } from '@/api/create_checkout/route'

// ─── Mocks ───────────────────────────────────────────────────────────────────

// Mock stripe.server so no real Stripe calls are made
jest.mock('@/lib/stripe.server', () => ({
  stripe: {
    checkout: {
      sessions: {
        create: jest.fn().mockResolvedValue({ id: 'mock-session-id' }),
      },
    },
  },
}));

// Mock Sanity client
jest.mock('../../../sanity/lib/client', () => ({
  client: {
    fetch: jest.fn(),
  },
}));

// ─── Helpers ─────────────────────────────────────────────────────────────────

const { stripe } = require('@/lib/stripe.server');
const { client } = require('../../../sanity/lib/client');

// Builds a minimal valid POST request
const makeReq = (body) => ({
  url: 'http://localhost/api/create_checkout',
  json: jest.fn().mockResolvedValue(body),
});

// A valid cart item the client would send
const validItem = {
  id: 'sanity-product-aaa',
  quantity: 1,
  productName: 'Test Print',
  productDescription: 'A lovely print',
  productDisplay: '/test-print.jpg',
};

// What Sanity returns for that product
const sanityProduct = {
  id: 'sanity-product-aaa',
  price: 20,
  discountedPrice: null,
  variant: [],
};

// ─── Setup ───────────────────────────────────────────────────────────────────

beforeEach(() => {
  jest.clearAllMocks();
  // Default: Sanity returns the product successfully
  client.fetch.mockResolvedValue([sanityProduct]);
});

// ─── Input validation ─────────────────────────────────────────────────────────

describe('Input validation', () => {
  it('returns 400 if items is missing', async () => {
    const res = await POST(makeReq({}));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: 'Cart is empty' });
  });

  it('returns 400 if items is an empty array', async () => {
    const res = await POST(makeReq({ items: [] }));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: 'Cart is empty' });
  });

  it('returns 400 if an item is missing an id', async () => {
    const res = await POST(makeReq({
      items: [{ quantity: 1 }],
      shipping: 800,
    }));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: 'Invalid item ID' });
  });

  it('returns 400 if item id is not a string', async () => {
    const res = await POST(makeReq({
      items: [{ id: 123, quantity: 1 }],
      shipping: 800,
    }));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: 'Invalid item ID' });
  });

  it('returns 400 if quantity is zero', async () => {
    const res = await POST(makeReq({
      items: [{ id: 'abc', quantity: 0 }],
      shipping: 800,
    }));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: 'Invalid item quantity' });
  });

  it('returns 400 if quantity is not an integer', async () => {
    const res = await POST(makeReq({
      items: [{ id: 'abc', quantity: 1.5 }],
      shipping: 800,
    }));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: 'Invalid item quantity' });
  });
});

// ─── Sanity price lookup ──────────────────────────────────────────────────────

describe('Sanity price lookup', () => {
  it('returns 500 if product is not found in Sanity', async () => {
    client.fetch.mockResolvedValue([]); // empty — product not found
    const res = await POST(makeReq({ items: [validItem], shipping: 800 }));
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toMatch(/not found in Sanity/);
  });

  it('uses the regular price when no discountedPrice is set', async () => {
    client.fetch.mockResolvedValue([{ ...sanityProduct, price: 20, discountedPrice: null }]);
    await POST(makeReq({ items: [validItem], shipping: 800 }));
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        line_items: expect.arrayContaining([
          expect.objectContaining({
            price_data: expect.objectContaining({ unit_amount: 2000 }),
          }),
        ]),
      })
    );
  });

  it('uses discountedPrice when set', async () => {
    client.fetch.mockResolvedValue([{ ...sanityProduct, price: 20, discountedPrice: 12 }]);
    await POST(makeReq({ items: [validItem], shipping: 800 }));
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        line_items: expect.arrayContaining([
          expect.objectContaining({
            price_data: expect.objectContaining({ unit_amount: 1200 }),
          }),
        ]),
      })
    );
  });

  it('never uses client-supplied price — uses Sanity price regardless', async () => {
    // Client tries to send a tampered price of $0.01
    const tamperedItem = { ...validItem, productPrice: 0.01 };
    client.fetch.mockResolvedValue([{ ...sanityProduct, price: 20, discountedPrice: null }]);
    await POST(makeReq({ items: [tamperedItem], shipping: 800 }));
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        line_items: expect.arrayContaining([
          expect.objectContaining({
            price_data: expect.objectContaining({ unit_amount: 2000 }), // $20 from Sanity, not $0.01
          }),
        ]),
      })
    );
  });

  it('correctly rounds price to cents', async () => {
    client.fetch.mockResolvedValue([{ ...sanityProduct, price: 12.99, discountedPrice: null }]);
    await POST(makeReq({ items: [validItem], shipping: 800 }));
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        line_items: expect.arrayContaining([
          expect.objectContaining({
            price_data: expect.objectContaining({ unit_amount: 1299 }),
          }),
        ]),
      })
    );
  });
});

// ─── Stripe session properties ────────────────────────────────────────────────

describe('Stripe session properties', () => {
  it('returns 200 with a session id on success', async () => {
    const res = await POST(makeReq({ items: [validItem], shipping: 800 }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ id: 'mock-session-id' });
  });

  it('sets success_url to /shop/thank_you', async () => {
    await POST(makeReq({ items: [validItem], shipping: 800 }));
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({ success_url: 'http://localhost/shop/thank_you' })
    );
  });

  it('sets cancel_url to /shop', async () => {
    await POST(makeReq({ items: [validItem], shipping: 800 }));
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({ cancel_url: 'http://localhost/shop' })
    );
  });

  it('enables promotion codes', async () => {
    await POST(makeReq({ items: [validItem], shipping: 800 }));
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({ allow_promotion_codes: true })
    );
  });

  it('enables invoice creation', async () => {
    await POST(makeReq({ items: [validItem], shipping: 800 }));
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({ invoice_creation: { enabled: true } })
    );
  });

  it('sets shipping_address_collection to US only', async () => {
    await POST(makeReq({ items: [validItem], shipping: 800 }));
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        shipping_address_collection: { allowed_countries: ['US'] },
      })
    );
  });

  it('passes shipping amount from cart to the session', async () => {
    await POST(makeReq({ items: [validItem], shipping: 1000 }));
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        shipping_options: expect.arrayContaining([
          expect.objectContaining({
            shipping_rate_data: expect.objectContaining({
              fixed_amount: { amount: 1000, currency: 'usd' },
            }),
          }),
        ]),
      })
    );
  });

  it('embeds Sanity product id in line item metadata', async () => {
    await POST(makeReq({ items: [validItem], shipping: 800 }));
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        line_items: expect.arrayContaining([
          expect.objectContaining({
            price_data: expect.objectContaining({
              product_data: expect.objectContaining({
                metadata: { id: 'sanity-product-aaa' },
              }),
            }),
          }),
        ]),
      })
    );
  });

  it('returns 500 if Stripe throws', async () => {
    stripe.checkout.sessions.create.mockRejectedValueOnce(new Error('Stripe Error'));
    const res = await POST(makeReq({ items: [validItem], shipping: 800 }));
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: 'Stripe Error' });
  });
});