import {
  MediaConstraint,
  MapFunction,
  StyleProperty,
  createMixin,
} from '@substance/style';
import {ColorConstraint} from './types';
import {GetColorFunction, ThemedGetColorFunction} from './createGetColor';

const createColorFactory = (properties: StyleProperty[]) => {
  return <Media extends MediaConstraint, Color extends ColorConstraint>({
    map,
    getColor,
  }: {
    map: MapFunction<Media>;
    getColor: GetColorFunction<Color> | ThemedGetColorFunction<Color>;
  }) => {
    return createMixin<Media, Color>({
      map: map,
      properties,
      transform: getColor,
    });
  };
};

export const createColor = createColorFactory(['color']);
export const createBackgroundColor = createColorFactory(['backgroundColor']);
export const createBorderColor = createColorFactory(['borderColor']);
export const createBorderTopColor = createColorFactory(['borderTopColor']);
export const createBorderRightColor = createColorFactory(['borderRightColor']);
export const createBorderBottomColor = createColorFactory([
  'borderBottomColor',
]);
export const createBorderLeftColor = createColorFactory(['borderLeftColor']);
export const createFill = createColorFactory(['fill']);
