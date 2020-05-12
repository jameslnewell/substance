import {css} from './styled/fns';
import {Theme} from './styled/types';
import {MediaConstraint, MediaQueries, MatchFunction} from './types';

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
  return queries[media] || '';
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
 * const Box = styled.div`
 *   ${match('mobile')`
 *     color: red;
 *   `}
 *   ${match('tablet')`
 *     color: red;
 *   `}
 *   ${match('desktop')`
 *     color: red;
 *   `}
 * `;
 */
export const createMatch = <Media extends MediaConstraint>(
  queriesOrGetQueries:
    | MediaQueries<Media>
    | GetMediaQueriesFromThemeFunction<Media>,
): MatchFunction<Media> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (media) => (first: any, ...interpolations: any[]): any => {
    return css`
      @media ${typeof queriesOrGetQueries === 'function'
          ? ({theme}) => getQuery(media, queriesOrGetQueries(theme))
          : getQuery(media, queriesOrGetQueries)} {
        ${css(first, interpolations)}
      }
    `;
  };
};
