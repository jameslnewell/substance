import {DefaultTheme} from 'styled-components';
import {map} from '../../map';
import {SpacingMap} from './types';
import {defaultSpace, DefaultSpacingName} from './defaultSpacings';
import {
  GetSpacingMapFunction,
  createMargin,
  createMarginX,
  createMarginY,
  createMarginTop,
  createMarginRight,
  createMarginBottom,
  createMarginLeft,
  createPadding,
  createPaddingX,
  createPaddingY,
  createPaddingTop,
  createPaddingRight,
  createPaddingBottom,
  createPaddingLeft,
} from './createSpacing';

type DefaultThemeSpacingName = DefaultTheme extends {
  space: SpacingMap<infer SpacingName>;
}
  ? SpacingName
  : DefaultSpacingName;

const getSpacingMap: GetSpacingMapFunction<
  DefaultThemeSpacingName,
  DefaultTheme
> = (theme) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const space = (theme as any)?.space;
  if (space) {
    return space;
  }
  return defaultSpace;
};

export const margin = createMargin({map, space: getSpacingMap});
export const marginX = createMarginX({map, space: getSpacingMap});
export const marginY = createMarginY({map, space: getSpacingMap});
export const marginTop = createMarginTop({map, space: getSpacingMap});
export const marginRight = createMarginRight({map, space: getSpacingMap});
export const marginBottom = createMarginBottom({map, space: getSpacingMap});
export const marginLeft = createMarginLeft({map, space: getSpacingMap});

export const padding = createPadding({map, space: getSpacingMap});
export const paddingX = createPaddingX({map, space: getSpacingMap});
export const paddingY = createPaddingY({map, space: getSpacingMap});
export const paddingTop = createPaddingTop({map, space: getSpacingMap});
export const paddingRight = createPaddingRight({map, space: getSpacingMap});
export const paddingBottom = createPaddingBottom({
  map,
  space: getSpacingMap,
});
export const paddingLeft = createPaddingLeft({map, space: getSpacingMap});
