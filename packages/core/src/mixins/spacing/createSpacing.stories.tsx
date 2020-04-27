import * as React from 'react';
import styled from 'styled-components';
import { defaultBreakpoints, createBreakpoint, createMap, createProps } from '../..';
import {square} from '../../story-styles';
import {defaultSpacings} from './defaultSpacings';
import { createPadding, createPaddingX } from './createSpacing';

export default { title: 'spacing' };

const map = createMap(createBreakpoint({breakpoints: defaultBreakpoints}));
const padding = createPadding({map, spacings: defaultSpacings});
const paddingX = createPaddingX({map, spacings: defaultSpacings});

const paddingProps = createProps({
  padding,
  paddingX
});

type PaddingProps = Parameters<typeof paddingProps>[0];

const Square = styled.div<PaddingProps>(
  square,
  paddingProps
);

export const Padding = () => <Square padding={{mobile: 'xs', tablet: 'md', desktop: 'lg'}}/>
export const PaddingX = () => <Square paddingX={{mobile: 'xs', tablet: 'md', desktop: 'lg'}}/>
