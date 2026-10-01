import { POST, OPTIONS } from '@/api/update_stock/route'

// ─── Mocks ───────────────────────────────────────────────────────────────────

jest.mock('@/lib/stripe.server', () => ({
  STRIPE_WH_SECRET: 'whsec_test',
  stripe: {
    webhooks: {
      constructEvent: jest.fn(),
    },
    checkout: {
      sessions: {
        listLineItems: jest.fn(),
      },
    },
  },
}));

jest.mock('../../../sanity/lib/client', () => {
  const mockCommit = jest.fn().mockResolvedValue({ _id: 'sanity-doc-id', stock: 3 });
  const mockSet = jest.fn().mockReturnValue({ commit: mockCommit });
  const mockPatch = jest.fn().mockReturnValue({ set: mockSet });
  return {
    client: {
      fetch: jest.fn(),
      patch: mockPatch,
    },
  };
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

const { stripe } = require('@/lib/stripe.server');
const { client } = require('../../../sanity/lib/client');

// Access the nested mock fns after require
const getMockPatch = () => client.patch;
const getMockSet = () => client.patch.mock.results[0]?.value?.set ?? jest.fn();
const getMockCommit = () => {
  const setResult = client.patch.mock.results[0]?.value;
  return setResult?.set?.mock?.results[0]?.value?.commit ?? jest.fn();
};

const makeReq = (body = 'raw-body', signature = 'valid-sig') => ({
  text: jest.fn().mockResolvedValue(body),
  headers: { get: (key) => key === 'stripe-signature' ? signature : null },
});

// Builds a minimal Stripe checkout.session.completed event
const makeSessionEvent = (overrides = {}) => ({
  type: 'checkout.session.completed',
  data: {
    object: {
      id: 'cs_test_123',
      payment_status: 'paid',
      ...overrides,
    },
  },
});

// Builds a line item with a product and Sanity metadata
const makeLineItem = (sanityID, quantity = 1) => ({
  quantity,
  price: {
    product: {
      id: 'prod_stripe_123',
      metadata: { id: sanityID },
    },
  },
});

// Sanity product (non-variant)
const makeSanityProduct = (id, stock) => ({
  id,
  stock,
  variant: [],
});

// Sanity variant product
const makeSanityVariant = (id, variantKey, variantStock) => ({
  id,
  stock: 10,
  variant: [{ _key: variantKey, stock: variantStock }],
});

beforeEach(() => {
  jest.clearAllMocks();
});

// ─── Webhook signature verification ──────────────────────────────────────────

describe('Webhook signature verification', () => {
  it('returns 400 when signature verification fails', async () => {
    stripe.webhooks.constructEvent.mockImplementationOnce(() => {
      throw new Error('Signature mismatch');
    });

    const res = await POST(makeReq());
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: 'Signature mismatch' });
  });

  it('does not call Sanity when signature is invalid', async () => {
    stripe.webhooks.constructEvent.mockImplementationOnce(() => {
      throw new Error('Invalid signature');
    });

    await POST(makeReq());
    expect(client.fetch).not.toHaveBeenCalled();
  });

  it('proceeds when signature is valid', async () => {
    stripe.webhooks.constructEvent.mockReturnValueOnce(makeSessionEvent());
    stripe.checkout.sessions.listLineItems.mockResolvedValueOnce({ data: [] });

    const res = await POST(makeReq());
    expect(res.status).toBe(201);
  });
});

// ─── Unhandled event types ────────────────────────────────────────────────────

describe('Unhandled event types', () => {
  it('returns 200 received:true for unhandled event types', async () => {
    stripe.webhooks.constructEvent.mockReturnValueOnce({
      type: 'payment_intent.created',
      data: { object: {} },
    });

    const res = await POST(makeReq());
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ received: true });
  });

  it('does not call Sanity for unhandled event types', async () => {
    stripe.webhooks.constructEvent.mockReturnValueOnce({
      type: 'customer.created',
      data: { object: {} },
    });

    await POST(makeReq());
    expect(client.fetch).not.toHaveBeenCalled();
  });
});

// ─── Unpaid sessions ──────────────────────────────────────────────────────────

describe('Unpaid sessions', () => {
  it('skips stock update when payment_status is not paid', async () => {
    stripe.webhooks.constructEvent.mockReturnValueOnce(
      makeSessionEvent({ payment_status: 'unpaid' })
    );

    const res = await POST(makeReq());
    expect(client.fetch).not.toHaveBeenCalled();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ received: true });
  });
});

// ─── Line item fetching ───────────────────────────────────────────────────────

describe('Line item fetching', () => {
  it('returns 500 if listLineItems throws', async () => {
    stripe.webhooks.constructEvent.mockReturnValueOnce(makeSessionEvent());
    stripe.checkout.sessions.listLineItems.mockRejectedValueOnce(
      new Error('Stripe API error')
    );

    const res = await POST(makeReq());
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: 'Stripe API error' });
  });

  it('skips items with no Sanity ID in metadata', async () => {
    stripe.webhooks.constructEvent.mockReturnValueOnce(makeSessionEvent());
    stripe.checkout.sessions.listLineItems.mockResolvedValueOnce({
      data: [{
        quantity: 1,
        price: { product: { id: 'prod_no_meta', metadata: {} } },
      }],
    });

    await POST(makeReq());
    expect(client.fetch).not.toHaveBeenCalled();
  });

  it('skips items where Sanity returns no matching product', async () => {
    stripe.webhooks.constructEvent.mockReturnValueOnce(makeSessionEvent());
    stripe.checkout.sessions.listLineItems.mockResolvedValueOnce({
      data: [makeLineItem('sanity-missing-id')],
    });
    client.fetch.mockResolvedValueOnce([]); // not found

    const res = await POST(makeReq());
    expect(getMockPatch()).not.toHaveBeenCalled();
    expect(res.status).toBe(201);
  });
});

// ─── Stock update — regular product ──────────────────────────────────────────

describe('Stock update — regular product', () => {
  it('decrements stock by the purchased quantity', async () => {
    stripe.webhooks.constructEvent.mockReturnValueOnce(makeSessionEvent());
    stripe.checkout.sessions.listLineItems.mockResolvedValueOnce({
      data: [makeLineItem('sanity-prod-aaa', 2)],
    });
    client.fetch.mockResolvedValueOnce([makeSanityProduct('sanity-prod-aaa', 5)]);

    await POST(makeReq());

    const mockSet = getMockSet();
    expect(mockSet).toHaveBeenCalledWith({ stock: 3 }); // 5 - 2
  });

  it('does not allow stock to go below 0', async () => {
    stripe.webhooks.constructEvent.mockReturnValueOnce(makeSessionEvent());
    stripe.checkout.sessions.listLineItems.mockResolvedValueOnce({
      data: [makeLineItem('sanity-prod-aaa', 10)],
    });
    client.fetch.mockResolvedValueOnce([makeSanityProduct('sanity-prod-aaa', 3)]);

    await POST(makeReq());

    const mockSet = getMockSet();
    expect(mockSet).toHaveBeenCalledWith({ stock: 0 }); // floor at 0
  });

  it('calls patch with the correct Sanity document id', async () => {
    stripe.webhooks.constructEvent.mockReturnValueOnce(makeSessionEvent());
    stripe.checkout.sessions.listLineItems.mockResolvedValueOnce({
      data: [makeLineItem('sanity-prod-aaa', 1)],
    });
    client.fetch.mockResolvedValueOnce([makeSanityProduct('sanity-prod-aaa', 5)]);

    await POST(makeReq());

    expect(getMockPatch()).toHaveBeenCalledWith('sanity-prod-aaa');
  });

  it('returns 201 with updated results', async () => {
    stripe.webhooks.constructEvent.mockReturnValueOnce(makeSessionEvent());
    stripe.checkout.sessions.listLineItems.mockResolvedValueOnce({
      data: [makeLineItem('sanity-prod-aaa', 1)],
    });
    client.fetch.mockResolvedValueOnce([makeSanityProduct('sanity-prod-aaa', 5)]);

    const res = await POST(makeReq());
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.data).toHaveLength(1);
  });
});

// ─── Stock update — variant product ──────────────────────────────────────────

describe('Stock update — variant product', () => {
  it('patches the correct variant using its _key', async () => {
    stripe.webhooks.constructEvent.mockReturnValueOnce(makeSessionEvent());
    stripe.checkout.sessions.listLineItems.mockResolvedValueOnce({
      data: [makeLineItem('sanity-variant-id', 1)],
    });
    client.fetch.mockResolvedValueOnce([
      makeSanityVariant('sanity-prod-aaa', 'variant-key-abc', 8),
    ]);

    await POST(makeReq());

    const mockSet = getMockSet();
    expect(mockSet).toHaveBeenCalledWith({
      'variant[_key=="variant-key-abc"].stock': 7, // 8 - 1
    });
  });

  it('does not allow variant stock to go below 0', async () => {
    stripe.webhooks.constructEvent.mockReturnValueOnce(makeSessionEvent());
    stripe.checkout.sessions.listLineItems.mockResolvedValueOnce({
      data: [makeLineItem('sanity-variant-id', 20)],
    });
    client.fetch.mockResolvedValueOnce([
      makeSanityVariant('sanity-prod-aaa', 'variant-key-abc', 3),
    ]);

    await POST(makeReq());

    const mockSet = getMockSet();
    expect(mockSet).toHaveBeenCalledWith({
      'variant[_key=="variant-key-abc"].stock': 0,
    });
  });
});

// ─── Multi-item orders ────────────────────────────────────────────────────────

describe('Multi-item orders', () => {
  it('updates stock for all line items in one order', async () => {
    stripe.webhooks.constructEvent.mockReturnValueOnce(makeSessionEvent());
    stripe.checkout.sessions.listLineItems.mockResolvedValueOnce({
      data: [
        makeLineItem('sanity-prod-aaa', 1),
        makeLineItem('sanity-prod-bbb', 2),
      ],
    });
    client.fetch
      .mockResolvedValueOnce([makeSanityProduct('sanity-prod-aaa', 5)])
      .mockResolvedValueOnce([makeSanityProduct('sanity-prod-bbb', 4)]);

    const res = await POST(makeReq());
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.data).toHaveLength(2);
    expect(getMockPatch()).toHaveBeenCalledTimes(2);
  });

  it('continues processing remaining items if one fails', async () => {
    stripe.webhooks.constructEvent.mockReturnValueOnce(makeSessionEvent());
    stripe.checkout.sessions.listLineItems.mockResolvedValueOnce({
      data: [
        makeLineItem('sanity-prod-aaa', 1),
        makeLineItem('sanity-prod-bbb', 1),
      ],
    });
    client.fetch
      .mockResolvedValueOnce([makeSanityProduct('sanity-prod-aaa', 5)])
      .mockRejectedValueOnce(new Error('Sanity timeout')); // second item fails

    const res = await POST(makeReq());
    // Should still return 201 with partial results
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.data).toHaveLength(1); // only the first succeeded
  });
});

// ─── OPTIONS ─────────────────────────────────────────────────────────────────

describe('OPTIONS', () => {
  it('returns 200 with Allow header', async () => {
    const res = await OPTIONS();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.message).toBe('POST method is allowed');
  });
});