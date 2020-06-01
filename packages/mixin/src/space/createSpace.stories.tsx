import * as React from 'react';
import styled from 'styled-components';
import {queries, createMatch, createMap, createProps} from '@substance/style';
import {square} from '@substance/test-utilities';
import {createPadding, createPaddingX, createGetSpace, defaultSpaces} from '.';

export default {title: 'mixin/spacing'};

const map = createMap(createMatch(queries));

const getSpace = createGetSpace(defaultSpaces);
const padding = createPadding({map, getSpace});
const paddingX = createPaddingX({map, getSpace});

const paddingProps = createProps({
  padding,
  paddingX,
});

const Square = styled.div`
  ${square} ${paddingProps}
`;

export const Padding = () => (
  <Square padding={{mobile: 2, tablet: 3, desktop: 4}} />
);
export const PaddingX = () => (
  <Square paddingX={{mobile: 2, tablet: 3, desktop: 4}} />
);
