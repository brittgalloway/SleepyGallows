import { 
    USER_ACCOUNT_LINK,
    PATRON_PRODUCT,
    PATRON_COUPON,
    PATRON_5,
    PATRON_10,
    PATRON_15,
    PATRON_MONTHLY_5,
    PATRON_MONTHLY_10,
    PATRON_MONTHLY_15,
    PATRON_YEARLY_12,
    PATRON_YEARLY_60,
    PATRON_YEARLY_120
 } from '@/lib/stripe'

describe('Patron variables required to pass the correct data are valid', () => {
    const patronOptions = [
        PATRON_5,
        PATRON_10,
        PATRON_15,
        PATRON_MONTHLY_5,
        PATRON_MONTHLY_10,
        PATRON_MONTHLY_15,
        PATRON_YEARLY_12,
        PATRON_YEARLY_60,
        PATRON_YEARLY_120
    ];
    it('is PATRON_PRODUCT and should have a string that starts with /prod_/', () => {
        expect(() => {
            PATRON_PRODUCT.toMatch(/^prod_/);
        })
    });
    it('is PATRON_COUPON and should be an alphanumeric string ', () => {
        expect(() => {
          PATRON_COUPON.toMatch(/[0-9a-z]/i);
        })
    });
    it('is USER_ACCOUNT_LINK and should be a Stripe billing login link ', () => {
        expect(() => {
          USER_ACCOUNT_LINK.toMatch(/https:\/\/billing.stripe.com\/p\/login\/[?_0-9a-z]+/i);
        })
    });
    test.each(Object.entries(patronOptions))('%s should have exactly 2 properties', (_, obj) => {
        const objectLength = Object.keys(obj).length;
        expect(objectLength).toBe(2);
      });
    test.each(Object.entries(patronOptions))('%s should have a valid value if not in sandbox', (_, obj) => {        
        expect(obj).not.toBeUndefined();
        expect(obj).not.toBe('');
        expect(obj.price).not.toBeUndefined();
        expect(obj.price).not.toBeNaN();
        expect(obj.interval).not.toBe('');
        expect(obj.interval).not.toBeUndefined();
    });
});