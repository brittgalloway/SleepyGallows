/* @jest-environment jsdom */
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { StripePatron } from '@/shop/patron/PatronBtn'

// ─── Mocks ───────────────────────────────────────────────────────────────────

// stripe.client uses loadStripe which needs a real browser
jest.mock('@/lib/stripe.client', () => ({
  stripePromise: Promise.resolve({
    redirectToCheckout: jest.fn().mockResolvedValue({}),
  }),
}));

// stripe.server would call new Stripe() without a real key
jest.mock('@/lib/stripe.server', () => ({
  stripe: {},
  PATRON_PRODUCT: 'prod_test_patron',
  PATRON_COUPON: '6BusZfcF',
}));

global.fetch = jest.fn();

// Access the mock after jest.mock() has run so we can assert on it
const getMockRedirect = async () => {
  const { stripePromise } = require('@/lib/stripe.client');
  const stripe = await stripePromise;
  return stripe.redirectToCheckout;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const mockFetchSuccess = (sessionId = 'mock-session-id') =>
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ id: sessionId }),
  });

const mockFetchFailure = (message = 'Something went wrong') =>
  fetch.mockResolvedValueOnce({
    ok: false,
    text: async () => message,
  });

beforeEach(() => {
  jest.clearAllMocks();
});

// ─── Default state ────────────────────────────────────────────────────────────

describe('Default state', () => {
  it('renders the Become a Patron heading', () => {
    render(<StripePatron />);
    expect(screen.getByText('Become a Patron')).toBeInTheDocument();
  });

  it('defaults to Monthly frequency', () => {
    render(<StripePatron />);
    const monthlyRadio = screen.getByLabelText(/Monthly/i);
    expect(monthlyRadio).toBeChecked();
  });

  it('defaults to $5 for monthly', () => {
    render(<StripePatron />);
    expect(screen.getByTestId('monthly_5')).toBeChecked();
  });

  it('renders the Support button', () => {
    render(<StripePatron />);
    expect(screen.getByRole('button', { name: /support/i })).toBeInTheDocument();
  });
});

// ─── Frequency switching ──────────────────────────────────────────────────────

describe('Frequency switching', () => {
  it('switches to One-Time and defaults to $5', () => {
    render(<StripePatron />);
    fireEvent.click(screen.getByLabelText(/One-Time/i));
    expect(screen.getByTestId('once_5')).toBeChecked();
  });

  it('switches to Yearly and defaults to $60', () => {
    render(<StripePatron />);
    fireEvent.click(screen.getByLabelText(/Yearly/i));
    // The $60 option has data-testid="yearly_10" (second price slot in the yearly fieldset)
    expect(screen.getByTestId('yearly_10')).toBeChecked();
  });

  it('switches back to Monthly and defaults to $5', () => {
    render(<StripePatron />);
    fireEvent.click(screen.getByLabelText(/Yearly/i));
    fireEvent.click(screen.getByLabelText(/Monthly/i));
    expect(screen.getByTestId('monthly_5')).toBeChecked();
  });

  it('shows monthly price options when frequency is Monthly', () => {
    render(<StripePatron />);
    expect(screen.getByTestId('monthly_5')).toBeInTheDocument();
    expect(screen.getByTestId('monthly_10')).toBeInTheDocument();
    expect(screen.getByTestId('monthly_15')).toBeInTheDocument();
  });

  it('shows yearly price options when frequency is Yearly', () => {
    render(<StripePatron />);
    fireEvent.click(screen.getByLabelText(/Yearly/i));
    expect(screen.getByTestId('yearly_12')).toBeInTheDocument();
    expect(screen.getByTestId('yearly_10')).toBeInTheDocument();
    expect(screen.getByTestId('yearly_120')).toBeInTheDocument();
  });

  it('shows one-time price options when frequency is One-Time', () => {
    render(<StripePatron />);
    fireEvent.click(screen.getByLabelText(/One-Time/i));
    expect(screen.getByTestId('once_5')).toBeInTheDocument();
    expect(screen.getByTestId('once_10')).toBeInTheDocument();
    expect(screen.getByTestId('once_15')).toBeInTheDocument();
  });
});

// ─── Price selection ──────────────────────────────────────────────────────────

describe('Price selection', () => {
  it('selects a different monthly price when clicked', () => {
    render(<StripePatron />);
    fireEvent.click(screen.getByTestId('monthly_10'));
    expect(screen.getByTestId('monthly_10')).toBeChecked();
  });

  it('selects a yearly price when clicked', () => {
    render(<StripePatron />);
    fireEvent.click(screen.getByLabelText(/Yearly/i));
    fireEvent.click(screen.getByTestId('yearly_12'));
    expect(screen.getByTestId('yearly_12')).toBeChecked();
  });
});

// ─── Patron's Choice custom input ─────────────────────────────────────────────

describe("Patron's Choice custom input", () => {
  it('accepts a valid whole number', () => {
    render(<StripePatron />);
    const input = screen.getByTestId('monthly_pc');
    fireEvent.change(input, { target: { value: '7' } });
    expect(input.value).toBe('7');
    expect(input.validationMessage).toBe('');
  });

  it('accepts a valid decimal with 2 places', () => {
    render(<StripePatron />);
    const input = screen.getByTestId('monthly_pc');
    fireEvent.change(input, { target: { value: '1.50' } });
    expect(input.value).toBe('1.50');
    expect(input.validationMessage).toBe('');
  });

  it('rejects a decimal with more than 2 places', () => {
    render(<StripePatron />);
    const input = screen.getByTestId('monthly_pc');
    fireEvent.change(input, { target: { value: '1.5089' } });
    expect(input.value).toBe('1.5089');
    expect(input.validationMessage).not.toBe('');
  });

  it('shows the Patron\'s Choice input for monthly frequency', () => {
    render(<StripePatron />);
    expect(screen.getByTestId('monthly_pc')).toBeInTheDocument();
  });

  it('shows the Patron\'s Choice input for yearly frequency', () => {
    render(<StripePatron />);
    fireEvent.click(screen.getByLabelText(/Yearly/i));
    expect(screen.getByTestId('yearly_pc')).toBeInTheDocument();
  });

  it('shows the Patron\'s Choice input for one-time frequency', () => {
    render(<StripePatron />);
    fireEvent.click(screen.getByLabelText(/One-Time/i));
    expect(screen.getByTestId('once_pc')).toBeInTheDocument();
  });
});

// ─── Support button — checkout flow ──────────────────────────────────────────

describe('Support button — checkout flow', () => {
  it('calls fetch with the correct patron data when Support is clicked', async () => {
    mockFetchSuccess();
    render(<StripePatron />);
    fireEvent.click(screen.getByRole('button', { name: /support/i }));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    const body = JSON.parse(fetch.mock.calls[0][1].body);
    expect(fetch).toHaveBeenCalledWith(
      '/api/create_patron',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
      })
    );
    // Default is monthly $5
    expect(body.patron.interval).toBe('month');
    expect(parseFloat(body.patron.price)).toBe(5);
  });

  it('sends the selected price and interval in the request body', async () => {
    mockFetchSuccess();
    render(<StripePatron />);

    // Switch to yearly and select $120
    fireEvent.click(screen.getByLabelText(/Yearly/i));
    fireEvent.click(screen.getByTestId('yearly_120'));
    fireEvent.click(screen.getByRole('button', { name: /support/i }));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    const body = JSON.parse(fetch.mock.calls[0][1].body);
    expect(body.patron.interval).toBe('year');
    expect(parseFloat(body.patron.price)).toBe(120);
  });

  it('calls redirectToCheckout with the session id on success', async () => {
    mockFetchSuccess('test-session-xyz');
    render(<StripePatron />);
    fireEvent.click(screen.getByRole('button', { name: /support/i }));

    const mockRedirectToCheckout = await getMockRedirect();
    await waitFor(() =>
      expect(mockRedirectToCheckout).toHaveBeenCalledWith({
        sessionId: 'test-session-xyz',
      })
    );
  });

  it('shows a spinner while loading', async () => {
    // Keep fetch pending so loading state persists
    fetch.mockReturnValueOnce(new Promise(() => {}));
    render(<StripePatron />);
    fireEvent.click(screen.getByRole('button', { name: /support/i }));

    await waitFor(() =>
      expect(screen.getByLabelText(/spinning/i)).toBeInTheDocument()
    );
  });

  it('shows an error message when the API call fails', async () => {
    mockFetchFailure();
    render(<StripePatron />);
    fireEvent.click(screen.getByRole('button', { name: /support/i }));

    await waitFor(() =>
      expect(screen.getByRole('alert')).toBeInTheDocument()
    );
  });

  it('does not call redirectToCheckout when the API call fails', async () => {
    mockFetchFailure();
    render(<StripePatron />);
    fireEvent.click(screen.getByRole('button', { name: /support/i }));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    const mockRedirectToCheckout = await getMockRedirect();
    expect(mockRedirectToCheckout).not.toHaveBeenCalled();
  });
});