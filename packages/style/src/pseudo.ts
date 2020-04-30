import {Style, DefaultTheme, StyleFunction, ThemeProps} from './types';
import {combine} from './combine';

interface PropsConstraint {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;
}

// FIXME:
export const pseudo = <Props extends PropsConstraint, Theme = DefaultTheme>(
  pseudo: string,
  ...styles: Style<Props, Theme>[]
): StyleFunction<Props, Theme> => {
  return (props: ThemeProps<Props, Theme>): Style<Props, Theme> => {
    const style = combine(...styles);
    if (style === undefined) {
      return style;
    }
    return {
      [pseudo]: typeof style === 'function' ? style(props) : style,
    };
  };
};
