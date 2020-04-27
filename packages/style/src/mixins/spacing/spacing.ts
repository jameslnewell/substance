import {DefaultTheme} from 'styled-components';
import {map} from '../../map';
import {SpacingMap} from './types';
import {defaultSpacings, DefaultSpacingName} from './defaultSpacings';
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
  spacings: SpacingMap<infer SpacingName>;
}
  ? SpacingName
  : DefaultSpacingName;

const getSpacingMap: GetSpacingMapFunction<
  DefaultThemeSpacingName,
  DefaultTheme
> = (theme) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const spacings = (theme as any)?.spacings;
  if (spacings) {
    return spacings;
  }
  return defaultSpacings;
};

export const margin = createMargin({map, spacings: getSpacingMap});
export const marginX = createMarginX({map, spacings: getSpacingMap});
export const marginY = createMarginY({map, spacings: getSpacingMap});
export const marginTop = createMarginTop({map, spacings: getSpacingMap});
export const marginRight = createMarginRight({map, spacings: getSpacingMap});
export const marginBottom = createMarginBottom({map, spacings: getSpacingMap});
export const marginLeft = createMarginLeft({map, spacings: getSpacingMap});

export const padding = createPadding({map, spacings: getSpacingMap});
export const paddingX = createPaddingX({map, spacings: getSpacingMap});
export const paddingY = createPaddingY({map, spacings: getSpacingMap});
export const paddingTop = createPaddingTop({map, spacings: getSpacingMap});
export const paddingRight = createPaddingRight({map, spacings: getSpacingMap});
export const paddingBottom = createPaddingBottom({
  map,
  spacings: getSpacingMap,
});
export const paddingLeft = createPaddingLeft({map, spacings: getSpacingMap});
