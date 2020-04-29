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
  if (typeof mediaQueries === 'function') {
    return (media) => (style) => (props) => ({
      [`@media ${mediaQueries(props.theme)[media]}`]: style,
    });
  } else {
    return (media) => (style) => ({
      [`@media ${mediaQueries[media]}`]: style,
    });
  }
};
