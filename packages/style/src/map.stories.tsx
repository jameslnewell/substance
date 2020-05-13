import * as React from 'react';
import styled from 'styled-components';
import {map} from './map';
import {square} from './__stories__';

export default {title: 'style/map()'};

const values = {
  mobile: 'red',
  tablet: 'green',
  desktop: 'blue',
};

const SquareUsingTaggedTemplateLiteral = styled.div`
  ${square}
  ${map(values, (value) => `background-color: ${value};`)}
`;

const SquareUsingCSSObject = styled.div(
  square,
  map(values, (value) => ({backgroundColor: value})),
);

const SquareUsingMixed = styled.div`
  ${square}
  ${map(values, (value) => ({backgroundColor: value}))}
`;

export const UsingTaggedTemplateLiteral = () => (
  <SquareUsingTaggedTemplateLiteral />
);
export const UsingCSSObject = () => <SquareUsingCSSObject />;
export const UsingMixed = () => <SquareUsingMixed />;
