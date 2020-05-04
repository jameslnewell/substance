import {
  DefaultTheme,
  ThemeConstraint,
  PropsConstraint,
  DefaultProps,
  PropsWithTheme,
  StyleValue,
  get,
} from '@substance/style';
import {ColorConstraint, Colors} from './types';

export interface GetColorsFunction<
  Theme extends ThemeConstraint = DefaultTheme
> {
  (theme: Theme | undefined): Colors;
}

export interface GetColorFunction<
  Color extends ColorConstraint,
  Theme extends ThemeConstraint = DefaultTheme
> {
  <Props extends PropsConstraint = DefaultProps>(
    color: Color,
    props: PropsWithTheme<Props, Theme>,
  ): StyleValue<'color'>;
}

export const createGetColor = <
  Color extends ColorConstraint,
  Theme extends ThemeConstraint = DefaultTheme
>(
  colorsOrGetColors: Colors | GetColorsFunction<Theme>,
): GetColorFunction<Color, Theme> => {
  if (typeof colorsOrGetColors === 'function') {
    return (value, {theme}) => get(value, colorsOrGetColors(theme)) || value;
  } else {
    return (value) => get(value, colorsOrGetColors) || value;
  }
};
