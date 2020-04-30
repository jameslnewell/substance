import React from 'react';
import styled from 'styled-components';
import flattenChildren from 'react-keyed-flatten-children';
import {
  map,
  ResponsiveValues,
  MediaConstraint,
  MapFunction,
  ThemeConstraint,
  DefaultTheme,
  createProps,
} from '@substance/style';
import {
  SpaceConstraint,
  getSpace,
  GetSpaceFunction,
} from '@substance/style/mixins';
import {createSpaceStyles} from './styles';

export type ColumnWidth = number | 'content';

export interface ColumnProps<Media extends MediaConstraint> {
  width?: ColumnWidth | ResponsiveValues<Media, ColumnWidth>;
}

export interface ColumnsLayoutProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  align?: '' | ResponsiveValues<Media, ''>;
  space?: Space | ResponsiveValues<Media, Space>;
}

export interface CreateColumnsLayoutOptions<
  Media extends MediaConstraint,
  Space extends SpaceConstraint,
  Theme extends ThemeConstraint = DefaultTheme
> {
  map: MapFunction<Media>;
  getSpace: GetSpaceFunction<Space, Theme>;
}

export const createColumnsLayout = <
  Media extends MediaConstraint,
  Space extends SpaceConstraint
>({
  map,
  getSpace,
}: CreateColumnsLayoutOptions<Media, Space>) => {
  const styles = createSpaceStyles<Media, Space>({
    map,
    getSpace,
  });

  const Wrapper = styled.div<ColumnsLayoutProps<Media, Space>>(
    {},
    styles.wrapper,
  );

  const Container = styled.div<ColumnsLayoutProps<Media, Space>>(
    {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    ({align}) =>
      align &&
      map(align, (a) => {
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
        }
      }),
    styles.container,
  );

  const Item = styled.div<ColumnsLayoutProps<Media, Space>>(
    {},
    styles.item,
    createProps({
      width: ({width}: ColumnWidth | ResponsiveValues<ColumnWidth>) =>
        map(space, (w) => {
          return {
            flexGrow: width === undefined ? 1 : undefined,
            flexShrink: width === 'content' ? 1 : undefined,
            flexBasis: typeof width === 'number' ? `${w * 100}%` : undefined,
          };
        }),
    }),
  );

  const Column: React.FC<ColumnProps> = ({width, children}) => (
    <SpaceContext.Consumer>
      {(space): React.ReactElement => <Item>{children}</Item>}
    </SpaceContext.Consumer>
  );

  const ColumnsLayout: React.FC<ColumnsLayoutProps<Media, Space>> = ({
    space,
    align,
    children,
  }) => (
    <Wrapper space={space}>
      <Container align={align} space={space}>
        {flattenChildren(children).map((child, index) => {
          if (!React.isValidElement(child)) {
            return child;
          }
          return (
            <Item key={child.key || index} space={space}>
              {child}
            </Item>
          );
        })}
      </Container>
    </Wrapper>
  );

  return ColumnsLayout;
};

export type ColumnsHorizontalAlignment = 'left' | 'center' | 'right';
export type ColumnsVerticalAlignment = 'stretch' | 'left' | 'center' | 'right';

export interface ColumnsProps {
  space?: Space;
  halign?: ColumnsHorizontalAlignment;
  valign?: ColumnsVerticalAlignment;
}

const getJustifyContent = (
  align: ResponsiveValue<ColumnsHorizontalAlignment> | undefined,
): ResponsiveValue<string> =>
  map<ColumnsHorizontalAlignment, string>(align, (a) => {
    switch (a) {
      case 'left':
        return 'flex-start';
      case 'center':
        return 'center';
      case 'right':
        return 'flex-end';
      default:
        return null;
    }
  });

export const Columns: React.FC<ColumnsProps> & {Column: typeof Column} = ({
  space,
  halign,
  valign,
  children,
}) => (
  <SpaceContext.Provider value={space}>
    <ColumnsWrapper space={space}>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent={getJustifyContent(halign)}
        alignItems={valign}
        marginLeft={space ? -space : space}
      >
        {children}
      </Box>
    </ColumnsWrapper>
  </SpaceContext.Provider>
);

Columns.Column = Column;
