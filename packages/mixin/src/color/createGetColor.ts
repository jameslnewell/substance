import {Theme, StyleValue, get, ThemeProps} from '@substance/style';
import {ColorConstraint, Colors} from './types';

export interface GetColorsFunction {
  (theme: Theme | undefined): Colors;
}

export interface GetColorFunction<Color extends ColorConstraint> {
  (color: Color): StyleValue<'color'>;
}

export interface ThemedGetColorFunction<Color extends ColorConstraint, Props> {
  (color: Color): (props: Props) => StyleValue<'color'>;
}

export function createGetColor<Color extends ColorConstraint>(
  colors: Colors,
): GetColorFunction<Color>;
export function createGetColor<Color extends ColorConstraint, Props>(
  getColors: GetColorsFunction,
): ThemedGetColorFunction<Color, Props>;
export function createGetColor<
  Color extends ColorConstraint,
  Props extends ThemeProps
>(
  colorsOrGetColors: Colors | GetColorsFunction,
): GetColorFunction<Color> | ThemedGetColorFunction<Color, Props> {
  // TODO: warn about unknown colors
  if (typeof colorsOrGetColors === 'function') {
    return (value) => ({theme}): StyleValue<'color'> =>
      get(value, colorsOrGetColors(theme)) || value;
  } else {
    return (value): StyleValue<'color'> =>
      get(value, colorsOrGetColors) || value;
  }
}
