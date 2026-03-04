import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomTabPanel from 'components/common/CustomTabPanel';

describe('CustomTabPanel', () => {
  it('renders children when value matches index', () => {
    render(
      <CustomTabPanel value={1} index={1}>
        <div>Tab Content</div>
      </CustomTabPanel>,
    );
    expect(screen.getByText('Tab Content')).toBeInTheDocument();
  });

  it('hides content when value does not match index', () => {
    render(
      <CustomTabPanel value={1} index={2}>
        <div>Hidden Content</div>
      </CustomTabPanel>,
    );
    expect(screen.queryByText('Hidden Content')).not.toBeInTheDocument();
  });

  it('has correct tabpanel role', () => {
    render(
      <CustomTabPanel value={1} index={1}>
        <div>Content</div>
      </CustomTabPanel>,
    );
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
  });

  it('has correct id attribute', () => {
    render(
      <CustomTabPanel value={3} index={3}>
        <div>Content</div>
      </CustomTabPanel>,
    );
    expect(screen.getByRole('tabpanel')).toHaveAttribute('id', 'custom-tabpanel-3');
  });

  it('has correct aria-labelledby attribute', () => {
    render(
      <CustomTabPanel value={2} index={2}>
        <div>Content</div>
      </CustomTabPanel>,
    );
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'custom-tab-2');
  });

  it('sets hidden attribute when inactive', () => {
    const { container } = render(
      <CustomTabPanel value={1} index={2}>
        <div>Content</div>
      </CustomTabPanel>,
    );
    const panel = container.querySelector('[role="tabpanel"]');
    expect(panel).toHaveAttribute('hidden');
  });

  it('does not set hidden attribute when active', () => {
    const { container } = render(
      <CustomTabPanel value={1} index={1}>
        <div>Content</div>
      </CustomTabPanel>,
    );
    const panel = container.querySelector('[role="tabpanel"]');
    expect(panel).not.toHaveAttribute('hidden');
  });
});
