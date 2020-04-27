import {Style, DefaultTheme, StyleFunction, StyleObject} from './types';

interface PropsConstraint {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;
}

export const combine = <Props extends PropsConstraint, Theme = DefaultTheme>(
  ...styles: Style<Props, Theme>[]
): StyleFunction<Props, Theme> => {
  return (props) => {
    return styles.reduce<StyleObject>((s, style) => {
      return {
        ...s,
        ...(typeof style !== 'function' ? style : style(props)),
      };
    }, {});
  };
};
