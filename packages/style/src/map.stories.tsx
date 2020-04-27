import * as React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {map} from './map';
import {theme} from './story-theme';
import {square} from './story-styles';

export default {title: 'map()'};

const Square = styled.div(
  square,
  map(
    {
      sm: 'dark',
      lg: 'light',
    },
    (value, props) => ({backgroundColor: props.theme?.color.green?.[value]}),
  ),
);

export const Default: React.FC = () => (
  <ThemeProvider theme={theme}>
    <Square />
  </ThemeProvider>
);
