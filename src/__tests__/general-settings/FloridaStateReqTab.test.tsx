import React from 'react';
import { render, screen, waitFor } from '__tests__/test-utils';
import userEvent from '@testing-library/user-event';
import FloridaStateReq from 'components/sections/general-settings/terms-and-condition/FloridaStateReqTab';

// Override the global next/dynamic mock to resolve the loader
jest.mock('next/dynamic', () =>
  jest.fn().mockImplementation((loader: () => Promise<{ default: React.ComponentType }>) => {
    let Resolved: React.ComponentType | null = null;
    const prom = loader().then((m) => { Resolved = m.default; }).catch(() => {});
    const Dyn = (props: Record<string, unknown>) => {
      if (!Resolved) return null;
      return React.createElement(Resolved, props);
    };
    Dyn._promise = prom;
    Dyn.displayName = 'DynamicMock';
    return Dyn;
  }),
);

// Mock Editor
jest.mock('components/base/Editor', () => {
  return function MockEditor(props: {
    initialContent?: string;
    onChange?: (val: string) => void;
    isValid?: boolean;
  }) {
    return (
      <textarea
        data-testid="mock-editor"
        defaultValue={props.initialContent}
        onChange={(e) => props.onChange?.(e.target.value)}
        aria-invalid={!props.isValid}
      />
    );
  };
});

describe('FloridaStateReqTab', () => {
  it('renders the form', () => {
    render(<FloridaStateReq />);
    expect(document.getElementById('terms-and-conditions-form')).toBeInTheDocument();
  });

  it('renders 3 checkboxes', () => {
    render(<FloridaStateReq />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(3);
  });

  it('renders checkbox labels correctly', () => {
    render(<FloridaStateReq />);
    expect(screen.getByLabelText(/your right to a written estimate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/intended payment method/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/save replacement parts/i)).toBeInTheDocument();
  });

  it('all checkboxes are unchecked by default', () => {
    render(<FloridaStateReq />);
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((cb) => {
      expect(cb).not.toBeChecked();
    });
  });

  it('can toggle a checkbox', async () => {
    const user = userEvent.setup();
    render(<FloridaStateReq />);

    const writtenEstimate = screen.getByLabelText(/your right to a written estimate/i);
    expect(writtenEstimate).not.toBeChecked();

    await user.click(writtenEstimate);
    expect(writtenEstimate).toBeChecked();
  });

  it('renders Reset terms button', () => {
    render(<FloridaStateReq />);
    expect(screen.getByRole('button', { name: /reset terms/i })).toBeInTheDocument();
  });

  it('resets checkboxes when Reset terms is clicked', async () => {
    const user = userEvent.setup();
    render(<FloridaStateReq />);

    // Check all boxes first
    const checkboxes = screen.getAllByRole('checkbox');
    for (const cb of checkboxes) {
      await user.click(cb);
    }

    // Verify they're checked
    checkboxes.forEach((cb) => {
      expect(cb).toBeChecked();
    });

    // Click reset
    await user.click(screen.getByRole('button', { name: /reset terms/i }));

    // All should be unchecked
    await waitFor(() => {
      checkboxes.forEach((cb) => {
        expect(cb).not.toBeChecked();
      });
    });
  });

  it('renders Estimate footer - 1 section', () => {
    render(<FloridaStateReq />);
    expect(screen.getByText('Estimate footer - 1')).toBeInTheDocument();
  });

  it('renders Estimate footer - 2 section', () => {
    render(<FloridaStateReq />);
    expect(screen.getByText('Estimate footer - 2')).toBeInTheDocument();
  });

  it('renders character limit labels', () => {
    render(<FloridaStateReq />);
    const maxLabels = screen.getAllByText(/max: \d+ char/i);
    expect(maxLabels).toHaveLength(2);
  });

  it('renders 2 editor instances for footers', () => {
    render(<FloridaStateReq />);
    const editors = screen.getAllByTestId('mock-editor');
    expect(editors).toHaveLength(2);
  });
});
