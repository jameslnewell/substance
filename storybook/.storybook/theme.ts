import {DefaultTheme} from '@substance/style';
import {defaultSpaces} from '@substance/mixin';

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
