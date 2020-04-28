import {Style, DefaultTheme, StyleFunction, StyleObject} from './types';

interface PropsConstraint {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;
}

export const combine = <Props extends PropsConstraint, Theme = DefaultTheme>(
  ...styles: Style<Props, Theme>[]
): StyleFunction<Props, Theme> => {
  return (props) => {
    const combined: StyleObject = {};
    for (const style of styles) {
      const styleObject = typeof style !== 'function' ? style : style(props);
      Object.keys(styleObject).forEach((prop) => {
        const currentValue = combined[prop];
        const nextValue = styleObject[prop];
        if (
          Object.prototype.hasOwnProperty.call(styleObject, prop) &&
          typeof currentValue === 'object' &&
          typeof nextValue === 'object'
        ) {
          combined[prop] = {...currentValue, ...styleObject};
        } else {
          combined[prop] = styleObject[prop];
        }
      });
    }
    return combined;
  };
};
