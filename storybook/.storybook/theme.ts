import {DefaultTheme} from '@substance/style';
import {DefaultSpace, Spaces, defaultSpaces} from '@substance/style/mixins';

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
