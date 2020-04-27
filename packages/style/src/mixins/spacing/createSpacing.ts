import {
  MediaNameConstraint,
  MapFunction,
  StyleProperty,
  DefaultTheme,
} from '../../types';
import {createMixin} from '../../createMixin';
import {SpacingMap, SpacingNameConstraint, SpacingFunction} from './types';

export interface GetSpacingMapFunction<
  SpacingName extends SpacingNameConstraint,
  Theme = DefaultTheme
> {
  (theme: Theme | undefined): SpacingMap<SpacingName>;
}

const createSpaceFactory = (properties: StyleProperty[]) => {
  return <
    MediaName extends MediaNameConstraint,
    SpacingName extends SpacingNameConstraint,
    Props,
    Theme = DefaultTheme
  >({
    map,
    space: spacingMapOrGetSpacingMap,
  }: {
    map: MapFunction<MediaName, Props, Theme>;
    space: SpacingMap<SpacingName> | GetSpacingMapFunction<SpacingName, Theme>;
  }): SpacingFunction<MediaName, SpacingName, Props, Theme> => {
    return createMixin<MediaName, SpacingName, Props, Theme>({
      map,
      properties,
      transform: (value, {theme}) => {
        if (typeof spacingMapOrGetSpacingMap === 'function') {
          return spacingMapOrGetSpacingMap(theme)[value];
        } else {
          return spacingMapOrGetSpacingMap[value];
        }
      },
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
