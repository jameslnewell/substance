import 'jest-styled-components';
import React from 'react';
import {render} from '@testing-library/react';
import {StyledWithColorVariable} from './match.stories';
import {
  exampleQueries,
  exampleColors,
  ExampleMedia,
} from '@substance/test-utilities';

describe('match()', () => {
  Object.keys(exampleQueries).forEach((media, index) => {
    test(`applies style when ${media} query is matched`, () => {
      const {container} = render(<StyledWithColorVariable />);
      expect(container.firstChild).toHaveStyleRule(
        'background-color',
        exampleColors[index],
        {
          media: exampleQueries[media as ExampleMedia],
        },
      );
    });
  });
});
