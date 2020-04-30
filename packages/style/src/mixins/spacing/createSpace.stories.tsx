import * as React from 'react';
import styled from 'styled-components';
import {defaultMediaQueries, createMatch, createMap, createProps} from '../..';
import {square} from '../../story-styles';
import {createPadding, createPaddingX, createGetSpace} from './createSpace';
import {defaultSpaces} from './defaultSpaces';

export default {title: 'style/spacing'};

const map = createMap({
  match: createMatch({mediaQueries: defaultMediaQueries}),
});

const getSpace = createGetSpace(defaultSpaces);
const padding = createPadding({map, getSpace});
const paddingX = createPaddingX({map, getSpace});

const paddingProps = createProps({
  padding,
  paddingX,
});

const Square = styled.div(square, paddingProps);

export const Padding = () => (
  <Square padding={{mobile: 2, tablet: 3, desktop: 4}} />
);
export const PaddingX = () => (
  <Square paddingX={{mobile: 2, tablet: 3, desktop: 4}} />
);
