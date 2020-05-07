import 'jest-styled-components';
import React from 'react';
import styled from 'styled-components';
import {render} from '@testing-library/react';
import {keysOf} from '@substance/test-utilities';
import {MediaQueries, MatchFunction, MediaConstraint} from './types';
import {defaultMediaQueries} from './defaultMediaQueries';
import {createMatch} from './createMatch';

function applyStyleForEachMedia<Media extends MediaConstraint>(
  queries: MediaQueries<Media>,
  match: MatchFunction<Media>,
) {
  return keysOf<MediaQueries<Media>>(queries).map((media) =>
    match(media)({
      content: `"${media}"`,
    }),
  );
}

function expectStyleForEachMedia<Media extends MediaConstraint>(
  queries: MediaQueries<Media>,
  element: ChildNode | null,
) {
  const keys = keysOf(queries);
  expect.assertions(keys.length * 2); // FIXME: bit confused by this!
  keys.forEach((media) => {
    expect(element).toHaveStyleRule('content', `"${media}"`, {
      media: queries[media],
    });
  });
}

describe('createMatch()', () => {
  describe('when using a queries object', () => {
    const match = createMatch(defaultMediaQueries);
    const Component = styled.div(
      {},
      applyStyleForEachMedia(defaultMediaQueries, match),
    );

    test('style is applied when media query is matched', () => {
      const {container} = render(<Component />);
      expectStyleForEachMedia(defaultMediaQueries, container.firstChild);
    });
  });

  describe('when using a queries function', () => {
    const match = createMatch(() => defaultMediaQueries);
    const Component = styled.div(
      {},
      applyStyleForEachMedia(defaultMediaQueries, match),
    );

    test('style is applied when media query is matched', () => {
      const {container} = render(<Component />);
      expectStyleForEachMedia(defaultMediaQueries, container.firstChild);
    });
  });
});
