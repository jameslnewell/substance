import {
  DefaultTheme,
  MediaConstraint,
  MediaQueries,
  MatchFunction,
} from './types';

export interface GetMediaQueriesFunction<
  Media extends MediaConstraint,
  Theme = DefaultTheme
> {
  (theme: Theme | undefined): MediaQueries<Media>;
}

export const createMatch = <
  Media extends MediaConstraint,
  Theme = DefaultTheme
>({
  mediaQueries,
}: {
  mediaQueries: MediaQueries<Media> | GetMediaQueriesFunction<Media, Theme>;
}): MatchFunction<Media, Theme> => {
  const getMediaValue = (queries: MediaQueries<Media>, media: Media) => {
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
