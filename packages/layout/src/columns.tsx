import React from 'react';
import styled from 'styled-components';
import {
  map,
  ResponsiveValue,
  MediaConstraint,
  MapFunction,
  ThemeConstraint,
  DefaultTheme,
  StyleObject,
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
import {createSpaceStyles} from './styles';

export type ColumnsLayoutColumnWidth = number | 'content';

export interface ColumnsLayoutColumnProps<Media extends MediaConstraint> {
  width?: ResponsiveValue<Media, ColumnsLayoutColumnWidth>;
  className?: string;
}

export type ColumnsHorizontalAlignment = 'left' | 'center' | 'right';
export type ColumnsVerticalAlignment = 'stretch' | 'top' | 'center' | 'bottom';

export interface ColumnsLayoutProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  space?: ResponsiveValue<Media, Space>;
  halign?: ResponsiveValue<Media, ColumnsHorizontalAlignment>;
  valign?: ResponsiveValue<Media, ColumnsVerticalAlignment>;
  className?: string;
}

type WrapperProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> = Pick<ColumnsLayoutProps<Media, Space>, 'space'>;

type ContainerProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> = Pick<ColumnsLayoutProps<Media, Space>, 'space' | 'valign' | 'halign'>;

type ItemProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> = Pick<ColumnsLayoutProps<Media, Space>, 'space'> &
  Pick<ColumnsLayoutColumnProps<Media>, 'width'>;

export interface CreateColumnsLayoutOptions<
  Media extends MediaConstraint,
  Space extends SpaceConstraint,
  Theme extends ThemeConstraint = DefaultTheme
> {
  map: MapFunction<Media>;
  getSpace: GetSpaceFunction<Space> | ThemedGetSpaceFunction<Space, Theme>;
  paddingTop: SpaceMixinFunction<Media, Space, Theme>;
  paddingLeft: SpaceMixinFunction<Media, Space, Theme>;
}

export type ColumnsLayout<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> = React.FC<ColumnsLayoutProps<Media, Space>> & {
  Column: React.ComponentType<ColumnsLayoutColumnProps<Media>>;
};

const getHorizontalAlignment = (
  alignment: ColumnsHorizontalAlignment,
): StyleObject => {
  switch (alignment) {
    case 'left':
      return {justifyContent: 'flex-start'};
    case 'center':
      return {justifyContent: 'center'};
    case 'right':
      return {justifyContent: 'flex-end'};
    default:
      return {justifyContent: alignment};
  }
};

const getVerticalAlignment = (
  alignment: ColumnsVerticalAlignment,
): StyleObject => {
  switch (alignment) {
    case 'top':
      return {alignItems: 'flex-start'};
    case 'center':
      return {alignItems: 'center'};
    case 'bottom':
      return {alignItems: 'flex-end'};
    default:
      return {alignItems: alignment};
  }
};

const getWidth = (width: ColumnsLayoutColumnWidth): StyleObject => {
  return {
    flexGrow: width === undefined ? 1 : 0,
    flexShrink: width === 'content' ? 1 : 0,
    flexBasis: typeof width === 'number' ? `${width * 100}%` : 'auto',
  };
};

export const createColumnsLayout = <
  Media extends MediaConstraint,
  Space extends SpaceConstraint
>({
  map,
  getSpace,
  paddingTop,
  paddingLeft,
}: CreateColumnsLayoutOptions<Media, Space>): ColumnsLayout<Media, Space> => {
  const SpaceContext = React.createContext<
    ResponsiveValue<Media, Space> | undefined
  >(undefined);

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
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    styles.container,
    ({halign}) => {
      if (halign === undefined) {
        return undefined;
      }
      return map(halign, getHorizontalAlignment);
    },
    ({valign}) => {
      if (valign === undefined) {
        return undefined;
      }
      return map(valign, getVerticalAlignment);
    },
  );

  const Item = styled.div<ItemProps<Media, Space>>(
    {
      flexGrow: 1,
    },
    styles.item,
    ({width}) => {
      if (width === undefined) {
        return undefined;
      }
      return map(width, getWidth);
    },
  );

  const ColumnsLayoutColumn: React.FC<ColumnsLayoutColumnProps<Media>> = ({
    children,
    ...otherProps
  }) => (
    <SpaceContext.Consumer>
      {(space): React.ReactElement => (
        <Item {...otherProps} space={space}>
          {children}
        </Item>
      )}
    </SpaceContext.Consumer>
  );

  const ColumnsLayout: React.FC<ColumnsLayoutProps<Media, Space>> & {
    Column: typeof ColumnsLayoutColumn;
  } = ({space, halign, valign, children, ...otherProps}) => (
    <SpaceContext.Provider value={space}>
      <Wrapper {...otherProps} space={space}>
        <Container halign={halign} valign={valign} space={space}>
          {children}
        </Container>
      </Wrapper>
    </SpaceContext.Provider>
  );

  ColumnsLayout.Column = ColumnsLayoutColumn;

  return ColumnsLayout;
};

export const ColumnsLayout = createColumnsLayout({
  map,
  getSpace,
  paddingTop,
  paddingLeft,
});
