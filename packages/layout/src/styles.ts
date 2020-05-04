import {
  ThemeConstraint,
  DefaultTheme,
  MediaConstraint,
  MapFunction,
  ResponsiveValue,
  PropsWithTheme,
  Style,
} from '@substance/style';
import {SpaceConstraint, GetSpaceFunction} from '@substance/mixin';

interface StyleOptions<
  Media extends MediaConstraint,
  Space extends SpaceConstraint,
  Theme extends ThemeConstraint = DefaultTheme
> {
  map: MapFunction<Media, Theme>;
  getSpace: GetSpaceFunction<Space, Theme>;
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
      ({space, theme}: StyleProps<Media, Space, Theme>) => {
        if (space === undefined) {
          return;
        }
        return map(space, (s) => {
          const value = getSpace(s, {theme});
          return {
            ':before': {
              marginTop: `calc(-${value} - 1px)`,
            },
          };
        });
      },
    ],

    container: [
      ({space, theme}: StyleProps<Media, Space, Theme>) => {
        if (space === undefined) {
          return;
        }
        return map(space, (s) => {
          const value = getSpace(s, {theme});
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
      ({space, theme}: StyleProps<Media, Space, Theme>) => {
        if (space === undefined) {
          return;
        }
        return map(space, (s) => {
          const value = getSpace(s, {theme});
          return {
            paddingTop: value,
            paddingLeft: value,
          };
        });
      },
    ],
  };
};
