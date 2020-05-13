import * as React from 'react';
import styled from 'styled-components';
import {queries, DefaultMedia} from './queries';
import {createMatch} from './createMatch';
import {colors, square} from './__stories__';
import {MatchFunction} from './types';

export default {title: 'style/createMatch()'};

const match: MatchFunction<DefaultMedia> = createMatch(queries);

const SquareUsingTaggedTemplateLiteral = styled.div`
  ${square}
  ${match('mobile')`
    background-color: ${colors[0]};
  `}
  ${match('tablet')`
    background-color: ${colors[1]};
  `}
  ${match('desktop')`
    background-color: ${colors[2]};
  `}
`;

const SquareUsingCSSObject = styled.div(
  square,
  match('mobile')({
    backgroundColor: colors[0],
  }),
  match('tablet')({
    backgroundColor: colors[1],
  }),
  match('desktop')({
    backgroundColor: colors[2],
  }),
);

const SquareUsingMixed = styled.div`
  ${square}
  ${match('mobile')({
    backgroundColor: colors[0],
  })}
  ${match('tablet')`
    background-color: ${colors[1]};
  `}
  ${match('desktop')({
    backgroundColor: colors[2],
  })}
`;

export const UsingTaggedTemplateLiteral = () => (
  <SquareUsingTaggedTemplateLiteral />
);
export const UsingCSSObject = () => <SquareUsingCSSObject />;
export const UsingMixed = () => <SquareUsingMixed />;
