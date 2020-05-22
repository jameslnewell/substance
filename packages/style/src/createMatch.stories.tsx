import * as React from 'react';
import styled, {css} from 'styled-components';
import {MatchFunction} from './types';
import {queries, DefaultMedia} from './queries';
import {createMatch} from './createMatch';
import {exampleColors, square} from '../../../storybook/src/__fixtures__';

export default {title: 'style/createMatch()'};

const match: MatchFunction<DefaultMedia> = createMatch(queries);

const SquareUsingTaggedTemplateLiteralStyle = styled.div`
  ${square}
  ${match('mobile')`
    background-color: ${exampleColors[0]};
  `}
  ${match('tablet')`
    background-color: ${exampleColors[1]};
  `}
  ${match('desktop')`
    background-color: ${exampleColors[2]};
  `}
`;

const SquareUsingFunctionStyle = styled.div`
  ${square}
  ${match('mobile')(
    () => css`
      background-color: ${exampleColors[0]};
    `,
  )}
  ${match('tablet')(
    () => css`
      background-color: ${exampleColors[1]};
    `,
  )}
  ${match('desktop')(
    () => css`
      background-color: ${exampleColors[2]};
    `,
  )}
`;

const SquareUsingObjectStyle = styled.div(
  square,
  match('mobile')({
    backgroundColor: exampleColors[0],
  }),
  match('tablet')({
    backgroundColor: exampleColors[1],
  }),
  match('desktop')({
    backgroundColor: exampleColors[2],
  }),
);

const SquareUsingMixedStyle = styled.div`
  ${square}
  ${match('mobile')({
    backgroundColor: exampleColors[0],
  })}
  ${match('tablet')`
    background-color: ${exampleColors[1]};
  `}
  ${match('desktop')({
    backgroundColor: exampleColors[2],
  })}
`;

export const StyleWithTaggedTemplateLiteral = () => (
  <SquareUsingTaggedTemplateLiteralStyle />
);

export const StyledWithFunction = () => <SquareUsingFunctionStyle />;
export const StyledWithObject = () => <SquareUsingObjectStyle />;
export const StyledWithMixed = () => <SquareUsingMixedStyle />;
