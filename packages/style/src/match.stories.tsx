import * as React from 'react';
import styled from 'styled-components';
import {match} from './match';
import {
  exampleColors,
  square,
  withExampleThemeProvider,
  exampleQueries,
  ExampleMedia,
} from '@substance/test-utilities';

export default {title: 'style/match()'};

const SquareWithColorVariable = styled.div`
  ${square}
  ${Object.keys(exampleQueries).map(
    (media, index) => match(media as ExampleMedia)`
    background-color: ${exampleColors[index]};
  `,
  )}
`;

export const StyledWithColorVariable = withExampleThemeProvider(() => (
  <SquareWithColorVariable />
));
