import {DefaultTheme} from 'styled-components';

type Theme = {
  color: {
    green: {
      [name: string]: string;
    };
  };
  media: {
    sm: string;
    md: string;
    lg: string;
  };
  space: {
    0: 0;
    1: string;
    2: string;
    3: string;
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
  color: {
    green: {
      light: 'lightgreen',
      dark: 'darkgreen',
    },
  },
  media: {
    sm: '(min-width: 0em)',
    md: '(min-width: 30em)',
    lg: '(min-width: 50em)',
  },
  space: {
    0: 0,
    1: '0.25em',
    2: '0.5em',
    3: '1em',
  },
};
