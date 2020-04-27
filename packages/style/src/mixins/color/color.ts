import {map} from '../../map';
import {DefaultTheme} from '../../types';
import {
  createColor,
  createBackgroundColor,
  createBorderColor,
  GetColorMapFunction,
} from './createColor';

const getColorMap: GetColorMapFunction<DefaultTheme> = (theme) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const color = (theme as any)?.color;
  if (color) {
    return color;
  }
  return {};
};

export const color = createColor({map, color: getColorMap});
export const backgroundColor = createBackgroundColor({
  map,
  color: getColorMap,
});
export const borderColor = createBorderColor({map, color: getColorMap});
