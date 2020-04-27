import {DefaultTheme} from 'styled-components';

type Theme = {
  breakpoints: {
    sm: number;
    md: number;
    lg: number;
  };
  spacings: {
    0: 0;
    1: string;
    2: string;
    3: string;
  };
  colors: {
    green: {
      [name: string]: string;
    };
  };
};

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}

declare module './types' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}

export const theme: DefaultTheme = {
  breakpoints: {
    sm: 0,
    md: 757,
    lg: 1025,
  },
  colors: {
    green: {
      light: 'lightgreen',
      dark: 'darkgreen',
    },
  },
  spacings: {
    0: 0,
    1: '0.25em',
    2: '0.5em',
    3: '1em',
  },
};
