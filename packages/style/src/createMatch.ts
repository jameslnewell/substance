import {
  DefaultTheme,
  MediaConstraint,
  MediaQueries,
  MatchFunction,
  ThemeConstraint,
  StyleObject,
} from './types';

export interface GetMediaQueriesFromThemeFunction<
  Media extends MediaConstraint,
  Theme extends ThemeConstraint = DefaultTheme
> {
  (theme: Theme | undefined): MediaQueries<Media>;
}

function createStyleObject<Media extends MediaConstraint>(
  media: Media,
  queries: MediaQueries<Media>,
  style: undefined | StyleObject,
): StyleObject {
  if (process.env.NODE_ENV !== 'production') {
    if (!Object.prototype.hasOwnProperty.call(queries, media)) {
      console.warn(`Media "${media}" not found in queries.`);
    }
  }
  if (typeof style === 'undefined') {
    return {};
  }
  const query = queries[media];
  return {
    [`@media ${query}`]: style,
  };
}

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
  queriesOrGetQueries:
    | MediaQueries<Media>
    | GetMediaQueriesFromThemeFunction<Media, Theme>,
): MatchFunction<Media, Theme> => {
  if (typeof queriesOrGetQueries === 'function') {
    return (media) => (style) => (props) => {
      const queries = queriesOrGetQueries(props.theme);
      if (typeof style === 'function') {
        return createStyleObject(media, queries, style(props));
      }
      return createStyleObject(media, queries, style);
    };
  } else {
    return (media) => (style) => {
      if (typeof style === 'function') {
        return (props) =>
          createStyleObject(media, queriesOrGetQueries, style(props));
      }
      return createStyleObject(media, queriesOrGetQueries, style);
    };
  }
};
