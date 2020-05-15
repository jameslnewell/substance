import {
  css,
  MediaConstraint,
  MapFunction,
  ResponsiveValue,
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
  Space extends SpaceConstraint
> {
  map: MapFunction<Media>;
  getSpace: GetSpaceFunction<Space> | ThemedGetSpaceFunction<Space>;
  paddingTop: SpaceMixinFunction<Media, Space>;
  paddingLeft: SpaceMixinFunction<Media, Space>;
}

export interface StyleProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  space?: ResponsiveValue<Media, Space>;
}

export const createSpaceStyles = <
  Media extends MediaConstraint,
  Space extends SpaceConstraint
>({
  map,
  getSpace,
  paddingTop,
  paddingLeft,
}: StyleOptions<Media, Space>) => {
  // TODO: return types
  return {
    wrapper: css<StyleProps<Media, Space>>`
      padding-top: 1px;
      :before {
        display: block;
        content: '';
        margin-top: -1px;
        ${({space}) => {
          if (space === undefined) {
            return;
          }
          return map(
            space,
            (s) => css`
              margin-top: calc(-${getSpace(s)} - 1px);
            `,
          );
        }}
      }
    `,

    container: ({space}: StyleProps<Media, Space>) => {
      if (space === undefined) {
        return;
      }
      return map(
        space,
        (s) =>
          css`
            margin-left: -${getSpace(s)};
          `,
      );
    },

    item: css`
      box-sizing: border-box;
      ${createProps({
        space: [paddingLeft, paddingTop],
      })}
    `,
  };
};
