import {Style, DefaultTheme, StyleFunction} from './types';
import {combine} from './combine';

interface PropsConstraint {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;
}

export const pseudo = <Props extends PropsConstraint, Theme = DefaultTheme>(
  pseudo: string,
  ...styles: Style<Props, Theme>[]
): StyleFunction<Props, Theme> => {
  return (props) => {
    return {
      [pseudo]: combine(...styles)(props),
    };
  };
};
