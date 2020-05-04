import {DefaultTheme, MediaQueries} from './types';
import {defaultMediaQueries, DefaultMedia} from './defaultMediaQueries';
import {createMatch} from './createMatch';

export type DefaultThemeMedia = DefaultTheme extends {
  media: MediaQueries<infer MediaName>;
}
  ? MediaName
  : DefaultMedia;

export const match = createMatch<DefaultThemeMedia, DefaultTheme>({
  mediaQueries: (theme) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const media = (theme as any)?.media;
    if (media) {
      return media;
    }
    return defaultMediaQueries;
  },
});
