import {
  MediaConstraint,
  MapFunction,
  StyleProperty,
  DefaultTheme,
  ThemeConstraint,
  createMixin,
} from '@substance/style';
import {SpaceConstraint} from './types';
import {GetSpaceFunction} from './createGetSpace';

const createSpaceFactory = (properties: StyleProperty[]) => {
  return <
    Media extends MediaConstraint,
    Space extends SpaceConstraint,
    Theme extends ThemeConstraint = DefaultTheme
  >({
    map,
    getSpace,
  }: {
    map: MapFunction<Media, Theme>;
    getSpace: GetSpaceFunction<Space, Theme>;
  }) => {
    return createMixin<Media, Space, Theme>({
      map: map,
      properties,
      transform: getSpace,
    });
  };
};

export const createMargin = createSpaceFactory([
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
]);

export const createMarginX = createSpaceFactory(['marginRight', 'marginLeft']);

export const createMarginY = createSpaceFactory(['marginTop', 'marginBottom']);

export const createMarginTop = createSpaceFactory(['marginTop']);

export const createMarginRight = createSpaceFactory(['marginRight']);

export const createMarginBottom = createSpaceFactory(['marginBottom']);

export const createMarginLeft = createSpaceFactory(['marginLeft']);

export const createPadding = createSpaceFactory([
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
]);

export const createPaddingX = createSpaceFactory([
  'paddingRight',
  'paddingLeft',
]);

export const createPaddingY = createSpaceFactory([
  'paddingTop',
  'paddingBottom',
]);

export const createPaddingTop = createSpaceFactory(['paddingTop']);

export const createPaddingRight = createSpaceFactory(['paddingRight']);

export const createPaddingBottom = createSpaceFactory(['paddingBottom']);

export const createPaddingLeft = createSpaceFactory(['paddingLeft']);
