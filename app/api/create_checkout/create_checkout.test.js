import { createMocks } from 'node-mocks-http'
import { POST } from '@/api/create_checkout/route'
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

describe('Checkout redirects after success or canceled/failed transactions', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return 400 if items is missing', async () => {
      const { req, res } = createMocks({ method: 'POST' });
  
        req.url = 'http://localhost/api/create_checkout'; 
        req.json = jest.fn().mockResolvedValue({}); 

        const response = await POST(req, res);
        const responseData = await response.json();
  
      expect(response.status).toBe(400);
      expect(responseData).toEqual({ error: 'Cart is empty' });
    });
  
    it('should send user to /shop if payment fails or is canceled', async () => {

      const { req, res } = createMocks({ method: 'POST' });
  
      req.url = 'http://localhost/api/create_checkout';
      req.json = jest.fn().mockResolvedValue({
        items: [
            {
                price: 'price_1QuNqtJiAoJrRPIxzGumHi4F',
                quantity: 1,
            },
        ],
      });
  
      const response = await POST(req, res);
  
      expect(response.status).toBe(200);
      
      expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
        expect.objectContaining({
            cancel_url: 'http://localhost/shop',
        })
      );
    });
  
    it('should send user to /shop/thank_you if payment is successful', async () => {
      fetch.mockResolvedValueOnce({
        json: async () => ({ promo: { code: 'PROMO123' } }),
      });
  
      const { req, res } = createMocks({ method: 'POST' });
  
      req.url = 'http://localhost/api/create_checkout'; 
      req.json = jest.fn().mockResolvedValue({
        items: [
            {
                price: 'price_1QuNqtJiAoJrRPIxzGumHi4F',
                quantity: 1,
            },
        ],
      });
  
      const response = await POST(req, res);
  
      expect(response.status).toBe(200);
  
      expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
        expect.objectContaining({
          success_url: 'http://localhost/shop/thank_you',
        })
      );
    });
  
    it('should return 500 if Stripe API fails', async () => {

      stripe.checkout.sessions.create.mockRejectedValueOnce(new Error('Stripe Error'));
  
      const { req, res } = createMocks({ method: 'POST' });
  
      req.url = 'http://localhost/api/create_checkout'; 
      req.json = jest.fn().mockResolvedValue({
        items: [
            {
                price: 'price_1QuNqtJiAoJrRPIxzGumHi4F',
                quantity: 1,
            },
        ],
      });
  
      const response = await POST(req, res);
      const responseData = await response.json(); 
  
      expect(response.status).toBe(500);
      expect(responseData.error).toBe('Stripe Error');
    });
});
describe('Checkout session object properties', () => {
    it('should have allow_promotion_codes true', async () => {
        const { req, res } = createMocks({ method: 'POST' });

        req.url = 'http://localhost/api/create_checkout'; 

        req.json = jest.fn().mockResolvedValue({
            items: [
                {
                    price: 'price_1QuNqtJiAoJrRPIxzGumHi4F',
                    quantity: 2,
                },
            ],
        });

        expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
            expect.objectContaining({
                allow_promotion_codes: true,
            })
        );
    });
    it('should allow shipping', async () => {
        const { req, res } = createMocks({ method: 'POST' });

        req.url = 'http://localhost/api/create_checkout'; 

        req.json = jest.fn().mockResolvedValue({
            items: [
                {
                    price: 'price_1QuNqtJiAoJrRPIxzGumHi4F',
                    quantity: 2,
                },
            ],
        });

        expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
            expect.objectContaining({
                shipping_address_collection: {
                    allowed_countries: [
                      'US',
                      'CA',
                      'MX'
                    ]
                  },
                shipping_options: [
                    {
                        shipping_rate:'shr_1QuqfTJiAoJrRPIxEZjH27YW',
                    }
                ],
            })
        );
    });
    it('should create an invoice', async () => {
        const { req, res } = createMocks({ method: 'POST' });

        req.url = 'http://localhost/api/create_checkout'; 

        req.json = jest.fn().mockResolvedValue({
            items: [
                {
                    price: 'price_1QuNqtJiAoJrRPIxzGumHi4F',
                    quantity: 2,
                },
            ],
        });

        expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
            expect.objectContaining({
                invoice_creation: {
                    enabled: true,
                },
            })
        );
    });
})