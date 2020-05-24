import * as React from 'react';
import styled from 'styled-components';
import {map} from './map';
import {
  exampleColors,
  square,
  withExampleThemeProvider,
  exampleQueries,
  ExampleMedia,
} from '../../../storybook/src/__fixtures__';

export default {title: 'style/map()'};

const SquareWithColorVariable = styled.div`
  ${square}
  ${map(
    Object.keys(exampleQueries).reduce(
      (values, media, index) => ({
        ...values,
        [media as ExampleMedia]: exampleColors[index],
      }),
      {},
    ),
    (value) => `background-color: ${value};`,
  )}
`;

export const StyledWithColorVariable = withExampleThemeProvider(() => (
  <SquareWithColorVariable />
));
