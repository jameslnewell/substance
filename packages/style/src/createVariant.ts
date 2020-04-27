import {DefaultTheme, Style} from './types';
import {combine} from './combine';
// variant('variant', variants)

export const createVariant = <
  Variant extends string | number,
  Props,
  Theme = DefaultTheme
>(
  variants: {
    [variant in Variant]: Style<Props, Theme> | Array<Style<Props, Theme>>;
  },
) => {
  return (variant: Variant): Style<Props, Theme> => {
    const styles = variants[variant];

    if (Array.isArray(styles)) {
      return combine(...styles);
    }

    if (typeof styles === 'function' || typeof styles === 'object') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return styles as any; // FIXME: https://github.com/Microsoft/TypeScript/issues/23542
    }

    return {};
  };
};
