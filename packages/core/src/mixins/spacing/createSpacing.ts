import { BreakpointNameConstraint, MapFunction, StyleProperty } from '../../types';
import {createMixin} from '../../createMixin'
import { SpacingMap, SpacingNameConstraint, SpacingFunction } from './types';

export interface GetSpacingMapFunction<SpacingName extends SpacingNameConstraint, Theme> {
  (theme: Theme | undefined): SpacingMap<SpacingName>;
}

const createSpacingFactory = (properties: StyleProperty[]) => {
  return <Breakpoint extends BreakpointNameConstraint, SpacingName extends SpacingNameConstraint, Theme>({
    map,
    spacings: spacingMapOrGetSpacingMap
  }: {
    map: MapFunction<Breakpoint, Theme>, 
    spacings: SpacingMap<SpacingName> | GetSpacingMapFunction<SpacingName, Theme>
  }): SpacingFunction<Breakpoint, SpacingName, Theme> => {
    return createMixin<Breakpoint, SpacingName, Theme>({
      map, 
      properties, 
      transform: (value, {theme}) => {
        if (typeof spacingMapOrGetSpacingMap === 'function') {
          return spacingMapOrGetSpacingMap(theme)[value]
        } else {
          return spacingMapOrGetSpacingMap[value];
        }
      }
    });
  };
}

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
  'marginBottom'
]);

export const createMarginTop = createSpacingFactory([
  'marginTop',
]);

export const createMarginRight = createSpacingFactory([
  'marginRight',
]);

export const createMarginBottom = createSpacingFactory([
  'marginBottom',
]);

export const createMarginLeft = createSpacingFactory([
  'marginLeft', 
]);

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
  'paddingBottom'
]);

export const createPaddingTop = createSpacingFactory([
  'paddingTop',
]);

export const createPaddingRight = createSpacingFactory([
  'paddingRight',
]);

export const createPaddingBottom = createSpacingFactory([
  'paddingBottom',
]);

export const createPaddingLeft = createSpacingFactory([
  'paddingLeft', 
]);
