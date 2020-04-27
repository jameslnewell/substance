import {DefaultTheme, MediaMap} from './types';
import {defaultMedia, DefaultMediaName} from './defaultMedia';
import {createMatch} from './createMatch';

type DefaultThemeMediaName = DefaultTheme extends {
  media: MediaMap<infer MediaName>;
}
  ? MediaName
  : DefaultMediaName;

export const match = createMatch<DefaultThemeMediaName, DefaultTheme>({
  media: (theme) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const media = (theme as any)?.media;
    if (media) {
      return media;
    }
    return defaultMedia;
  },
});
