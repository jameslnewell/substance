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
  paddingTop,
  paddingLeft,
} from '@substance/mixin';
import {createSpaceStyles} from './styles';

export type InlineLayoutHorizontalAlignment = 'left' | 'center' | 'right';
export type InlineLayoutVerticalAlignment =
  | 'stretch'
  | 'top'
  | 'center'
  | 'bottom';

export interface InlineLayoutProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  halign?: ResponsiveValue<Media, InlineLayoutHorizontalAlignment>;
  valign?: ResponsiveValue<Media, InlineLayoutVerticalAlignment>;
  space?: ResponsiveValue<Media, Space>;
  className?: string;
}

interface WrapperProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  $space?: InlineLayoutProps<Media, Space>['space'];
}

interface ContainerProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  $space?: InlineLayoutProps<Media, Space>['space'];
  $halign?: InlineLayoutProps<Media, Space>['halign'];
  $valign?: InlineLayoutProps<Media, Space>['valign'];
}

interface ItemProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  $space?: InlineLayoutProps<Media, Space>['space'];
}

export interface CreateInlineLayoutOptions<
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

const verticalAlignment = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
  stretch: 'stretch',
};

export const createInlineLayout = <
  Media extends MediaConstraint,
  Space extends SpaceConstraint
>({
  map,
  getSpace,
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
      $halign: (
        align: ResponsiveValue<Media, InlineLayoutHorizontalAlignment>,
      ) => map(align, (a) => `justify-content: ${horizontalAlignment[a]}`),
      $valign: (align: ResponsiveValue<Media, InlineLayoutVerticalAlignment>) =>
        map(align, (a) => `justify-content: ${verticalAlignment[a]}`),
    })}
  `;

  const Item = styled.div<ItemProps<Media, Space>>`
    ${styles.item}
  `;

  const InlineLayout: React.FC<InlineLayoutProps<Media, Space>> = ({
    space,
    halign,
    valign,
    children,
    ...otherProps
  }) => (
    <Wrapper {...otherProps} $space={space}>
      <Container $halign={halign} $valign={valign} $space={space}>
        {flattenChildren(children).map((child, index) => {
          if (!React.isValidElement(child)) {
            return child;
          }
          return (
            <Item key={child.key || index} $space={space}>
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
  paddingTop,
  paddingLeft,
});
