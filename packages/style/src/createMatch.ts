import {
  DefaultTheme,
  MediaNameConstraint,
  MediaMap,
  MediaFunction,
} from './types';

export interface GetMediaMapFunction<
  MediaName extends MediaNameConstraint,
  Theme = DefaultTheme
> {
  (theme: Theme | undefined): MediaMap<MediaName>;
}

export const createMatch = <
  MediaName extends MediaNameConstraint,
  Theme = DefaultTheme
>({
  media,
}: {
  media: MediaMap<MediaName> | GetMediaMapFunction<MediaName, Theme>;
}): MediaFunction<MediaName, Theme> => {
  if (typeof media === 'function') {
    return (name) => (style) => (props) => ({
      [`@media ${media(props.theme)[name]}`]: style,
    });
  } else {
    return (name) => (style) => ({
      [`@media ${media[name]}`]: style,
    });
  }
};
