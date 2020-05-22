import {
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
import {css} from 'styled-components';

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
  $space?: ResponsiveValue<Media, Space>;
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
  const wrapper = css<StyleProps<Media, Space>>`
    padding-top: 1px;
    :before {
      display: block;
      content: '';
      margin-top: -1px;
      ${createProps({
        $space: (space: ResponsiveValue<Media, Space>) =>
          map(
            space,
            (s) => css`
              margin-top: calc(-${getSpace(s)} - 1px);
            `,
          ),
      })}
    }
  `;

  const container = css<StyleProps<Media, Space>>`
    ${createProps({
      $space: (space: ResponsiveValue<Media, Space>) =>
        map(
          space,
          (s) =>
            css`
              margin-left: -${getSpace(s)};
            `,
        ),
    })}
  `;

  const item = css<StyleProps<Media, Space>>`
    box-sizing: border-box;
    ${createProps<{$space: SpaceMixinFunction<Media, Space>[]}>({
      $space: [paddingTop, paddingLeft],
    })}
  `;

  return {
    wrapper,
    container,
    item,
  };
};
