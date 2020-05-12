import 'jest-styled-components';
import React from 'react';
import styled from 'styled-components';
import {render} from '@testing-library/react';
import {keysOf} from '@substance/test-utilities';
import {MediaQueries, MapFunction, MediaConstraint} from './types';
import {queries} from './queries';
import {createMatch} from './createMatch';
import {colors} from './__stories__';
import {
  UsingCSSObject,
  UsingTaggedTemplateLiteral,
} from './createMatch.stories';
import {createMap} from './createMap';

function applyStyleForEachMedia<Media extends MediaConstraint>(
  queries: MediaQueries<Media>,
  map: MapFunction<Media>,
) {
  return map(
    keysOf<MediaQueries<Media>>(queries).reduce<{[m in Media]: number}>(
      (v, media, index) => ({...v, [media]: index}),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {} as any,
    ),
    (color) => ({backgroundColor: colors[color]}),
  );
}

function expectStyleForEachMedia<Media extends MediaConstraint>(
  queries: MediaQueries<Media>,
  element: ChildNode | null,
) {
  const keys = keysOf(queries);
  expect.assertions(keys.length * 2); // FIXME: bit confused by this!
  keys.forEach((media, index) => {
    expect(element).toHaveStyleRule('background-color', colors[index], {
      media: queries[media],
    });
  });
}

describe('createMap()', () => {
  test('style is applied when media query is matched and style is a tagged template literal', () => {
    const {container} = render(<UsingTaggedTemplateLiteral />);
    expectStyleForEachMedia(queries, container.firstChild);
  });

  test('style is applied when media query is matched and style is an object', () => {
    const {container} = render(<UsingCSSObject />);
    expectStyleForEachMedia(queries, container.firstChild);
  });

  test('style is applied when media query is matched and style is mixed', () => {
    const {container} = render(<UsingTaggedTemplateLiteral />);
    expectStyleForEachMedia(queries, container.firstChild);
  });

  describe('when using a queries object', () => {
    const map = createMap(createMatch(queries));
    const Component = styled.div({}, applyStyleForEachMedia(queries, map));

    test('style is applied when media query is matched', () => {
      const {container} = render(<Component />);
      expectStyleForEachMedia(queries, container.firstChild);
    });
  });

  describe('when using a queries function', () => {
    const map = createMap(createMatch(() => queries));
    const Component = styled.div({}, applyStyleForEachMedia(queries, map));

    test('style is applied when media query is matched', () => {
      const {container} = render(<Component />);
      expectStyleForEachMedia(queries, container.firstChild);
    });
  });
});
