import React from 'react';

export type TilesAlignment = 'left' | 'center' | 'right';

export interface TilesLayoutProps {
  columns?: ResponsiveValue<number>;
  space?: ResponsiveValue<Space>;
  align?: ResponsiveValue<TilesAlignment>;
}

const getJustifyContent = (
  align: ResponsiveValue<TilesAlignment> | undefined,
): ResponsiveValue<string> =>
  map<TilesAlignment, string>(align, (a) => {
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

const getFlex = (
  columns: ResponsiveValue<number> | undefined,
): ResponsiveValue<number> => map(columns, (c) => (c === null ? 1 : null));

const getBasis = (
  columns: ResponsiveValue<number> | undefined,
): ResponsiveValue<string> =>
  map(columns, (c) => (c !== null ? `${(1 / c) * 100}%` : null));

const getMargin = (
  space: ResponsiveValue<Space> | undefined,
): ResponsiveValue<number> => map(space, (s) => (s ? -1 * s : null));

const getPadding = (
  space: ResponsiveValue<Space> | undefined,
): ResponsiveValue<Space> => map(space, (s) => s);

export const TilesLayout: React.FC<TilesLayoutProps> = ({
  columns,
  space,
  align,
  children,
}) => (
  <Box
    display="flex"
    flexWrap="wrap"
    justifyContent={getJustifyContent(align)}
    marginTop={getMargin(space)}
    marginLeft={getMargin(space)}
  >
    {React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return child;
      }
      return (
        <Box
          paddingTop={getPadding(space)}
          paddingLeft={getPadding(space)}
          flexGrow={getFlex(columns)}
          flexShrink={getFlex(columns)}
          flexBasis={getBasis(columns)}
        >
          {child}
        </Box>
      );
    })}
  </Box>
);
