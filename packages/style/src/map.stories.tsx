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
      sm: 'red',
      md: 'green',
      lg: 'blue',
    },
    (value, props) => ({backgroundColor: props.theme?.colors[value]}),
  ),
);

export const Default: React.FC = () => (
  <ThemeProvider theme={theme}>
    <Square />
  </ThemeProvider>
);
