import * as React from 'react';
import {ThemeProvider} from 'styled-components';
import {Theme as ThemeInterface} from './types';

const defaultTheme = {
  breakpoints: {
    mobile: '0',      // targeting all devices
    tablet: '737px',  // targeting devices that are LARGER than the iPhone 6 Plus (which is 736px in landscape mode)
    desktop: '1025px' // targeting devices that are LARGER than the iPad (which is 1024px in landscape mode)
  },
  spacing: {
    0: '0',
    1: '0.25em',
    2: '0.5em',
    3: '1em',
    4: '2em',
    5: '4em',
    6: '8em',
  },
  colors: {
    brand: {
      primary: '#007bff',
      secondary: '#6c757d',
    },
    alert: {
      success: '#28a745',
      danger: '#dc3545',
      warning: '#ffc107',
      information: '#17a2b8',
    },
    shades: {
      white: '#fff',
      light: '#f8f9fa',
      medium: '#efefef',
      dark: '#333',
      black: '#000'
    }
  },
  typography: {
    copy: {
      font: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
    }
  },
  container: {
    maxWidth: '1024px'
  }
}

// TODO: on mount load any necessary fonts
export const Theme = ({theme, children}: {theme?: ThemeInterface, children: React.ReactNode}) => (
  <ThemeProvider theme={{
    ...defaultTheme,
    ...theme
  }}>
    {children}
  </ThemeProvider>
);
