import {DefaultTheme, MediaQueries, MatchFunction} from './types';
import {defaultMediaQueries, DefaultMedia} from './defaultMediaQueries';
import {createMatch} from './createMatch';

export type DefaultThemeMedia = DefaultTheme extends {
  media: MediaQueries<infer MediaName>;
}
  ? MediaName
  : DefaultMedia;

export const match: MatchFunction<
  DefaultThemeMedia,
  DefaultTheme
> = createMatch<DefaultThemeMedia, DefaultTheme>((theme) => {
  // using any because unless the consumer defines the `media` property on the
  // theme the property will not exist and will result in compilation errors
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const media = (theme as any)?.media;
  if (media) {
    return media;
  }
  return defaultMediaQueries;
});
