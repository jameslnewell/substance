import React from 'react';
import styled from 'styled-components';
import flattenChildren from 'react-keyed-flatten-children';
import {
  ResponsiveValue,
  MediaConstraint,
  MapFunction,
  map,
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

type WrapperProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> = Pick<TilesLayoutProps<Media, Space>, 'space'>;
type ContainerProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> = Pick<TilesLayoutProps<Media, Space>, 'align' | 'space'>;
type ItemProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> = Pick<TilesLayoutProps<Media, Space>, 'columns' | 'space'>;

export interface CreateTileLayoutOptions<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  map: MapFunction<Media>;
  getSpace: GetSpaceFunction<Space> | ThemedGetSpaceFunction<Space>;
  paddingTop: SpaceMixinFunction<Media, Space>;
  paddingLeft: SpaceMixinFunction<Media, Space>;
}

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

  const Wrapper = styled.div<WrapperProps<Media, Space>>({}, styles.wrapper);

  const Container = styled.div<ContainerProps<Media, Space>>(
    {
      display: 'flex',
      flexWrap: 'wrap',
    },
    styles.container,
    ({align}) => {
      if (align === undefined) {
        return undefined;
      }
      return map(align, (a) => {
        switch (a) {
          case 'left':
            return {
              justifyContent: 'flex-start',
            };
          case 'center':
            return {
              justifyContent: 'center',
            };
          case 'right':
            return {
              justifyContent: 'flex-end',
            };
          default:
            return {
              justifyContent: a,
            };
        }
      });
    },
  );

  const Item = styled.div<ItemProps<Media, Space>>(
    {
      flexGrow: 1,
      flexShrink: 1,
    },
    styles.item,
    ({columns}) => {
      if (columns === undefined) {
        return undefined;
      }
      return map(columns, (c) => {
        return {
          flexGrow: 0,
          flexShrink: 0,
          flexBasis: c !== undefined ? `${(1 / c) * 100}%` : undefined,
        };
      });
    },
  );

  const TileLayout: React.FC<TilesLayoutProps<Media, Space>> = ({
    columns,
    space,
    align,
    children,
    ...otherProps
  }) => (
    <Wrapper {...otherProps} space={space}>
      <Container align={align} space={space}>
        {flattenChildren(children).map((child, index) => {
          if (!React.isValidElement(child)) {
            return child;
          }
          return (
            <Item key={child.key || index} columns={columns} space={space}>
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
