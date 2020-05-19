import {Theme} from './styled';
import {css} from './styled';
import {
  MediaConstraint,
  MediaQueries,
  MatchFunction,
  ThemeProps,
} from './types';

export interface GetMediaQueriesFromThemeFunction<
  Media extends MediaConstraint
> {
  (theme: Theme | undefined): MediaQueries<Media>;
}

function getQuery<Media extends MediaConstraint>(
  media: Media,
  queries: MediaQueries<Media>,
): string {
  if (process.env.NODE_ENV !== 'production') {
    if (!Object.prototype.hasOwnProperty.call(queries, media)) {
      console.warn(`Media "${media}" not found in queries.`);
    }
  }
  return queries[media];
}

/**
 * Create a mixin that applies styles when a media query is matched
 * @param options
 */
export const createMatch = <Media extends MediaConstraint>(
  queriesOrGetQueries:
    | MediaQueries<Media>
    | GetMediaQueriesFromThemeFunction<Media>,
): MatchFunction<Media> => {
  return (media) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (first: any, ...interpolations: any[]): any => {
      const query =
        typeof queriesOrGetQueries === 'function'
          ? ({theme}: ThemeProps) => getQuery(media, queriesOrGetQueries(theme))
          : getQuery(media, queriesOrGetQueries);
      return css`
        @media ${query} {
          ${css(first, ...interpolations)}
        }
      `;
    };
  };
};
