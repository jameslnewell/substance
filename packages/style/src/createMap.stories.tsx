import * as React from 'react';
import styled from 'styled-components';
import {MatchFunction, MapFunction} from './types';
import {queries, DefaultMedia} from './queries';
import {createMatch} from './createMatch';
import {createMap} from './createMap';
import {square} from '../../../storybook/src/__fixtures__';

export default {title: 'style/createMap()'};

const match: MatchFunction<DefaultMedia> = createMatch(queries);
const map: MapFunction<DefaultMedia> = createMap(match);

const values = {
  mobile: 'red',
  tablet: 'green',
  desktop: 'blue',
};

const SquareUsingTaggedTemplateLiteralStyle = styled.div`
  ${square}
  ${map(values, (value) => `background-color: ${value};`)}
`;

const SquareUsingFunctionStyle = styled.div`
  ${square}
  ${map(values, (value) => () => `background-color: ${value};`)}
`;

const SquareUsingObjectStyle = styled.div(
  square,
  map(values, (value) => ({backgroundColor: value})),
);

const SquareUsingMixedStyle = styled.div`
  ${square}
  ${map(values, (value) => ({backgroundColor: value}))}
`;

export const StyleWithTaggedTemplateLiteral = () => (
  <SquareUsingTaggedTemplateLiteralStyle />
);

export const StyledWithFunction = () => <SquareUsingFunctionStyle />;
export const StyledWithObject = () => <SquareUsingObjectStyle />;
export const StyledWithMixed = () => <SquareUsingMixedStyle />;
