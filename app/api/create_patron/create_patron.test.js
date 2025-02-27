import { createMocks } from 'node-mocks-http'
import { POST } from '@/api/create_patron/route'
import { stripe } from '@/lib/stripe'

global.fetch = jest.fn();

jest.mock('../../lib/stripe', () => ({
  stripe: {
    checkout: {
      sessions: {
        create: jest.fn().mockResolvedValue({ id: 'mock-session-id' }),
      },
    },
  },
}));

describe('Patron redirects after success or canceled/failed transactions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if patron tier is missing', async () => {
    const { req, res } = createMocks({ method: 'POST' });

    req.url = 'http://localhost/api/create_patron'; 
    req.json = jest.fn().mockResolvedValue({}); 

    const response = await POST(req, res);

    expect(response.status).toBe(400);
    const responseData = await response.json();
    expect(responseData).toEqual({ error: 'Patron tier not selected' });
  });

  it('should send user to /patron if payment fails or is canceled', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ promo: { code: 'TESTCODE123' } }),
    });

    stripe.checkout.sessions.create.mockResolvedValueOnce({
      id: 'mock-session-id',
    });

    const { req, res } = createMocks({ method: 'POST' });

    req.url = 'http://localhost/api/create_patron';
    req.json = jest.fn().mockResolvedValue({
      patron: {
        interval: 'once',
        price: 50,
      },
    });

    const response = await POST(req, res);
    const responseData = await response.json(); 

    expect(response.status).toBe(200);
    expect(responseData.id).toBe('mock-session-id');
    
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({
          cancel_url: 'http://localhost/shop/patron',
      })
    );
  });

  it('should send user to /patron/thank_you_patron if payment is successful', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ promo: { code: 'PROMO123' } }),
    });

    stripe.checkout.sessions.create.mockResolvedValueOnce({
      id: 'successful-session-id',
    });

    const { req, res } = createMocks({ method: 'POST' });

    req.url = 'http://localhost/api/create_patron'; 
    req.json = jest.fn().mockResolvedValue({
      patron: {
        interval: 'month',
        price: 100,
      },
    });

    const response = await POST(req, res);
    const responseData = await response.json();

    expect(response.status).toBe(200);
    expect(responseData.id).toBe('successful-session-id');

    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        success_url: 'http://localhost/shop/patron/thank_you_patron?promo=PROMO123&interval=month',
      })
    );
  });

  it('should return 500 if Stripe API fails', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ promo: { code: 'PROMO123' } }),
    });

    stripe.checkout.sessions.create.mockRejectedValueOnce(new Error('Stripe Error'));

    const { req, res } = createMocks({ method: 'POST' });

    req.url = 'http://localhost/api/create_patron'; 
    req.json = jest.fn().mockResolvedValue({
      patron: {
        interval: 'year',
        price: 200,
      },
    });

    const response = await POST(req, res);
    const responseData = await response.json(); 

    expect(response.status).toBe(500);
    expect(responseData.error).toBe('Stripe Error');
  });
  it('is patron.interval === \'once\' and should have submit_type donate', async() => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ promo: { code: 'PROMO143' } }),
    });

    stripe.checkout.sessions.create.mockResolvedValueOnce({
      id: 'successful-session-id',
    });

    const { req, res } = createMocks({ method: 'POST' });

    req.url = 'http://localhost/api/create_patron'; 
    req.json = jest.fn().mockResolvedValue({
      patron: {
        interval: 'once',
        price: 100,
      },
    });

    const response = await POST(req, res);
    const responseData = await response.json();

    expect(responseData.id).toBe('successful-session-id');

    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        submit_type: 'donate',
      })
    );
  });
  it('is patron.interval !== \'once\' and should have submit_type donate', async() => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ promo: { code: 'PROMO143' } }),
    });

    stripe.checkout.sessions.create.mockResolvedValueOnce({
      id: 'successful-session-id',
    });

    const { req, res } = createMocks({ method: 'POST' });

    req.url = 'http://localhost/api/create_patron'; 
    req.json = jest.fn().mockResolvedValue({
      patron: {
        interval: 'month',
        price: 20,
      },
    });

    const response = await POST(req, res);
    const responseData = await response.json();

    expect(responseData.id).toBe('successful-session-id');
    
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        submit_type: 'donate',
      })
    );
  });
});
