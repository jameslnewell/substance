import {Theme} from './styled/types';
import {MediaQueries, MatchFunction} from './types';
import {queries, DefaultMedia} from './queries';
import {createMatch} from './createMatch';

export type ThemedMedia = Theme extends {
  media: MediaQueries<infer M>;
}
  ? M
  : DefaultMedia;

export const match: MatchFunction<ThemedMedia> = createMatch<ThemedMedia>(
  (theme) => {
    // using any because unless the consumer defines the `media` property on the
    // theme the property will not exist and will result in compilation errors
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const media = (theme as any)?.media;
    if (media) {
      return media;
    }
    return queries;
  },
);
