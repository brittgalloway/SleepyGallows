import '@testing-library/react'
import {cleanup, render, screen, fireEvent} from '@testing-library/react'
import { 
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

/* @jest-environment jsdom */
describe('Patron choosing the payment price and frequency', () => {
    it('shoud select the default price, when changing the Payment Frequency', () => {});
    it('should be a whole number when the user inputs their own price, 1.50 should fail', () => {});

});