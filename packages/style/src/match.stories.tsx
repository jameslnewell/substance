import * as React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {match} from './match';
import {theme} from './story-theme';
import {square} from './story-styles';

export default {title: 'style/match()'};

const Square = styled.div(
  square,
  match('sm')({
    backgroundColor: 'red',
  }),
  match('md')({
    backgroundColor: 'green',
  }),
  match('lg')({
    backgroundColor: 'blue',
  }),
);

export const Default = () => (
  <ThemeProvider theme={theme}>
    <Square />
  </ThemeProvider>
);
