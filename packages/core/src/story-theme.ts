import {DefaultTheme} from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    breakpoints: {
      sm: number;
      md: number;
      lg: number;
    },
    spacings: {
      0: 0;
      1: string;
      2: string;
      3: string;
    },
    colors: {
      red: string;
      green: string;
      blue: string;
    };
  }
}

export const theme: DefaultTheme = {
  breakpoints: {
    sm: 0,
    md: 757, 
    lg: 1025
  },
  colors: {
    red: 'pink',
    green: 'lime',
    blue: 'skyblue'
  },
  spacings: {
    0: 0,
    1: '0.25em',
    2: '0.5em',
    3: '1em',
  } 
};
