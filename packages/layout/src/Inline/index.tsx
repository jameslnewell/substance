import React from 'react';
import styled from 'styled-components';
import flattenChildren from 'react-keyed-flatten-children';
import {
  map,
  ResponsiveValue,
  MediaConstraint,
  MapFunction,
  createProps,
} from '@substance/style';
import {
  SpaceConstraint,
  getSpace,
  GetSpaceFunction,
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

export interface InlineLayoutProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
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
  $spaceY?: InlineLayoutProps<Media, Space>['spaceY'];
}

interface ContainerProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  $alignItems?: MixinFunctionValue<Media, 'align-items'>;
  $justifyContent?: MixinFunctionValue<Media, 'justify-content'>;
  $spaceX?: InlineLayoutProps<Media, Space>['spaceX'];
}

interface ItemProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  $spaceX?: InlineLayoutProps<Media, Space>['spaceX'];
  $spaceY?: InlineLayoutProps<Media, Space>['spaceY'];
}

export interface CreateInlineLayoutOptions<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  map: MapFunction<Media>;
  getSpace: GetSpaceFunction<Space> | ThemedGetSpaceFunction<Space>;
  alignItems: MixinFunction<Media, 'align-items'>;
  justifyContent: MixinFunction<Media, 'justify-content'>;
  paddingTop: SpaceMixinFunction<Media, Space>;
  paddingLeft: SpaceMixinFunction<Media, Space>;
}

export const createInlineLayout = <
  Media extends MediaConstraint,
  Space extends SpaceConstraint
>({
  map,
  getSpace,
  alignItems,
  justifyContent,
  paddingTop,
  paddingLeft,
}: CreateInlineLayoutOptions<Media, Space>) => {
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
    flex-direction: row;
    flex-wrap: wrap;
    ${styles.container}
    ${createProps({
      $alignItems: alignItems,
      $justifyContent: justifyContent,
    })}
  `;

  const Item = styled.div<ItemProps<Media, Space>>`
    ${styles.item}
  `;

  const InlineLayout: React.FC<InlineLayoutProps<Media, Space>> = ({
    spaceX,
    spaceY,
    alignX,
    alignY,
    children,
    ...otherProps
  }) => (
    <Wrapper {...otherProps} $spaceY={spaceY}>
      <Container
        $justifyContent={mapAlignX(alignX)}
        $alignItems={mapAlignY(alignY)}
        $spaceX={spaceX}
      >
        {flattenChildren(children).map((child, index) => {
          if (!React.isValidElement(child)) {
            return child;
          }
          return (
            <Item key={child.key || index} $spaceX={spaceX} $spaceY={spaceY}>
              {child}
            </Item>
          );
        })}
      </Container>
    </Wrapper>
  );

  return InlineLayout;
};

export const InlineLayout = createInlineLayout({
  map,
  getSpace,
  alignItems,
  justifyContent,
  paddingTop,
  paddingLeft,
});
