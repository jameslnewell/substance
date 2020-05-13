import {Theme, StyleValue, get, ThemeProps} from '@substance/style';
import {ColorConstraint, Colors} from './types';

export interface GetColorsFunction {
  (theme: Theme | undefined): Colors;
}

export interface GetColorFunction<Color extends ColorConstraint> {
  (color: Color): StyleValue<'color'>;
}

export interface ThemedGetColorFunction<Color extends ColorConstraint> {
  (color: Color): (props: ThemeProps) => StyleValue<'color'>;
}

export function createGetColor<Color extends ColorConstraint>(
  colors: Colors,
): GetColorFunction<Color>;
export function createGetColor<Color extends ColorConstraint, Props>(
  getColors: GetColorsFunction,
): ThemedGetColorFunction<Color>;
export function createGetColor<Color extends ColorConstraint>(
  colorsOrGetColors: Colors | GetColorsFunction,
): GetColorFunction<Color> | ThemedGetColorFunction<Color> {
  // TODO: warn about unknown colors
  if (typeof colorsOrGetColors === 'function') {
    return (value) => ({theme}) =>
      get(value, colorsOrGetColors(theme)) || value;
  } else {
    return (value): StyleValue<'color'> =>
      get(value, colorsOrGetColors) || value;
  }
}
