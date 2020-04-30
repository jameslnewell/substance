import React from 'react';
import styled from 'styled-components';
import {ResponsiveValue} from 'styled-system';

import {Box} from '../../Box';
import {Space} from '../../theming';
import {map} from '../map';

const SpaceContext = React.createContext<Space | undefined>(undefined);

const ColumnsWrapper = styled.div<{space?: ResponsiveValue<Space>}>`
  padding-top: 1px;
  :before {
    display: block;
    content: '';
    /* TODO: make responsive */
    margin-top: calc(
      -${({theme, space}): number | string =>
          theme.space[space] || space || 0}px - 1px
    );
  }
`;

export type ColumnWidth = number | 'content';

export interface ColumnProps {
  width?: ResponsiveValue<ColumnWidth>;
}

const getFlexBasis = (
  width: ResponsiveValue<ColumnWidth> | undefined,
): ResponsiveValue<string> =>
  map<ColumnWidth, string>(width, (w) => {
    if (typeof w === 'number') {
      return `${w * 100}%`;
    }
    return null;
  });

const getFlexGrow = (
  width: ResponsiveValue<ColumnWidth> | undefined,
): ResponsiveValue<number> =>
  map<ColumnWidth, number>(width, (w) => {
    if (w === null) {
      return 1;
    }
    return null;
  });

const getFlexShrink = (
  width: ResponsiveValue<ColumnWidth> | undefined,
): ResponsiveValue<number> =>
  map<ColumnWidth, number>(width, (w) => {
    if (w === 'content') {
      return 1;
    }
    return null;
  });

export const Column: React.FC<ColumnProps> = ({width, children}) => (
  <SpaceContext.Consumer>
    {(space): React.ReactElement => (
      <Box
        flexBasis={getFlexBasis(width)}
        flexGrow={getFlexGrow(width)}
        flexShrink={getFlexShrink(width)}
        paddingLeft={space}
        paddingTop={space}
      >
        {children}
      </Box>
    )}
  </SpaceContext.Consumer>
);

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
