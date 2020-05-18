import * as React from 'react';
import styled, {css} from 'styled-components';
import {MatchFunction} from './types';
import {queries, DefaultMedia} from './queries';
import {createMatch} from './createMatch';
import {colors, square} from './__stories__';

export default {title: 'style/createMatch()'};

const match: MatchFunction<DefaultMedia> = createMatch(queries);

const SquareUsingTaggedTemplateLiteralStyle = styled.div`
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

const SquareUsingFunctionStyle = styled.div`
  ${square}
  ${match('mobile')(
    () => css`
      background-color: ${colors[0]};
    `,
  )}
  ${match('tablet')(
    () => css`
      background-color: ${colors[1]};
    `,
  )}
  ${match('desktop')(
    () => css`
      background-color: ${colors[2]};
    `,
  )}
`;

const SquareUsingObjectStyle = styled.div(
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

const SquareUsingMixedStyle = styled.div`
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

export const StyleWithTaggedTemplateLiteral = () => (
  <SquareUsingTaggedTemplateLiteralStyle />
);

export const StyledWithFunction = () => <SquareUsingFunctionStyle />;
export const StyledWithObject = () => <SquareUsingObjectStyle />;
export const StyledWithMixed = () => <SquareUsingMixedStyle />;
