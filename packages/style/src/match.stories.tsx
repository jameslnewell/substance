import * as React from 'react';
import styled from 'styled-components';
import {match} from './match';
import {colors, square} from './__stories__';

export default {title: 'style/match()'};

const SquareUsingTaggedTemplateLiteral = styled.div`
  ${square}
  ${match('sm')`
    background-color: ${colors[0]};
  `}
  ${match('md')`
    background-color: ${colors[1]};
  `}
  ${match('lg')`
    background-color: ${colors[2]};
  `}
`;

const SquareUsingCSSObject = styled.div(
  square,
  match('sm')({
    backgroundColor: colors[0],
  }),
  match('md')({
    backgroundColor: colors[1],
  }),
  match('lg')({
    backgroundColor: colors[2],
  }),
);

const SquareUsingMixed = styled.div`
  ${square}
  ${match('sm')({
    backgroundColor: colors[0],
  })}
  ${match('md')`
    background-color: ${colors[1]};
  `}
  ${match('lg')({
    backgroundColor: colors[2],
  })}
`;

export const UsingTaggedTemplateLiteral = () => (
  <SquareUsingTaggedTemplateLiteral />
);
export const UsingCSSObject = () => <SquareUsingCSSObject />;
export const UsingMixed = () => <SquareUsingMixed />;
