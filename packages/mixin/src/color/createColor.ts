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
export const createBackgroundColor = createColorFactory(['background-color']);
export const createBorderColor = createColorFactory(['border-color']);
export const createBorderTopColor = createColorFactory(['border-top-color']);
export const createBorderRightColor = createColorFactory([
  'border-right-color',
]);
export const createBorderBottomColor = createColorFactory([
  'border-bottom-color',
]);
export const createBorderLeftColor = createColorFactory(['border-left-color']);
export const createFill = createColorFactory(['fill']);
