import React from 'react';
import { render, screen, waitFor } from '__tests__/test-utils';
import userEvent from '@testing-library/user-event';
import ShopInformation from 'components/sections/general-settings/shop-information/ShopInformation';

// Mock the IconifyIcon component
jest.mock('components/base/IconifyIcon', () => {
  return function MockIconifyIcon(props: { icon?: string }) {
    return <span data-testid="iconify-icon">{props.icon}</span>;
  };
});

describe('ShopInformation', () => {
  it('renders the form', () => {
    render(<ShopInformation />);
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
  });

  it('renders all contact information fields', () => {
    render(<ShopInformation />);
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone \(main\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone \(l 2\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('renders all address fields', () => {
    render(<ShopInformation />);
    expect(screen.getByLabelText(/street/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^state$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/zip code/i)).toBeInTheDocument();
  });

  it('renders additional contact fields', () => {
    render(<ShopInformation />);
    expect(screen.getByLabelText(/fax/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/web/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contact name/i)).toBeInTheDocument();
  });

  it('renders regulatory fields', () => {
    render(<ShopInformation />);
    expect(screen.getByLabelText(/state reg/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/epa no/i)).toBeInTheDocument();
  });

  it('populates fields with default values', () => {
    render(<ShopInformation />);
    expect(screen.getByLabelText(/company name/i)).toHaveValue('VIP Auto Repair');
    expect(screen.getByLabelText(/phone \(main\)/i)).toHaveValue('(302) 555-1234');
    expect(screen.getByLabelText(/email/i)).toHaveValue('info@vipautorepair.com');
    expect(screen.getByLabelText(/city/i)).toHaveValue('Wilmington');
  });

  it('allows editing the company name', async () => {
    const user = userEvent.setup();
    render(<ShopInformation />);

    const input = screen.getByLabelText(/company name/i);
    await user.clear(input);
    await user.type(input, 'New Auto Shop');

    expect(input).toHaveValue('New Auto Shop');
  });

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<ShopInformation />);

    const emailInput = screen.getByLabelText(/email/i);
    await user.clear(emailInput);
    await user.type(emailInput, 'invalid-email');

    // Trigger form submission to show validation
    const form = document.getElementById('shop-information-form');
    if (form) {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    }

    await waitFor(() => {
      expect(screen.getByText(/please provide a valid email/i)).toBeInTheDocument();
    });
  });

  it('shows validation error when required field is empty', async () => {
    const user = userEvent.setup();
    render(<ShopInformation />);

    const companyNameInput = screen.getByLabelText(/company name/i);
    await user.clear(companyNameInput);

    // Trigger form validation
    const form = document.getElementById('shop-information-form');
    if (form) {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    }

    await waitFor(() => {
      expect(screen.getByText(/company name is required/i)).toBeInTheDocument();
    });
  });

  it('has correct form id', () => {
    render(<ShopInformation />);
    expect(document.getElementById('shop-information-form')).toBeInTheDocument();
  });
});
