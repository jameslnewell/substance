import {Properties} from 'csstype';
import styled from 'styled-components';
import {createProps, createMixin, map} from '@substance/style';
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

type BorderRadius = Required<Properties<string | number>>['borderRadius'];

const borderRadius = createMixin({
  map,
  properties: ['borderRadius'],
  transform: (value: BorderRadius) => value,
});

const props = createProps({
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
