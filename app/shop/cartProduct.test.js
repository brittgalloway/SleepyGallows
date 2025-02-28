/* @jest-environment jsdom */
import '@testing-library/react'
import { render, screen, fireEvent } from '@testing-library/react'
import { CartProduct } from '@/components/CartProduct'
import Checkout from '@/components/checkout'
import { CartContext } from '@/shop/cartContext'

jest.mock('../lib/stripe', () =>({
    stripe : '',
}));

const mockSetCart = jest.fn();

const mockCart = {
  count: 2,
  items: [
    {
      productName: "Test Product",
      productDisplay: "/test-image.jpg",
      productDescription: "A great product",
      productPrice: 10,
      productStock: 5,
      price: "test_price_123",
      quantity: 2
    }
  ]
};

const renderCartProduct = (cart = mockCart) => {
    render(
        <CartContext.Provider value={{ cart, setCart: mockSetCart }}>
            <CartProduct />
        </CartContext.Provider>
    );
};
const renderCheckout = (cart = mockCart) => {
    render(
        <CartContext.Provider value={{ cart, setCart: mockSetCart }}>
            <Checkout/>
        </CartContext.Provider>
    );
};

describe('Add items to the cart', () => {
    renderCheckout();
});
describe('The cart', () => {
    it('should have items array of objects', () => {
        renderCartProduct();
        expect(screen.getByText("Test Product")).toBeInTheDocument();
        expect(screen.getByText("A great product")).toBeInTheDocument();
        expect(screen.getByText("Qty: 2")).toBeInTheDocument();
    });
    it('should be an object with name, image, stock, price, and description', () =>{
        renderCartProduct();
        const productImage = screen.getByRole('img', { name: /test product product thumbnail/i });
        const productName = screen.getByText("Test Product");
        const productDescription = screen.getByText("A great product");
        const productPrice = screen.getByText("Unit Price: $10.00");
    
        expect(productImage).toBeInTheDocument();
        expect(productName).toBeInTheDocument();
        expect(productDescription).toBeInTheDocument();
        expect(productPrice).toBeInTheDocument();
    });
    it("should update quantity when changed", () => {
        renderCartProduct();
        const qtyInput = screen.getByTestId("item-qty-input_test_price_123");
        
        fireEvent.change(qtyInput, { target: { value: "3" } });
        expect(mockSetCart).toHaveBeenCalled();
    });
    it('should remove an item when the remove button is clicked', () =>{
        renderCartProduct();
        const removeButton = screen.getByTestId("delete-item_test_price_123");

        fireEvent.click(removeButton);
        expect(mockSetCart).toHaveBeenCalled();
    });
    it('should disable checkout button if the cart is empty', () =>{
 
        renderCheckout({ count: 0, items: [] });

        const checkoutButton = screen.getByTestId('checkout-button');
        expect(checkoutButton).toBeDisabled();

    });
    it('should have atleast one item in the cart to enable the "checkout" button', () =>{
        renderCheckout();

        const checkoutButton = screen.getByTestId('checkout-button');
        expect(checkoutButton).not.toBeDisabled();
    });
    it('should keep the cart data if the checkout session is canceled or fails', () =>{});
});