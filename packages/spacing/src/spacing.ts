import {DefaultTheme} from 'styled-components';
import {map} from '@substance/breakpoints';
import { SpacingMap } from './types';
import {defaults, DefaultSpacingName} from './defaults';
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

type DefaultThemeSpacingName = DefaultTheme extends {spacing: SpacingMap<infer SpacingName>} ? SpacingName : DefaultSpacingName;

const getSpacingMap: GetSpacingMapFunction<DefaultThemeSpacingName> = theme => theme && (theme as any).breakpoints ? (theme as any).breakpoints : defaults;

export const margin = createMargin(map, getSpacingMap);
export const marginX = createMarginX(map, getSpacingMap);
export const marginY = createMarginY(map, getSpacingMap);
export const marginTop = createMarginTop(map, getSpacingMap);
export const marginRight = createMarginRight(map, getSpacingMap);
export const marginBottom = createMarginBottom(map, getSpacingMap);
export const marginLeft = createMarginLeft(map, getSpacingMap);

export const padding = createPadding(map, getSpacingMap);
export const paddingX = createPaddingX(map, getSpacingMap);
export const paddingY = createPaddingY(map, getSpacingMap);
export const paddingTop = createPaddingTop(map, getSpacingMap);
export const paddingRight = createPaddingRight(map, getSpacingMap);
export const paddingBottom = createPaddingBottom(map, getSpacingMap);
export const paddingLeft = createPaddingLeft(map, getSpacingMap);
