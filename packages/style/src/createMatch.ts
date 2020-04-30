import {
  DefaultTheme,
  MediaConstraint,
  MediaQueries,
  MatchFunction,
  ThemeConstraint,
} from './types';

export interface GetMediaQueriesFunction<
  Media extends MediaConstraint,
  Theme extends ThemeConstraint = DefaultTheme
> {
  (theme: Theme | undefined): MediaQueries<Media>;
}

/**
 * Create a mixin that applies styles when a media query is matched
 *
 * @param options
 *
 * @example
 * const match = createMatch({
 *   mediaQueries: {
 *     mobile: '0em',
 *     tablet: '30em',
 *     desktop: '40em'
 *   }
 * });
 *
 * const Box = styled.div(
 *   {},
 *   match('mobile')({
 *     color: 'red'
 *   }),
 *   match('tablet')({
 *     color: 'gren'
 *   }),
 *   match('desktop')({
 *     color: 'blue'
 *   })
 * }
 */
export const createMatch = <
  Media extends MediaConstraint,
  Theme extends ThemeConstraint = DefaultTheme
>({
  mediaQueries,
}: {
  mediaQueries: MediaQueries<Media> | GetMediaQueriesFunction<Media, Theme>;
}): MatchFunction<Media, Theme> => {
  const getMediaValue = (
    queries: MediaQueries<Media>,
    media: Media,
  ): string => {
    if (process.env.NODE_ENV !== 'production') {
      if (!Object.prototype.hasOwnProperty.call(queries, media)) {
        console.warn(`Media "${media}" not found in queries.`);
      }
    }
    return queries[media];
  };
  if (typeof mediaQueries === 'function') {
    return (media) => (style) => (props) => {
      return {
        [`@media ${getMediaValue(mediaQueries(props.theme), media)}`]: style,
      };
    };
  } else {
    return (media) => (style) => {
      return {
        [`@media ${getMediaValue(mediaQueries, media)}`]: style,
      };
    };
  }
};
