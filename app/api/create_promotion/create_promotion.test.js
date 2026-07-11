import { POST } from '@/api/create_promotion/route'

// ─── Mocks ───────────────────────────────────────────────────────────────────

jest.mock('@/lib/stripe.server', () => ({
  stripe: {
    promotionCodes: {
      create: jest.fn().mockResolvedValue({
        id: 'promo_test123',
        code: 'TESTCODE99',
        active: true,
        expires_at: 9999999999,
      }),
    },
  },
  PATRON_COUPON: 'TEST_COUPON_ID',
}));

// ─── Helpers ─────────────────────────────────────────────────────────────────

const { stripe } = require('@/lib/stripe.server');

const VALID_SECRET = 'test-internal-secret';

const makeReq = (body, secret = VALID_SECRET) => ({
  headers: { get: (key) => key === 'x-internal-secret' ? secret : null },
  json: jest.fn().mockResolvedValue(body),
});

beforeEach(() => {
  jest.clearAllMocks();
  process.env.INTERNAL_API_SECRET = VALID_SECRET;
});

// ─── Authentication ───────────────────────────────────────────────────────────

describe('Authentication', () => {
  it('returns 401 when no secret header is provided', async () => {
    const res = await POST(makeReq({ interval: 'month' }, null));
    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ error: 'Unauthorized' });
  });

  it('returns 401 when the secret is wrong', async () => {
    const res = await POST(makeReq({ interval: 'month' }, 'wrong-secret'));
    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ error: 'Unauthorized' });
  });

  it('does not call Stripe when unauthorized', async () => {
    await POST(makeReq({ interval: 'month' }, null));
    expect(stripe.promotionCodes.create).not.toHaveBeenCalled();
  });

  it('proceeds when the correct secret is provided', async () => {
    const res = await POST(makeReq({ interval: 'month' }));
    expect(res.status).toBe(200);
  });
});

// ─── Interval duration logic ──────────────────────────────────────────────────

describe('Interval duration logic', () => {
  it('sets expiry 1 month ahead for monthly interval', async () => {
    const before = new Date();
    await POST(makeReq({ interval: 'month' }));

    const call = stripe.promotionCodes.create.mock.calls[0][0];
    const expiresAt = call.expires_at;

    const expectedDate = new Date(before);
    expectedDate.setMonth(expectedDate.getMonth() + 1);

    // Allow a few seconds of tolerance for test execution time
    expect(expiresAt).toBeGreaterThanOrEqual(Math.floor(expectedDate.getTime() / 1000) - 5);
    expect(expiresAt).toBeLessThanOrEqual(Math.floor(expectedDate.getTime() / 1000) + 5);
  });

  it('sets expiry 12 months ahead for yearly interval', async () => {
    const before = new Date();
    await POST(makeReq({ interval: 'year' }));

    const call = stripe.promotionCodes.create.mock.calls[0][0];
    const expiresAt = call.expires_at;

    const expectedDate = new Date(before);
    expectedDate.setMonth(expectedDate.getMonth() + 12);

    expect(expiresAt).toBeGreaterThanOrEqual(Math.floor(expectedDate.getTime() / 1000) - 5);
    expect(expiresAt).toBeLessThanOrEqual(Math.floor(expectedDate.getTime() / 1000) + 5);
  });

  it('defaults to 1 month duration for any non-year interval', async () => {
    const before = new Date();
    await POST(makeReq({ interval: 'once' }));

    const call = stripe.promotionCodes.create.mock.calls[0][0];
    const expiresAt = call.expires_at;

    const expectedDate = new Date(before);
    expectedDate.setMonth(expectedDate.getMonth() + 1);

    expect(expiresAt).toBeGreaterThanOrEqual(Math.floor(expectedDate.getTime() / 1000) - 5);
    expect(expiresAt).toBeLessThanOrEqual(Math.floor(expectedDate.getTime() / 1000) + 5);
  });
});

// ─── Stripe call ──────────────────────────────────────────────────────────────

describe('Stripe promotion code creation', () => {
  it('calls stripe.promotionCodes.create with the patron coupon ID', async () => {
    await POST(makeReq({ interval: 'month' }));
    expect(stripe.promotionCodes.create).toHaveBeenCalledWith(
      expect.objectContaining({ coupon: 'TEST_COUPON_ID' })
    );
  });

  it('creates the code as active', async () => {
    await POST(makeReq({ interval: 'month' }));
    expect(stripe.promotionCodes.create).toHaveBeenCalledWith(
      expect.objectContaining({ active: true })
    );
  });

  it('includes expires_at in the Stripe call', async () => {
    await POST(makeReq({ interval: 'month' }));
    expect(stripe.promotionCodes.create).toHaveBeenCalledWith(
      expect.objectContaining({ expires_at: expect.any(Number) })
    );
  });

  it('returns the promo object from Stripe in the response', async () => {
    const res = await POST(makeReq({ interval: 'month' }));
    const data = await res.json();
    expect(data.promo.code).toBe('TESTCODE99');
    expect(data.promo.active).toBe(true);
  });
});

// ─── Status codes ─────────────────────────────────────────────────────────────

describe('Status codes', () => {
  it('returns 200 on success', async () => {
    const res = await POST(makeReq({ interval: 'month' }));
    expect(res.status).toBe(200);
  });

  it('returns 401 when unauthorized', async () => {
    const res = await POST(makeReq({ interval: 'month' }, 'bad-secret'));
    expect(res.status).toBe(401);
  });

  it('returns 500 when Stripe throws', async () => {
    stripe.promotionCodes.create.mockRejectedValueOnce(new Error('Stripe Error'));
    const res = await POST(makeReq({ interval: 'month' }));
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: 'Stripe Error' });
  });
});