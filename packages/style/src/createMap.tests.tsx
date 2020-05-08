import 'jest-styled-components';
import React from 'react';
import styled from 'styled-components';
import {render} from '@testing-library/react';
import {keysOf} from '@substance/test-utilities';
import {
  MediaQueries,
  MapFunction,
  MediaConstraint,
  MatchFunction,
} from './types';
import {defaultMediaQueries, DefaultMedia} from './defaultMediaQueries';
import {createMatch} from './createMatch';
import {createMap} from './createMap';

function applyStyleForEachMedia<Media extends MediaConstraint>(
  queries: MediaQueries<Media>,
  map: MapFunction<Media>,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return map(
    keysOf<MediaQueries<Media>>(queries).reduce<{[m in Media]: Media}>(
      (v, media) => ({...v, [media]: media}),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {} as any,
    ),
    (media) => ({content: `"${media}"`}),
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

describe('createMap()', () => {
  test('no style is applied when media query is matched but style is undefined', () => {
    const map = createMap(createMatch(defaultMediaQueries));
    const Component = styled.div(
      {},
      map('red', () => undefined),
      map({mobile: 'red', desktop: 'green'}, () => undefined),
    );
    const {container} = render(<Component />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('no style is applied when media query is matched but style is a function returning undefined', () => {
    const map = createMap(createMatch(defaultMediaQueries));
    const Component = styled.div(
      {},
      map('red', () => undefined),
      map({mobile: 'red', desktop: 'green'}, () => undefined),
    );
    const {container} = render(<Component />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('style is applied when media query is matched and style is an object', () => {
    const map = createMap(createMatch(defaultMediaQueries));
    const Component = styled.div(
      {},
      map('red', (color) => ({color})),
      map({mobile: 'red', desktop: 'green'}, (color) => ({
        backgroundColor: color,
      })),
    );
    const {container} = render(<Component />);
    expect(container.firstChild).toHaveStyleRule('color', 'red');
    expect(container.firstChild).toHaveStyleRule('background-color', 'red', {
      media: defaultMediaQueries['mobile'],
    });
    expect(container.firstChild).toHaveStyleRule('background-color', 'green', {
      media: defaultMediaQueries['desktop'],
    });
  });

  describe('when using a queries object', () => {
    const match: MatchFunction<DefaultMedia> = createMatch(defaultMediaQueries);
    const map: MapFunction<DefaultMedia> = createMap(match);
    const Component = styled.div(
      {},
      applyStyleForEachMedia(defaultMediaQueries, map),
    );

    test('style is applied when media query is matched', () => {
      const {container} = render(<Component />);
      expectStyleForEachMedia(defaultMediaQueries, container.firstChild);
    });
  });

  describe('when using a queries function', () => {
    const match: MatchFunction<DefaultMedia> = createMatch(
      () => defaultMediaQueries,
    );
    const map: MapFunction<DefaultMedia> = createMap(match);
    const Component = styled.div(
      {},
      applyStyleForEachMedia(defaultMediaQueries, map),
    );

    test('style is applied when media query is matched', () => {
      const {container} = render(<Component />);
      expectStyleForEachMedia(defaultMediaQueries, container.firstChild);
    });
  });
});
