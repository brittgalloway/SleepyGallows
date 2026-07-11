/* @jest-environment jsdom */
import { render, screen, fireEvent } from '@testing-library/react'
import { CartProduct } from '@/components/CartProduct'
import Checkout from '@/components/checkout'
import AddToCart from '@/components/addToCart'
import { CartContext } from '@/shop/cartContext'

// ─── Mocks ───────────────────────────────────────────────────────────────────

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }) => <img src={src} alt={alt} {...props} />,
}));

jest.mock('@/lib/stripe.client', () => ({
  stripePromise: Promise.resolve({
    redirectToCheckout: jest.fn().mockResolvedValue({}),
  }),
}));

global.fetch = jest.fn();

// ─── Shared test data ─────────────────────────────────────────────────────────

const PRODUCT_A = {
  id: 'prod_aaa',
  _productName: 'Test Print',
  stock: 5,
  price: 10,
  discount: undefined,
  productDescription: 'A lovely print',
  thumbnail: '/test-print.jpg',
  shipping: 'print domestic',
};

const OUT_OF_STOCK_PRODUCT = {
  ...PRODUCT_A,
  id: 'prod_ccc',
  _productName: 'Sold Out Print',
  stock: 0,
};

const cartItemA = {
  id: 'prod_aaa',
  productName: 'Test Print',
  productDescription: 'A lovely print',
  productPrice: 10,
  productDiscount: undefined,
  productDisplay: '/test-print.jpg',
  productStock: 5,
  quantity: 1,
  shipping: 'print domestic',
};

const mockCartWithItem = { count: 1, shipping: 800, items: [cartItemA] };
const emptyCart = { count: 0, items: [], shipping: 0 };

// ─── Helper ───────────────────────────────────────────────────────────────────

const renderWithContext = (ui, cart = emptyCart, setCart = jest.fn()) =>
  render(
    <CartContext.Provider value={{ cart, setCart }}>
      {ui}
    </CartContext.Provider>
  );

// Wraps setCart so updater functions are applied to state and readable after
const liveSetCart = (initialCart) => {
  let state = JSON.parse(JSON.stringify(initialCart));
  const fn = jest.fn((updater) => { state = updater(state); });
  fn.getState = () => state;
  return fn;
};

// ─── CartProduct DOM elements ─────────────────────────────────────────────────

describe('CartProduct — DOM elements', () => {
  it('renders product name, description, price, and image', () => {
    renderWithContext(<CartProduct />, mockCartWithItem);
    expect(screen.getByText('Test Print')).toBeInTheDocument();
    expect(screen.getByText('A lovely print')).toBeInTheDocument();
    expect(screen.getByText('Unit Price: $10.00')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /test print product thumbnail/i })).toBeInTheDocument();
  });

  it('shows discounted price when productDiscount is set', () => {
    const cart = { ...mockCartWithItem, items: [{ ...cartItemA, productDiscount: 7 }] };
    renderWithContext(<CartProduct />, cart);
    expect(screen.getByText('Unit Price: $7.00')).toBeInTheDocument();
  });

  it('shows qty as static text when productStock is 1', () => {
    const cart = { ...mockCartWithItem, items: [{ ...cartItemA, productStock: 1 }] };
    renderWithContext(<CartProduct />, cart);
    expect(screen.getByText('Qty: 1')).toBeInTheDocument();
    expect(screen.queryByRole('spinbutton')).not.toBeInTheDocument();
  });

  it('shows qty input when productStock is greater than 1', () => {
    renderWithContext(<CartProduct />, mockCartWithItem);
    const input = screen.getByTestId('item-qty-input_prod_aaa');
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('1');
  });
});

// ─── CartProduct — removing items ─────────────────────────────────────────────

describe('CartProduct — removing items', () => {
  it('calls setCart when remove button is clicked', () => {
    const setCart = jest.fn();
    renderWithContext(<CartProduct />, mockCartWithItem, setCart);
    fireEvent.click(screen.getByTestId('delete-item_prod_aaa'));
    expect(setCart).toHaveBeenCalledTimes(1);
  });

  it('removes the item from cart state', () => {
    const setCart = liveSetCart(mockCartWithItem);
    renderWithContext(<CartProduct />, mockCartWithItem, setCart);
    fireEvent.click(screen.getByTestId('delete-item_prod_aaa'));
    expect(setCart.getState().items).toHaveLength(0);
    expect(setCart.getState().count).toBe(0);
  });
});

// ─── CartProduct — updating quantity ──────────────────────────────────────────

describe('CartProduct — updating quantity', () => {
  it('calls setCart when qty input changes', () => {
    const setCart = jest.fn();
    renderWithContext(<CartProduct />, mockCartWithItem, setCart);
    fireEvent.change(screen.getByTestId('item-qty-input_prod_aaa'), {
      target: { value: '3' },
    });
    expect(setCart).toHaveBeenCalledTimes(1);
  });

  it('does not call setCart when qty is changed to less than 1', () => {
    const setCart = jest.fn();
    renderWithContext(<CartProduct />, mockCartWithItem, setCart);
    fireEvent.change(screen.getByTestId('item-qty-input_prod_aaa'), {
      target: { value: '0' },
    });
    expect(setCart).not.toHaveBeenCalled();
  });
});

// ─── AddToCart — stock states ─────────────────────────────────────────────────

describe('AddToCart — stock states', () => {
  it('shows "In Stock" when stock is available', () => {
    renderWithContext(<AddToCart {...PRODUCT_A} />);
    expect(screen.getByText('In Stock')).toBeInTheDocument();
  });

  it('shows "Sold Out" when stock is 0', () => {
    renderWithContext(<AddToCart {...OUT_OF_STOCK_PRODUCT} />);
    expect(screen.getByText('Sold Out')).toBeInTheDocument();
  });

  it('disables the button when stock is 0', () => {
    renderWithContext(<AddToCart {...OUT_OF_STOCK_PRODUCT} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});

// ─── AddToCart — adding products ──────────────────────────────────────────────

describe('AddToCart — adding products', () => {
  it('calls setCart when "Add To Cart" is clicked', () => {
    const setCart = jest.fn();
    renderWithContext(<AddToCart {...PRODUCT_A} />, emptyCart, setCart);
    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(setCart).toHaveBeenCalledTimes(1);
  });

  it('adds a new item to the cart with quantity 1', () => {
    const setCart = liveSetCart(emptyCart);
    renderWithContext(<AddToCart {...PRODUCT_A} />, emptyCart, setCart);
    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
    const state = setCart.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].productName).toBe('Test Print');
    expect(state.items[0].quantity).toBe(1);
    expect(state.count).toBe(1);
  });

  it('increments quantity when the same product is added again', () => {
    const setCart = liveSetCart(mockCartWithItem);
    renderWithContext(<AddToCart {...PRODUCT_A} />, mockCartWithItem, setCart);
    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
    const state = setCart.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
    expect(state.count).toBe(2);
  });

  it('does not exceed productStock when item is already at max quantity', () => {
    const maxCart = {
      count: 5,
      shipping: 800,
      items: [{ ...cartItemA, productStock: 5, quantity: 5 }],
    };
    const setCart = liveSetCart(maxCart);
    renderWithContext(<AddToCart {...PRODUCT_A} />, maxCart, setCart);
    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(setCart.getState().items[0].quantity).toBe(5);
    expect(setCart.getState().count).toBe(5);
  });

  it('shows "Added!" immediately after clicking, then reverts after 2s', () => {
    const { act } = require('@testing-library/react');
    jest.useFakeTimers();
    renderWithContext(<AddToCart {...PRODUCT_A} />);
    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(screen.getByText('Added!')).toBeInTheDocument();
    act(() => { jest.advanceTimersByTime(2000); });
    expect(screen.getByText('Add To Cart')).toBeInTheDocument();
    jest.useRealTimers();
  });
});

// ─── Checkout button visibility ───────────────────────────────────────────────

describe('Checkout button visibility', () => {
  it('does not render a checkout button when the cart is empty', () => {
    renderWithContext(<Checkout />, emptyCart);
    expect(screen.queryByTestId('checkout-button')).not.toBeInTheDocument();
  });

  it('renders an enabled checkout button when the cart has items', () => {
    renderWithContext(<Checkout />, mockCartWithItem);
    expect(screen.getByTestId('checkout-button')).toBeInTheDocument();
    expect(screen.getByTestId('checkout-button')).not.toBeDisabled();
  });
});