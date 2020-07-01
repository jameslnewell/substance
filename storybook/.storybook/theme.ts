import {defaultSpaces} from '@substance/mixin';
import {DefaultTheme} from 'styled-components';

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
  space: defaultSpaces,
};
