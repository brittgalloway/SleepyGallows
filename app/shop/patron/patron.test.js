import '@testing-library/react'
import {cleanup, render, screen, fireEvent} from '@testing-library/react'
import { afterEach } from 'node:test'
import { PATRON_PRODUCT,
    PATRON_LINK_5,
    PATRON_LINK_10,
    PATRON_LINK_15,
    PATRON_LINK_MONTHLY_5,
    PATRON_LINK_MONTHLY_10,
    PATRON_LINK_MONTHLY_15,
    PATRON_LINK_YEARLY_12,
    PATRON_LINK_YEARLY_60,
    PATRON_LINK_YEARLY_120
 } from '@/lib/stripe'
import { describe } from 'node:test';

describe('Patron variables required to pass the correct data are valid', () => {
    const patronOptions = [
        PATRON_LINK_5,
        PATRON_LINK_10,
        PATRON_LINK_15,
        PATRON_LINK_MONTHLY_5,
        PATRON_LINK_MONTHLY_10,
        PATRON_LINK_MONTHLY_15,
        PATRON_LINK_YEARLY_12,
        PATRON_LINK_YEARLY_60,
        PATRON_LINK_YEARLY_120
    ];
    it('is PATRON_PRODUCT and should have a string that starts with /prod_/', () => {
        expect(() => {
            PATRON_PRODUCT.toMatch(/^prod_/);
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

describe('Patron choosing the payment price and frequency', () => {
    it('shoud select the default price, when changing the Payment Frequency', () => {});
    it('should be a whole number when the user inputs their own price, 1.50 should fail', () => {});

});
describe('Patron redirects after success or canceled/failed transactions', () => {
    it('should send the user back to /patron if the payment/cart is failed or cancelled', () => {});
    it('should send the user to /patron/thank_you_patron if the payment is sucessful', () => {});
    it('should create a new promotion code when /thank_you_patron triggers /api/create_promotion', () =>{});
});