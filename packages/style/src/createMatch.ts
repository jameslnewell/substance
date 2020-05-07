import {
  DefaultTheme,
  MediaConstraint,
  MediaQueries,
  MatchFunction,
  ThemeConstraint,
} from './types';

export interface GetMediaQueriesFromThemeFunction<
  Media extends MediaConstraint,
  Theme extends ThemeConstraint = DefaultTheme
> {
  (theme: Theme | undefined): MediaQueries<Media>;
}

const getQueryFromQueries = <Media extends MediaConstraint>(
  media: Media,
  queries: MediaQueries<Media>,
): string => {
  if (process.env.NODE_ENV !== 'production') {
    if (!Object.prototype.hasOwnProperty.call(queries, media)) {
      console.warn(`Media "${media}" not found in queries.`);
    }
  }
  return queries[media];
};

/**
 * Create a mixin that applies styles when a media query is matched
 *
 * @param options
 *
 * @example
 * const match = createMatch({
 *   mobile: '0em',
 *   tablet: '10em',
 *   desktop: '20em'
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
>(
  queries: MediaQueries<Media> | GetMediaQueriesFromThemeFunction<Media, Theme>,
): MatchFunction<Media, Theme> => {
  if (typeof queries === 'function') {
    return (media) => (style) => (props) => {
      return {
        [`@media ${getQueryFromQueries(media, queries(props.theme))}`]: style,
      };
    };
  } else {
    return (media) => (style) => {
      return {
        [`@media ${getQueryFromQueries(media, queries)}`]: style,
      };
    };
  }
};
