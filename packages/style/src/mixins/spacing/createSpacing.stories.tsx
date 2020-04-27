import * as React from 'react';
import styled from 'styled-components';
import {defaultMedia, createMatch, createMap, createProps} from '../..';
import {square} from '../../story-styles';
import {defaultSpace} from './defaultSpacings';
import {createPadding, createPaddingX} from './createSpacing';

export default {title: 'spacing'};

const map = createMap({
  match: createMatch({media: defaultMedia}),
});
const padding = createPadding({map, space: defaultSpace});
const paddingX = createPaddingX({map, space: defaultSpace});

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
