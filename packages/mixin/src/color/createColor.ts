import {
  MediaConstraint,
  DefaultTheme,
  MapFunction,
  StyleProperty,
  ThemeConstraint,
  createMixin,
  DefaultProps,
  PropsConstraint,
} from '@substance/style';
import {ColorConstraint} from './types';
import {GetColorFunction} from './createGetColor';

const createColorFactory = (properties: StyleProperty[]) => {
  return <
    Media extends MediaConstraint,
    Color extends ColorConstraint,
    Theme extends ThemeConstraint = DefaultTheme,
    Props extends PropsConstraint = DefaultProps
  >({
    map,
    getColor,
  }: {
    map: MapFunction<Media, Theme>;
    getColor: GetColorFunction<Color, Theme, Props>;
  }) => {
    return createMixin<Media, Color, Theme, Props>({
      map: map,
      properties,
      transform: getColor,
    });
  };
};

export const createColor = createColorFactory(['color']);
export const createBackgroundColor = createColorFactory(['backgroundColor']);
export const createBorderColor = createColorFactory(['borderColor']);
export const createFill = createColorFactory(['fill']);
