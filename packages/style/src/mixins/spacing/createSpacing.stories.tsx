import * as React from 'react';
import styled from 'styled-components';
import {
  defaultBreakpoints,
  createBreakpoint,
  createMap,
  createProps,
} from '../..';
import {square} from '../../story-styles';
import {defaultSpacings} from './defaultSpacings';
import {createPadding, createPaddingX} from './createSpacing';

export default {title: 'spacing'};

const map = createMap({
  breakpoint: createBreakpoint({breakpoints: defaultBreakpoints}),
});
const padding = createPadding({map, spacings: defaultSpacings});
const paddingX = createPaddingX({map, spacings: defaultSpacings});

const paddingProps = createProps({
  padding,
  paddingX,
});

const Square = styled.div(square, paddingProps);

export const Padding = () => (
  <Square padding={{mobile: 'xs', tablet: 'md', desktop: 'lg'}} />
);
export const PaddingX = () => (
  <Square paddingX={{mobile: 'xs', tablet: 'md', desktop: 'lg'}} />
);
