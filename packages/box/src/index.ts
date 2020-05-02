import {Properties} from 'csstype';
import styled from 'styled-components';
import {
  createProps,
  createMixin,
  map,
  DefaultThemeMediaName,
} from '@substance/style';
import {
  margin,
  marginX,
  marginY,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  padding,
  paddingX,
  paddingY,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  color,
  backgroundColor,
  borderColor,
} from '@substance/style/mixins';

const borderRadius = createMixin<
  DefaultThemeMediaName,
  Required<Properties<string | number>>['borderRadius']
>({
  map,
  properties: ['borderRadius'],
  transform: (value) => value,
});

const width = createMixin<
  DefaultThemeMediaName,
  Required<Properties<string | number>>['width']
>({
  map,
  properties: ['width'],
  transform: (value) => value,
});

const height = createMixin<
  DefaultThemeMediaName,
  Required<Properties<string | number>>['height']
>({
  map,
  properties: ['height'],
  transform: (value) => value,
});

const props = createProps({
  width,
  height,
  color,
  backgroundColor,
  borderColor,
  borderRadius,
  margin,
  marginX,
  marginY,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  padding,
  paddingX,
  paddingY,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
});

/* This implementation is for the storybook - if we make a generic one (which I think users should do) it needs a create function */
export const Box = styled.div({}, props);
