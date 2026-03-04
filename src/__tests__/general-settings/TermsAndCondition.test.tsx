import React, { act } from 'react';
import { render, screen } from '__tests__/test-utils';
import userEvent from '@testing-library/user-event';
import TermsAndCondition from 'components/sections/general-settings/terms-and-condition/TermsAndCondition';

// Mock the Editor component (dynamically imported in sub-components)
jest.mock('components/base/Editor', () => {
  return function MockEditor(props: {
    initialContent?: string;
    onChange?: (val: string) => void;
    isValid?: boolean;
    editorHeight?: number;
  }) {
    return (
      <textarea
        data-testid="mock-editor"
        defaultValue={props.initialContent}
        onChange={(e) => props.onChange?.(e.target.value)}
        style={{ height: props.editorHeight }}
        aria-invalid={!props.isValid}
      />
    );
  };
});

// Mock IconifyIcon
jest.mock('components/base/IconifyIcon', () => {
  return function MockIconifyIcon(props: { icon?: string }) {
    return <span data-testid="iconify-icon">{props.icon}</span>;
  };
});

// Mock scroll-and-highlight utils
jest.mock('utils/scroll-and-highlight', () => ({
  SETTINGS_SEARCH_NAVIGATE: 'settings-search-navigate',
  SettingsSearchNavigateDetail: {},
}));

describe('TermsAndCondition', () => {
  it('renders the tab navigation', () => {
    render(<TermsAndCondition />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('renders all 6 tabs', () => {
    render(<TermsAndCondition />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(6);
  });

  it('renders correct tab labels', () => {
    render(<TermsAndCondition />);
    expect(screen.getByRole('tab', { name: /estimate footer/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /invoice footer/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /statement footer/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /florida state/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /warranty/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /self check-in/i })).toBeInTheDocument();
  });

  it('defaults to the Estimate footer tab (first tab)', () => {
    render(<TermsAndCondition />);
    // First tab should be selected
    const firstTab = screen.getByRole('tab', { name: /estimate footer/i });
    expect(firstTab).toHaveAttribute('aria-selected', 'true');
  });

  it('shows Estimate footer content by default', () => {
    render(<TermsAndCondition />);
    // The estimate footer form should be visible
    expect(screen.getByText(/terms and conditions/i)).toBeInTheDocument();
  });

  it('switches to Invoice footer tab on click', async () => {
    const user = userEvent.setup();
    render(<TermsAndCondition />);

    const invoiceTab = screen.getByRole('tab', { name: /invoice footer/i });
    await user.click(invoiceTab);

    expect(invoiceTab).toHaveAttribute('aria-selected', 'true');
  });

  it('switches to Warranty tab on click', async () => {
    const user = userEvent.setup();
    render(<TermsAndCondition />);

    const warrantyTab = screen.getByRole('tab', { name: /warranty/i });
    await user.click(warrantyTab);

    expect(warrantyTab).toHaveAttribute('aria-selected', 'true');
  });

  it('hides inactive tab panels', () => {
    render(<TermsAndCondition />);
    // All tabpanels except the active one should be hidden
    const tabpanels = screen.getAllByRole('tabpanel', { hidden: true });
    const hiddenPanels = tabpanels.filter((p) => p.getAttribute('hidden') !== null);
    // 5 out of 6 should be hidden
    expect(hiddenPanels.length).toBe(5);
  });

  it('responds to SETTINGS_SEARCH_NAVIGATE event', async () => {
    render(<TermsAndCondition />);

    // Dispatch a custom event to switch to Warranty tab (value: 5)
    await act(() => {
      window.dispatchEvent(
        new CustomEvent('settings-search-navigate', {
          detail: { tab: 'terms-and-conditions', subTab: 5 },
        }),
      );
    });

    // Warranty tab should now be selected
    const warrantyTab = screen.getByRole('tab', { name: /warranty/i });
    expect(warrantyTab).toHaveAttribute('aria-selected', 'true');
  });
});
