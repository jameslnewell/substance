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
  const colors = (theme as any)?.colors;
  if (colors) {
    return colors;
  }
  return {};
};

export const color = createColor({map, colors: getColorMap});
export const backgroundColor = createBackgroundColor({
  map,
  colors: getColorMap,
});
export const borderColor = createBorderColor({map, colors: getColorMap});
