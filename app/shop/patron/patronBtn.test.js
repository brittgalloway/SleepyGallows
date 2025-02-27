/* @jest-environment jsdom */
import '@testing-library/react'
import { render, screen, fireEvent } from '@testing-library/react'
import { StripePatron } from '@/shop/Patron/PatronBtn'
  
jest.mock('../../lib/stripe', () =>({
    stripe : '',
}));

describe('Patron choosing the payment price and frequency', () => {

    it('shoud select the default price, when changing the Payment Frequency', () => {
        render(<StripePatron />);
        
        // Check default frequency is Monthly
        const monthlyRadio = screen.getByLabelText(/Monthly/i);
        expect(monthlyRadio).toBeChecked();
        
        // Check default amount is $5 (Monthly)
        const defaultMonthlyAmount = screen.getByTestId('monthly_5');
        expect(defaultMonthlyAmount).toBeChecked();

        // Change to Yearly
        const yearlyRadio = screen.getByLabelText(/Yearly/i);
        fireEvent.click(yearlyRadio);

        // Ensure default yearly price is $60
        const defaultYearlyAmount = screen.getByTestId('yearly_60');
        expect(defaultYearlyAmount).toBeChecked();

        // Change to One-Time
        const onceRadio = screen.getByLabelText(/One-Time/i);
        fireEvent.click(onceRadio);

        // Ensure default one-time price is $5
        const defaultOnceAmount = screen.getByTestId('once_5');
        expect(defaultOnceAmount).toBeChecked();
    });
    it('should be a number with 0-2 digits after the decimal if present when the user inputs their own price, 1.143 should fail', () => {
        render(<StripePatron/>);
        
        // Get the custom input field for monthly amount
        const customAmountInput = screen.getByTestId('monthly_pc');

        // Enter valid whole value (2)
        fireEvent.change(customAmountInput, { target: { value: '2' } });

        expect(customAmountInput.value).toBe('2');
        expect(customAmountInput.validationMessage).toBe('');

        // Enter valid decimal value (1.50)
        fireEvent.change(customAmountInput, { target: { value: '1.50' } });
    
        expect(customAmountInput.value).toBe('1.50');
        expect(customAmountInput.validationMessage).toBe('');
        
        // Enter invalid decimal value (1.5089)
        fireEvent.change(customAmountInput, { target: { value: '1.5089' } });

        expect(customAmountInput.value).toBe('1.5089');
        expect(customAmountInput.validationMessage).not.toBe('');
    });
});