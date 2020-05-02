import {
  MediaConstraint,
  DefaultTheme,
  MapFunction,
  StyleProperty,
  ThemeConstraint,
  PropsConstraint,
  DefaultProps,
  PropsWithTheme,
  StyleValue,
} from '../../types';
import {createMixin} from '../../createMixin';
import {get} from '../../get';

export type ColorConstraint = string;
export type Color = '';
export type Colors = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [name: string]: any;
};

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
  ): StyleValue;
}

// TODO: pass through other values
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

const createColorFactory = (properties: StyleProperty[]) => {
  return <
    Media extends MediaConstraint,
    Color extends ColorConstraint,
    Theme extends ThemeConstraint = DefaultTheme
  >({
    map,
    getColor: getColor,
  }: {
    map: MapFunction<Media, Theme>;
    getColor: GetColorFunction<Color, Theme>;
  }) => {
    return createMixin<Media, Color, Theme>({
      map: map,
      properties,
      transform: getColor,
    });
  };
};

export const createColor = createColorFactory(['color']);
export const createBackgroundColor = createColorFactory(['backgroundColor']);
export const createBorderColor = createColorFactory(['borderColor']);
