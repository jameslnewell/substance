import * as React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {breakpoint} from './breakpoint';
import {theme} from './story-theme';
import {square} from './story-styles';

export default {title: 'breakpoint()'};

const Square = styled.div(
  square,
  breakpoint('sm')({
    backgroundColor: 'green.dark',
  }),
  breakpoint('md')({
    backgroundColor: 'green.light',
  }),
  breakpoint('lg')({
    backgroundColor: 'green.light',
  }),
);

export const Default = () => (
  <ThemeProvider theme={theme}>
    <Square />
  </ThemeProvider>
);
