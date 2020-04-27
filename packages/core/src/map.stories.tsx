import * as React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {map} from './map';
import {theme} from './story-theme';
import {square} from './story-styles';

declare module 'styled-components' {
  export interface DefaultTheme {
    breakpoints: {
      sm: number;
      md: number;
      lg: number;
    };
    colors: {
      red: string;
      green: string;
      blue: string;
    }  
  }
}

export default { title: 'map()' };

const Square = styled.div(
  square,
  map(
    {
      sm: 'red', 
      md: 'green', 
      lg: 'blue'
    }, 
    (value, props) => ({backgroundColor: props.theme?.colors[value]})
  )
);

export const Default = () => (
  <ThemeProvider theme={theme}>
    <Square/>
  </ThemeProvider>
);
