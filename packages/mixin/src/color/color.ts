import {map} from '@substance/style';
import {
  createColor,
  createBackgroundColor,
  createBorderColor,
  createBorderTopColor,
  createBorderRightColor,
  createBorderBottomColor,
  createBorderLeftColor,
  createFill,
} from './createColor';
import {GetColorsFunction, createGetColor} from './createGetColor';

const getColors: GetColorsFunction = (theme) => {
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
export const borderTopColor = createBorderTopColor({map, getColor});
export const borderRightColor = createBorderRightColor({map, getColor});
export const borderBottomColor = createBorderBottomColor({map, getColor});
export const borderLeftColor = createBorderLeftColor({map, getColor});
export const fill = createFill({map, getColor});
