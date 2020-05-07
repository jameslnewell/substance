import 'jest-styled-components';
import React from 'react';
import styled from 'styled-components';
import {render} from '@testing-library/react';
import {createVariant} from './createVariant';

describe('createVariant()', () => {
  const variant = createVariant({
    1: {
      color: 'red',
    },
    2: {
      color: 'green',
    },
  });

  test('style for a variant with a styled object is applied', () => {
    const Component = styled.div({}, variant(2));
    const {container} = render(<Component />);
    expect(container.firstChild).toHaveStyleRule('color', 'green');
  });
});
