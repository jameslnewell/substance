import {
  MediaConstraint,
  DefaultTheme,
  MapFunction,
  StyleProperty,
  ThemeConstraint,
  createMixin,
} from '@substance/style';
import {ColorConstraint} from './types';
import {GetColorFunction} from './createGetColor';

const createColorFactory = (properties: StyleProperty[]) => {
  return <
    Media extends MediaConstraint,
    Color extends ColorConstraint,
    Theme extends ThemeConstraint = DefaultTheme
  >({
    map,
    getColor,
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
export const createFill = createColorFactory(['fill']);
