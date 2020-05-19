import React from 'react';
import styled, {css} from 'styled-components';
import flattenChildren from 'react-keyed-flatten-children';
import {
  ResponsiveValue,
  MediaConstraint,
  MapFunction,
  map,
  createProps,
} from '@substance/style';
import {
  SpaceConstraint,
  GetSpaceFunction,
  getSpace,
  ThemedGetSpaceFunction,
  SpaceMixinFunction,
  paddingTop,
  paddingLeft,
} from '@substance/mixin';
import {createSpaceStyles} from './styles';

export type TilesLayoutAlignment = 'left' | 'center' | 'right';

export interface TilesLayoutProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  columns?: ResponsiveValue<Media, number>;
  space?: ResponsiveValue<Media, Space>;
  align?: ResponsiveValue<Media, TilesLayoutAlignment>;
  className?: string;
}

interface WrapperProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  $space?: TilesLayoutProps<Media, Space>['space'];
}
interface ContainerProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  $align?: TilesLayoutProps<Media, TilesLayoutAlignment>['align'];
  $space?: TilesLayoutProps<Media, Space>['space'];
}
interface ItemProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  $columns?: TilesLayoutProps<Media, number>['columns'];
  $space?: TilesLayoutProps<Media, Space>['space'];
}

export interface CreateTileLayoutOptions<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  map: MapFunction<Media>;
  getSpace: GetSpaceFunction<Space> | ThemedGetSpaceFunction<Space>;
  paddingTop: SpaceMixinFunction<Media, Space>;
  paddingLeft: SpaceMixinFunction<Media, Space>;
}

const horizontalAlignment = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

export const createTileLayout = <
  Media extends MediaConstraint,
  Space extends SpaceConstraint
>({
  map,
  getSpace,
  paddingTop,
  paddingLeft,
}: CreateTileLayoutOptions<Media, Space>) => {
  const styles = createSpaceStyles<Media, Space>({
    map,
    getSpace,
    paddingTop,
    paddingLeft,
  });

  const Wrapper = styled.div<WrapperProps<Media, Space>>`
    ${styles.wrapper}
  `;

  const Container = styled.div<ContainerProps<Media, Space>>`
    display: flex;
    flex-wrap: wrap;
    ${styles.container}
    ${createProps({
      $align: (align: ResponsiveValue<Media, TilesLayoutAlignment>) =>
        map(align, (a) => `justify-content: ${horizontalAlignment[a]};`),
    })}
  `;

  const Item = styled.div<ItemProps<Media, Space>>`
    flex-grow: 1;
    flex-shrink: 1;
    ${styles.item}
    ${createProps({
      $columns: (columns: ResponsiveValue<Media, number>) =>
        map(
          columns,
          (c) => css`
            flex-grow: 0;
            flex-shrink: 0;
            flex-basis: ${c !== undefined ? `${(1 / c) * 100}%` : undefined};
          `,
        ),
    })}
  `;

  const TileLayout: React.FC<TilesLayoutProps<Media, Space>> = ({
    columns,
    space,
    align,
    children,
    ...otherProps
  }) => (
    <Wrapper {...otherProps} $space={space}>
      <Container $align={align} $space={space}>
        {flattenChildren(children).map((child, index) => {
          if (!React.isValidElement(child)) {
            return child;
          }
          return (
            <Item key={child.key || index} $columns={columns} $space={space}>
              {child}
            </Item>
          );
        })}
      </Container>
    </Wrapper>
  );

  return TileLayout;
};

export const TileLayout = createTileLayout({
  map,
  getSpace,
  paddingTop,
  paddingLeft,
});
