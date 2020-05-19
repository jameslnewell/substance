import 'jest-styled-components';
import React from 'react';
import styled, {css} from 'styled-components';
import {render} from '@testing-library/react';
import {createVariant} from './createVariant';

describe('createVariant()', () => {
  const variant = createVariant({
    1: css`
      color: red;
    `,
    2: {
      color: 'green',
    },
  });

  test('correct style is applied when variant is 1', () => {
    const Component = styled.div`
      ${variant(1)}
    `;
    const {container} = render(<Component />);
    expect(container.firstChild).toHaveStyleRule('color', 'red');
  });

  test('correct style is applied when variant is 2', () => {
    const Component = styled.div`
      ${variant(2)}
    `;
    const {container} = render(<Component />);
    expect(container.firstChild).toHaveStyleRule('color', 'green');
  });
});
