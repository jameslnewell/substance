import {DefaultTheme} from 'styled-components';
import {createStyle, StyleProperty} from '@substance/core';
import {BreakpointNameConstraint, MapFunction} from '@substance/breakpoints';
import {SpacingNameConstraint, SpacingMap, SpacingFunction} from './types';

export interface GetSpacingMapFunction<SpacingName extends SpacingNameConstraint, Theme = DefaultTheme> {
  (theme: Theme | undefined): SpacingMap<SpacingName>;
}

const createSpacingFactory = (properties: StyleProperty[]) => {
  return <Breakpoint extends BreakpointNameConstraint, SpacingName extends SpacingNameConstraint, Theme = DefaultTheme>(
    map: MapFunction<Breakpoint, Theme>, 
    spacingMapOrGetSpacingMap: SpacingMap<SpacingName> | GetSpacingMapFunction<SpacingName, Theme>
  ): SpacingFunction<Breakpoint, SpacingName> => {
    if (typeof spacingMapOrGetSpacingMap === 'function') {
      return (value) => map(value, createStyle<SpacingName, Theme>(properties, value => ({theme}) => spacingMapOrGetSpacingMap(theme)[value])); 
    } else {
      return (value) => map(value, createStyle<SpacingName, Theme>(properties, value => spacingMapOrGetSpacingMap[value]));
    }
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
