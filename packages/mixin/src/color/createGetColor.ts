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

export interface GetColorFunction<Color extends ColorConstraint> {
  (color: Color): StyleValue<'color'>;
}

export interface ThemedGetColorFunction<
  Color extends ColorConstraint,
  Theme extends ThemeConstraint = DefaultTheme,
  Props extends PropsConstraint = DefaultProps
> {
  (color: Color): (props: PropsWithTheme<Props, Theme>) => StyleValue<'color'>;
}

export function createGetColor<Color extends ColorConstraint>(
  colors: Colors,
): GetColorFunction<Color>;
export function createGetColor<
  Color extends ColorConstraint,
  Theme extends ThemeConstraint = DefaultTheme,
  Props extends PropsConstraint = DefaultProps
>(
  getColors: GetColorsFunction<Theme>,
): ThemedGetColorFunction<Color, Theme, Props>;
export function createGetColor<
  Color extends ColorConstraint,
  Theme extends ThemeConstraint = DefaultTheme,
  Props extends PropsConstraint = DefaultProps
>(
  colorsOrGetColors: Colors | GetColorsFunction<Theme>,
): GetColorFunction<Color> | ThemedGetColorFunction<Color, Theme, Props> {
  // TODO: warn about unknown colors
  if (typeof colorsOrGetColors === 'function') {
    return (value) => ({theme}): StyleValue<'color'> =>
      get(value, colorsOrGetColors(theme)) || value;
  } else {
    return (value): StyleValue<'color'> =>
      get(value, colorsOrGetColors) || value;
  }
}
