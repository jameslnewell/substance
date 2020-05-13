import 'jest-styled-components';
import React from 'react';
import styled from 'styled-components';
import {render} from '@testing-library/react';
import {StyleValue} from './types';
import {queries} from './queries';
import {createMatch} from './createMatch';
import {createMap} from './createMap';
import {createMixin} from './createMixin';

describe('createMixin()', () => {
  const map = createMap(createMatch(queries));
  const mixin = createMixin({
    map,
    properties: ['color'],
    transform: (c: StyleValue) => c,
  });

  test('style is applied universally', () => {
    const Component = styled.div({}, mixin('red'));
    const {container} = render(<Component />);
    expect(container.firstChild).toHaveStyleRule('color', 'red');
  });

  test('style is applied at selected queries', () => {
    const Component = styled.div({}, mixin({mobile: 'red', desktop: 'green'}));
    const {container} = render(<Component />);
    expect(container.firstChild).toHaveStyleRule('color', 'red', {
      media: queries['mobile'],
    });
    expect(container.firstChild).toHaveStyleRule('color', 'green', {
      media: queries['desktop'],
    });
  });
});
