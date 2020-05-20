import React from 'react';
import {
  map,
  ResponsiveValue,
  MediaConstraint,
  MapFunction,
  createProps,
} from '@substance/style';
import {
  getSpace,
  SpaceConstraint,
  GetSpaceFunction,
  ThemedGetSpaceFunction,
  SpaceMixinFunction,
  paddingTop,
  paddingLeft,
} from '@substance/mixin';
import styled, {css} from 'styled-components';
import {createSpaceStyles} from '../styles';

export type ColumnsLayoutColumnWidth = number | 'content';

export interface ColumnsLayoutColumnProps<Media extends MediaConstraint> {
  width?: ResponsiveValue<Media, ColumnsLayoutColumnWidth>;
  className?: string;
}

export type ColumnsLayoutHorizontalAlignment = 'left' | 'center' | 'right';
export type ColumnsLayoutVerticalAlignment =
  | 'stretch'
  | 'top'
  | 'center'
  | 'bottom';

export interface ColumnsLayoutProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  space?: ResponsiveValue<Media, Space>;
  halign?: ResponsiveValue<Media, ColumnsLayoutHorizontalAlignment>;
  valign?: ResponsiveValue<Media, ColumnsLayoutVerticalAlignment>;
  className?: string;
}

interface WrapperProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  $space?: ColumnsLayoutProps<Media, Space>['space'];
}

interface ContainerProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  $space?: ColumnsLayoutProps<Media, Space>['space'];
  $valign?: ColumnsLayoutProps<Media, Space>['valign'];
  $halign?: ColumnsLayoutProps<Media, Space>['halign'];
}

interface ItemProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  $space?: ColumnsLayoutProps<Media, Space>['space'];
  $width?: ColumnsLayoutColumnProps<Media>['width'];
}

export interface CreateColumnLayoutOptions<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  map: MapFunction<Media>;
  getSpace: GetSpaceFunction<Space> | ThemedGetSpaceFunction<Space>;
  paddingTop: SpaceMixinFunction<Media, Space>;
  paddingLeft: SpaceMixinFunction<Media, Space>;
}

export type ColumnLayout<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> = React.FC<ColumnsLayoutProps<Media, Space>> & {
  Column: React.ComponentType<ColumnsLayoutColumnProps<Media>>;
};

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

export const createColumnLayout = <
  Media extends MediaConstraint,
  Space extends SpaceConstraint
>({
  map,
  getSpace,
  paddingTop,
  paddingLeft,
}: CreateColumnLayoutOptions<Media, Space>): ColumnLayout<Media, Space> => {
  const SpaceContext = React.createContext<
    ResponsiveValue<Media, Space> | undefined
  >(undefined);

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
        halign: ResponsiveValue<Media, ColumnsLayoutHorizontalAlignment>,
      ) => map(halign, (ha) => `justify-content: ${horizontalAlignment[ha]};`),
      $valign: (
        valign: ResponsiveValue<Media, ColumnsLayoutVerticalAlignment>,
      ) => map(valign, (va) => `align-items: ${verticalAlignment[va]};`),
    })}
  `;

  const Item = styled.div<ItemProps<Media, Space>>`
    flex-grow: 1;
    ${styles.item}
    ${createProps({
      $width: (width: ResponsiveValue<Media, ColumnsLayoutColumnWidth>) =>
        map(
          width,
          (w) => css`
            flex-grow: ${w === undefined ? 1 : 'initial'};
            flex-shrink: ${w === 'content' ? 1 : 'initial'};
            flex-basis: ${typeof w === 'number' ? `${w * 100}%` : 'initial'};
            max-width: ${typeof w === 'number' ? `${w * 100}%` : 'initial'};
          `,
        ),
    })}
  `;

  const ColumnsLayoutColumn: React.FC<ColumnsLayoutColumnProps<Media>> = ({
    children,
    width,
    ...otherProps
  }) => (
    <SpaceContext.Consumer>
      {(space): React.ReactElement => (
        <Item {...otherProps} $space={space} $width={width}>
          {children}
        </Item>
      )}
    </SpaceContext.Consumer>
  );

  const ColumnLayout: React.FC<ColumnsLayoutProps<Media, Space>> & {
    Column: typeof ColumnsLayoutColumn;
  } = ({space, halign, valign, children, ...otherProps}) => (
    <SpaceContext.Provider value={space}>
      <Wrapper {...otherProps} $space={space}>
        <Container $halign={halign} $valign={valign} $space={space}>
          {children}
        </Container>
      </Wrapper>
    </SpaceContext.Provider>
  );

  ColumnLayout.Column = ColumnsLayoutColumn;

  return ColumnLayout;
};

export const ColumnLayout = createColumnLayout({
  map,
  getSpace,
  paddingTop,
  paddingLeft,
});
