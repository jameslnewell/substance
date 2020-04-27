import {
  MediaNameConstraint,
  DefaultTheme,
  MapFunction,
  StyleProperty,
} from '../../types';
import {createMixin} from '../../createMixin';
import {get} from '../../get';

export type ColorNameConstraint = string;
export type ColorName = '';
export type ColorMap = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [name: string]: any;
};

export interface GetColorMapFunction<Theme = DefaultTheme> {
  (theme: Theme | undefined): ColorMap;
}

const createColorFactory = (properties: StyleProperty[]) => <
  MediaName extends MediaNameConstraint,
  ColorName extends ColorNameConstraint,
  Props,
  Theme = DefaultTheme
>({
  map,
  color: colorsMapOrGetColorMap,
}: {
  map: MapFunction<MediaName, Props, Theme>;
  color: ColorMap | GetColorMapFunction<Theme>;
}) => {
  return createMixin<MediaName, ColorName, Props, Theme>({
    map,
    properties,
    transform: (color, {theme}) => {
      if (typeof colorsMapOrGetColorMap === 'function') {
        return get<string>(color, colorsMapOrGetColorMap(theme));
      } else {
        return get<string>(color, colorsMapOrGetColorMap);
      }
    },
  });
};

export const createColor = createColorFactory(['color']);
export const createBackgroundColor = createColorFactory(['backgroundColor']);
export const createBorderColor = createColorFactory(['borderColor']);
