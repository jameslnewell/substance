import 'jest-styled-components';
import React from 'react';
import styled from 'styled-components';
import {render} from '@testing-library/react';
import {StyleValue} from './types';
import {createProps} from './createProps';

describe('createProps()', () => {
  const props = createProps({
    fg: (color: StyleValue<'color'>) => ({color}),
    bg: (color: StyleValue<'color'>) => ({backgroundColor: color}),
    size: (size: StyleValue<'width'>) => ({width: size, height: size}),
  });

  test('style is applied for specified mixins', () => {
    const Component = styled.div({}, props);
    const {container} = render(<Component bg="grey" size="100px" />);
    expect(container.firstChild).toHaveStyleRule('background-color', 'grey');
    expect(container.firstChild).toHaveStyleRule('width', '100px');
    expect(container.firstChild).toHaveStyleRule('height', '100px');
  });
});
