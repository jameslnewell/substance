import {DefaultTheme} from 'styled-components';
import {map} from '../../map';
import {Spaces} from './types';
import {defaultSpaces, DefaultSpace} from './defaultSpaces';
import {
  GetSpacesFunction,
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
  createGetSpace,
} from './createSpace';

type DefaultThemeSpace = DefaultTheme extends {
  space: Spaces<infer Space>;
}
  ? Space
  : DefaultSpace;

const getSpaces: GetSpacesFunction<DefaultThemeSpace, DefaultTheme> = (
  theme,
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const space = (theme as any)?.space;
  if (space) {
    return space;
  }
  return defaultSpaces;
};

export const getSpace = createGetSpace(getSpaces);

export const margin = createMargin({map, getSpace});
export const marginX = createMarginX({map, getSpace});
export const marginY = createMarginY({map, getSpace});
export const marginTop = createMarginTop({map, getSpace});
export const marginRight = createMarginRight({map, getSpace});
export const marginBottom = createMarginBottom({map, getSpace});
export const marginLeft = createMarginLeft({map, getSpace});

export const padding = createPadding({map, getSpace});
export const paddingX = createPaddingX({map, getSpace});
export const paddingY = createPaddingY({map, getSpace});
export const paddingTop = createPaddingTop({map, getSpace});
export const paddingRight = createPaddingRight({map, getSpace});
export const paddingBottom = createPaddingBottom({
  map,
  getSpace,
});
export const paddingLeft = createPaddingLeft({map, getSpace});
