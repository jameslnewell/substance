import styled from 'styled-components';
import {createProps} from '@substance/style';
import {
  display,
  alignItems,
  justifyContent,
  width,
  height,
  minWidth,
  minHeight,
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
  color,
  backgroundColor,
  borderColor,
} from '@substance/mixin';

const props = createProps({
  display,
  alignItems,
  justifyContent,
  width,
  height,
  minWidth,
  minHeight,
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
export const Box = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ['className', 'key', 'ref', 'children'].includes(prop),
})`
  ${props}
`;
