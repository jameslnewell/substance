import {DefaultTheme, Style} from './types';

export const createVariant = <
  Variant extends string | number,
  Props,
  Theme = DefaultTheme
>(
  variants: {
    [variant in Variant]: Style<Props, Theme>;
  },
) => {
  return (variant: Variant): Style<Props, Theme> => {
    // TODO: make it responsive
    const styles = variants[variant];
    if (process.env.NODE_ENV !== 'production') {
      if (!Object.prototype.hasOwnProperty.call(variants, variant)) {
        console.warn(`Variant "${variant}" was not found.`);
      }
    }
    return styles || undefined;
  };
};
