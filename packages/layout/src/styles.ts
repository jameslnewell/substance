import {
  MediaConstraint,
  MapFunction,
  ResponsiveValue,
  createProps,
  ThemeProps,
  Interpolation,
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
  Props
> {
  map: MapFunction<Media>;
  getSpace: GetSpaceFunction<Space> | ThemedGetSpaceFunction<Space, Props>;
  paddingTop: SpaceMixinFunction<Media, Space, Props>;
  paddingLeft: SpaceMixinFunction<Media, Space, Props>;
}

export interface StyleProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> extends ThemeProps {
  space?: ResponsiveValue<Media, Space>;
}

export const createSpaceStyles = <
  Media extends MediaConstraint,
  Space extends SpaceConstraint,
  Props
>({
  map,
  getSpace,
  paddingTop,
  paddingLeft,
}: StyleOptions<Media, Space, Props>): {
  [name: string]: Interpolation<StyleProps<Media, Space>>;
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
      ({space}: StyleProps<Media, Space>) => {
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
      ({space}: StyleProps<Media, Space>) => {
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
