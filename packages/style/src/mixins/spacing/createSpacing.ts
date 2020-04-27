import {
  BreakpointNameConstraint,
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

const createSpacingFactory = (properties: StyleProperty[]) => {
  return <
    Breakpoint extends BreakpointNameConstraint,
    SpacingName extends SpacingNameConstraint,
    Props,
    Theme = DefaultTheme
  >({
    map,
    spacings: spacingMapOrGetSpacingMap,
  }: {
    map: MapFunction<Breakpoint, Props, Theme>;
    spacings:
      | SpacingMap<SpacingName>
      | GetSpacingMapFunction<SpacingName, Theme>;
  }): SpacingFunction<Breakpoint, SpacingName, Props, Theme> => {
    return createMixin<Breakpoint, SpacingName, Props, Theme>({
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

export const createMargin = createSpacingFactory([
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
]);

export const createMarginX = createSpacingFactory([
  'marginRight',
  'marginLeft',
]);

export const createMarginY = createSpacingFactory([
  'marginTop',
  'marginBottom',
]);

export const createMarginTop = createSpacingFactory(['marginTop']);

export const createMarginRight = createSpacingFactory(['marginRight']);

export const createMarginBottom = createSpacingFactory(['marginBottom']);

export const createMarginLeft = createSpacingFactory(['marginLeft']);

export const createPadding = createSpacingFactory([
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
]);

export const createPaddingX = createSpacingFactory([
  'paddingRight',
  'paddingLeft',
]);

export const createPaddingY = createSpacingFactory([
  'paddingTop',
  'paddingBottom',
]);

export const createPaddingTop = createSpacingFactory(['paddingTop']);

export const createPaddingRight = createSpacingFactory(['paddingRight']);

export const createPaddingBottom = createSpacingFactory(['paddingBottom']);

export const createPaddingLeft = createSpacingFactory(['paddingLeft']);
