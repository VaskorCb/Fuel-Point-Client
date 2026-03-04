import React from 'react';
import { render, screen } from '__tests__/test-utils';
import WarrantyTab from 'components/sections/general-settings/terms-and-condition/WarrantyTab';

// Override the global next/dynamic mock to actually resolve the loader
// so that the Editor module mock below takes effect
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

describe('WarrantyTab', () => {
  it('renders the form', () => {
    render(<WarrantyTab />);
    expect(document.getElementById('terms-and-conditions-form')).toBeInTheDocument();
  });

  it('renders Warranty section', () => {
    render(<WarrantyTab />);
    expect(screen.getByText('Warranty')).toBeInTheDocument();
  });

  it('renders Limited Warranty section', () => {
    render(<WarrantyTab />);
    expect(screen.getByText('Limited Warranty')).toBeInTheDocument();
  });

  it('renders 2 editor instances', () => {
    render(<WarrantyTab />);
    const editors = screen.getAllByTestId('mock-editor');
    expect(editors).toHaveLength(2);
  });

  it('populates warranty editor with default value', () => {
    render(<WarrantyTab />);
    const editors = screen.getAllByTestId('mock-editor');
    expect(editors[0]).toHaveValue('1 year/12000 miles');
  });

  it('populates limited warranty editor with default value', () => {
    render(<WarrantyTab />);
    const editors = screen.getAllByTestId('mock-editor');
    expect(editors[1]).toHaveValue('None');
  });

  it('renders character limit labels', () => {
    render(<WarrantyTab />);
    expect(screen.getByText('Max: 900 char')).toBeInTheDocument();
    expect(screen.getByText('Max: 1400 char')).toBeInTheDocument();
  });
});
