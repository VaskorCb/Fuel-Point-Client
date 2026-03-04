import React, { PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssVarsProvider, extendTheme } from '@mui/material/styles';

// Create a theme with CSS variables enabled (matches the project's use of theme.vars)
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#1976d2' },
        text: { primary: '#000', secondary: '#666' },
        background: { default: '#fff', paper: '#fff' },
        divider: '#e0e0e0',
      },
    },
  },
});

const AllProviders = ({ children }: PropsWithChildren) => {
  return <CssVarsProvider theme={theme}>{children}</CssVarsProvider>;
};

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllProviders, ...options });

// Re-export everything from testing-library
export * from '@testing-library/react';
export { customRender as render };
