import React from 'react';
import { render, screen } from '__tests__/test-utils';
import EstimateFooter from 'components/sections/general-settings/terms-and-condition/EstimateFooterTab';

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

describe('EstimateFooterTab', () => {
  it('renders the form', () => {
    render(<EstimateFooter />);
    expect(document.getElementById('terms-and-conditions-form')).toBeInTheDocument();
  });

  it('renders Terms and Conditions section', () => {
    render(<EstimateFooter />);
    expect(screen.getByText('Terms and Conditions')).toBeInTheDocument();
  });

  it('renders Other Information section', () => {
    render(<EstimateFooter />);
    expect(screen.getByText('Other Information')).toBeInTheDocument();
  });

  it('renders 2 editor instances', () => {
    render(<EstimateFooter />);
    const editors = screen.getAllByTestId('mock-editor');
    expect(editors).toHaveLength(2);
  });

  it('populates editors with default values', () => {
    render(<EstimateFooter />);
    const editors = screen.getAllByTestId('mock-editor');
    // Terms and conditions should have content
    expect(editors[0].textContent || (editors[0] as HTMLTextAreaElement).value).toBeTruthy();
    // Other information should have content
    expect(editors[1].textContent || (editors[1] as HTMLTextAreaElement).value).toBeTruthy();
  });

  it('renders character limit labels', () => {
    render(<EstimateFooter />);
    expect(screen.getByText('Max: 970 char')).toBeInTheDocument();
    expect(screen.getByText('Max: 330 char')).toBeInTheDocument();
  });

  it('has correct section IDs', () => {
    render(<EstimateFooter />);
    expect(document.getElementById('field-estimate-terms')).toBeInTheDocument();
    expect(document.getElementById('field-estimate-other-info')).toBeInTheDocument();
  });
});
