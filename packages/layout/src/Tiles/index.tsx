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
  alignItems,
  justifyContent,
  paddingTop,
  paddingLeft,
  MixinFunction,
  MixinFunctionValue,
} from '@substance/mixin';
import {createSpaceStyles} from '../styles';
import {
  mapAlignX,
  mapAlignY,
  ResponsiveAlignX,
  ResponsiveAlignY,
} from '../utils/alignment';

export type TilesLayoutAlignment = 'left' | 'center' | 'right';

export interface TilesLayoutProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  columns?: ResponsiveValue<Media, number>;
  alignX?: ResponsiveAlignX<Media>;
  alignY?: ResponsiveAlignY<Media>;
  spaceX?: ResponsiveValue<Media, Space>;
  spaceY?: ResponsiveValue<Media, Space>;
  className?: string;
}

interface WrapperProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  $spaceY?: TilesLayoutProps<Media, Space>['spaceY'];
}
interface ContainerProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  $alignItems?: MixinFunctionValue<Media, 'align-items'>;
  $justifyContent?: MixinFunctionValue<Media, 'justify-content'>;
  $spaceX?: TilesLayoutProps<Media, Space>['spaceX'];
}
interface OuterItemProps<
  Media extends MediaConstraint,
> {
  $columns?: TilesLayoutProps<Media, number>['columns'];
}

interface InnerItemProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  $spaceX?: TilesLayoutProps<Media, Space>['spaceX'];
  $spaceY?: TilesLayoutProps<Media, Space>['spaceY'];
}


export interface CreateTileLayoutOptions<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  map: MapFunction<Media>;
  getSpace: GetSpaceFunction<Space> | ThemedGetSpaceFunction<Space>;
  alignItems: MixinFunction<Media, 'justify-content'>;
  justifyContent: MixinFunction<Media, 'justify-content'>;
  paddingTop: SpaceMixinFunction<Media, Space>;
  paddingLeft: SpaceMixinFunction<Media, Space>;
}

export const createTileLayout = <
  Media extends MediaConstraint,
  Space extends SpaceConstraint
>({
  map,
  getSpace,
  alignItems,
  justifyContent,
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
      $alignItems: alignItems,
      $justifyContent: justifyContent,
    })}
  `;

  const OuterItem = styled.div<OuterItemProps<Media>>`
    flex: 0 0 100%;
    ${createProps({
      $columns: (columns: ResponsiveValue<Media, number>) =>
        map(
          columns,
          (c) => css`
            flex: 0 0 ${c !== undefined ? `${(1 / c) * 100}%` : undefined};
          `,
        ),
    })}
  `;

  const InnerItem = styled.div<InnerItemProps<Media, Space>>`
    ${styles.item}
  `;

  const TileLayout: React.FC<TilesLayoutProps<Media, Space>> = ({
    columns,
    alignX,
    alignY,
    spaceX,
    spaceY,
    children,
    ...otherProps
  }) => (
    <Wrapper {...otherProps} $spaceY={spaceY}>
      <Container
        $alignItems={mapAlignY(alignY)}
        $justifyContent={mapAlignX(alignX)}
        $spaceX={spaceX}
      >
        {flattenChildren(children).map((child, index) => {
          if (!React.isValidElement(child)) {
            return child;
          }
          return (
            <OuterItem
              key={child.key || index}
              $columns={columns}
              
            >
              {/*  
                its necessary to apply padding to the inner item as the padding 
                affects the flex properties and results in uneven tile widths
              */}
              <InnerItem 
                $spaceX={spaceX}
                $spaceY={spaceY}
              >
                {child}
              </InnerItem>
            </OuterItem>
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
  alignItems,
  justifyContent,
  paddingTop,
  paddingLeft,
});
