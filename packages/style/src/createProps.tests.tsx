import 'jest-styled-components';
import React from 'react';
import styled from 'styled-components';
import {render} from '@testing-library/react';
import {StyleValue} from './types';
import {createProps} from './createProps';

describe('createProps()', () => {
  const Component = styled.div`
    ${createProps({
      fg: (color: StyleValue<'color'>) => `color: ${color};`,
      bg: (color: StyleValue<'color'>) => `background-color: ${color};`,
      $size: [
        (size: StyleValue<'width'>) => `width: ${size};`,
        (size: StyleValue<'width'>) => `height: ${size};`,
      ],
    })}
  `;

  test('style is not applied when prop has not been set', () => {
    const {container} = render(<Component />);
    expect(container.firstChild).not.toHaveStyleRule('color');
    expect(container.firstChild).not.toHaveStyleRule('background-color');
    expect(container.firstChild).not.toHaveStyleRule('width');
    expect(container.firstChild).not.toHaveStyleRule('height');
  });

  test('style is not applied when prop is undefined', () => {
    const {container} = render(
      <Component fg={undefined} bg={undefined} $size={undefined} />,
    );
    expect(container.firstChild).not.toHaveStyleRule('color');
    expect(container.firstChild).not.toHaveStyleRule('background-color');
    expect(container.firstChild).not.toHaveStyleRule('width');
    expect(container.firstChild).not.toHaveStyleRule('height');
  });

  test('style is applied when prop is not undefined', () => {
    const {container} = render(<Component fg="green" bg="blue" $size="32px" />);
    expect(container.firstChild).toHaveStyleRule('color', 'green');
    expect(container.firstChild).toHaveStyleRule('background-color', 'blue');
    expect(container.firstChild).toHaveStyleRule('width', '32px');
    expect(container.firstChild).toHaveStyleRule('height', '32px');
  });

  test('partial style is applied when partial props are not undefined', () => {
    const {container} = render(<Component fg="green" $size="32px" />);
    expect(container.firstChild).toHaveStyleRule('color', 'green');
    expect(container.firstChild).not.toHaveStyleRule('background-color');
    expect(container.firstChild).toHaveStyleRule('width', '32px');
    expect(container.firstChild).toHaveStyleRule('height', '32px');
  });

  // TODO: test theme
});
