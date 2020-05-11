import {map, DefaultTheme} from '@substance/style';
import {
  createColor,
  createBackgroundColor,
  createBorderColor,
  createFill,
} from './createColor';
import {GetColorsFunction, createGetColor} from './createGetColor';

const getColors: GetColorsFunction<DefaultTheme> = (theme) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const color = (theme as any)?.color;
  if (color) {
    return color;
  }
  return {};
};

const getColor = createGetColor(getColors);

export const color = createColor({map, getColor});
export const backgroundColor = createBackgroundColor({
  map,
  getColor,
});
export const borderColor = createBorderColor({map, getColor});
export const fill = createFill({map, getColor});
