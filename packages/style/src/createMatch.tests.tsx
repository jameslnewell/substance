import 'jest-styled-components';
import React from 'react';
import styled from 'styled-components';
import {render} from '@testing-library/react';
import {keysOf} from '@substance/test-utilities';
import {MediaQueries, MatchFunction, MediaConstraint} from './types';
import {DefaultMedia, queries} from './queries';
import {createMatch} from './createMatch';
import {colors} from './__stories__';
import {
  StyledWithObject,
  StyledWithFunction,
  StyleWithTaggedTemplateLiteral,
  StyledWithMixed,
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
  [
    ['tagged template literal', StyleWithTaggedTemplateLiteral],
    ['function', StyledWithFunction],
    ['object', StyledWithObject],
    ['mixed', StyledWithMixed],
  ].forEach(([type, Component]) => {
    describe(`when styled with ${type}`, () => {
      test('style is not applied when media queries are not matched', () => {
        const {container} = render(<Component />);
        expect.assertions(colors.length * 2);
        colors.forEach((color) => {
          expect(container.firstChild).not.toHaveStyleRule(
            'background-color',
            color,
            {},
          );
        });
      });

      (Object.keys(queries) as DefaultMedia[]).forEach((media, index) => {
        test(`style is applied when media query is matched at ${media}`, () => {
          const {container} = render(<Component />);
          expect(container.firstChild).toHaveStyleRule(
            'background-color',
            colors[index],
            {
              media: queries[media],
            },
          );
        });
      });
    });
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
