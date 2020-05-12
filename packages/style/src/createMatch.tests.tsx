import 'jest-styled-components';
import React from 'react';
import styled from 'styled-components';
import {render} from '@testing-library/react';
import {keysOf} from '@substance/test-utilities';
import {MediaQueries, MatchFunction, MediaConstraint} from './types';
import {queries} from './queries';
import {createMatch} from './createMatch';
import {colors} from './__stories__';
import {
  UsingCSSObject,
  UsingTaggedTemplateLiteral,
} from './createMatch.stories';

function applyStyleForEachMedia<Media extends MediaConstraint>(
  queries: MediaQueries<Media>,
  match: MatchFunction<Media>,
) {
  return keysOf<MediaQueries<Media>>(queries).map((media, index) =>
    match(media)({
      backgroundColor: colors[index],
    }),
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

describe('createMatch()', () => {
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
    const match = createMatch(queries);
    const Component = styled.div({}, applyStyleForEachMedia(queries, match));

    test('style is applied when media query is matched', () => {
      const {container} = render(<Component />);
      expectStyleForEachMedia(queries, container.firstChild);
    });
  });

  describe('when using a queries function', () => {
    const match = createMatch(() => queries);
    const Component = styled.div({}, applyStyleForEachMedia(queries, match));

    test('style is applied when media query is matched', () => {
      const {container} = render(<Component />);
      expectStyleForEachMedia(queries, container.firstChild);
    });
  });
});
