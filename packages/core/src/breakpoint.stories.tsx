import * as React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {breakpoint} from './breakpoint';
import {theme} from './story-theme';
import {square} from './story-styles';

declare module 'styled-components' {
  export interface DefaultTheme {
    breakpoints: {
      sm: number;
      md: number;
      lg: number;
    }
  }
}

export default { title: 'breakpoint()' };

const Square = styled.div(
  square,
  breakpoint('sm')({
    backgroundColor: 'red'
  }),
  breakpoint('md')({
    backgroundColor: 'green'
  }),
  breakpoint('lg')({
    backgroundColor: 'blue'
  })
);

export const Default = () => (
  <ThemeProvider theme={theme}>
    <Square/>
  </ThemeProvider>
);
