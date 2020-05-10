import {
  ThemeConstraint,
  DefaultTheme,
  MediaConstraint,
  MapFunction,
  ResponsiveValue,
  PropsWithTheme,
  Style,
  createProps,
} from '@substance/style';
import {
  SpaceConstraint,
  GetSpaceFunction,
  ThemedGetSpaceFunction,
  SpaceMixinFunction,
} from '@substance/mixin';

interface StyleOptions<
  Media extends MediaConstraint,
  Space extends SpaceConstraint,
  Theme extends ThemeConstraint = DefaultTheme
> {
  map: MapFunction<Media>;
  getSpace: GetSpaceFunction<Space> | ThemedGetSpaceFunction<Space, Theme>;
  paddingTop: SpaceMixinFunction<Media, Space, Theme>;
  paddingLeft: SpaceMixinFunction<Media, Space, Theme>;
}

export interface StyleProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint,
  Theme extends ThemeConstraint = DefaultTheme
> extends PropsWithTheme<{}, Theme> {
  space?: ResponsiveValue<Media, Space>;
}

export const createSpaceStyles = <
  Media extends MediaConstraint,
  Space extends SpaceConstraint,
  Theme extends ThemeConstraint = DefaultTheme
>({
  map,
  getSpace,
  paddingTop,
  paddingLeft,
}: StyleOptions<Media, Space, Theme>): {
  [name: string]: Style<StyleProps<Media, Space, Theme>>;
} => {
  return {
    wrapper: [
      {
        paddingTop: 1,
        ':before': {
          display: 'block',
          content: '""',
          marginTop: '-1px',
        },
      },
      ({space}: StyleProps<Media, Space, Theme>) => {
        if (space === undefined) {
          return;
        }
        return map(space, (s) => {
          const value = getSpace(s);
          return {
            ':before': {
              marginTop: `calc(-${value} - 1px)`,
            },
          };
        });
      },
    ],

    container: [
      ({space}: StyleProps<Media, Space, Theme>) => {
        if (space === undefined) {
          return;
        }
        return map(space, (s) => {
          const value = getSpace(s);
          return {
            marginLeft: `-${value}`,
          };
        });
      },
    ],

    item: [
      {
        boxSizing: 'border-box',
      },
      createProps({
        space: [paddingLeft, paddingTop],
      }),
    ],
  };
};
