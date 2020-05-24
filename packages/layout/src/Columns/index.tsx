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
  justifyContent,
  alignItems,
  Mixin,
  MixinValue,
} from '@substance/mixin';
import styled, {css} from 'styled-components';
import {createSpaceStyles} from '../styles';
import {
  ResponsiveAlignX,
  ResponsiveAlignY,
  mapAlignX,
  mapAlignY,
} from '../utils/alignment';

export type ColumnsLayoutColumnWidth = number | 'content';

export interface ColumnsLayoutColumnProps<Media extends MediaConstraint> {
  width?: ResponsiveValue<Media, ColumnsLayoutColumnWidth>;
  className?: string;
}

export interface ColumnsLayoutProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  space?: ResponsiveValue<Media, Space>;
  alignX?: ResponsiveAlignX<Media>;
  alignY?: ResponsiveAlignY<Media>;
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
  $alignItems?: MixinValue<Media, 'align-items'>;
  $justifyContent?: MixinValue<Media, 'justify-content'>;
  $space?: ColumnsLayoutProps<Media, Space>['space'];
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
  alignItems: Mixin<Media, 'align-items'>;
  justifyContent: Mixin<Media, 'justify-content'>;
  paddingTop: SpaceMixinFunction<Media, Space>;
  paddingLeft: SpaceMixinFunction<Media, Space>;
}

export type ColumnLayout<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> = React.FC<ColumnsLayoutProps<Media, Space>> & {
  Column: React.ComponentType<ColumnsLayoutColumnProps<Media>>;
};

export const createColumnLayout = <
  Media extends MediaConstraint,
  Space extends SpaceConstraint
>({
  map,
  getSpace,
  alignItems,
  justifyContent,
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
      $alignItems: alignItems,
      $justifyContent: justifyContent,
    })}
  `;

  const Item = styled.div<ItemProps<Media, Space>>`
    flex-grow: 1;
    ${styles.item}
    ${createProps({
      $width: (width: ResponsiveValue<Media, ColumnsLayoutColumnWidth>) => {
        return map(
          width,
          (w) => css`
            flex-grow: ${w === undefined ? 1 : 'initial'};
            flex-shrink: ${w === 'content' ? 1 : 'initial'};
            flex-basis: ${typeof w === 'number' ? `${w * 100}%` : 'initial'};
            max-width: ${typeof w === 'number' ? `${w * 100}%` : 'initial'};
          `,
        );
      },
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
  } = ({space, alignX, alignY, children, ...otherProps}) => (
    <SpaceContext.Provider value={space}>
      <Wrapper {...otherProps} $space={space}>
        <Container
          $alignItems={mapAlignY(alignY)}
          $justifyContent={mapAlignX(alignX)}
          $space={space}
        >
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
  alignItems,
  justifyContent,
  paddingTop,
  paddingLeft,
});
