import React from 'react';
import styled from 'styled-components';
import flattenChildren from 'react-keyed-flatten-children';
import {
  map,
  ResponsiveValue,
  MediaConstraint,
  MapFunction,
  ThemeConstraint,
  DefaultTheme,
} from '@substance/style';
import {SpaceConstraint, getSpace, GetSpaceFunction} from '@substance/mixin';
import {createSpaceStyles} from './styles';

export type InlineLayoutAlignment = 'left' | 'center' | 'right';

export interface InlineLayoutProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  align?: ResponsiveValue<Media, InlineLayoutAlignment>;
  space?: ResponsiveValue<Media, Space>;
  className?: string;
}

export interface CreateInlineLayoutOptions<
  Media extends MediaConstraint,
  Space extends SpaceConstraint,
  Theme extends ThemeConstraint = DefaultTheme
> {
  map: MapFunction<Media>;
  getSpace: GetSpaceFunction<Space, Theme>;
}

export const createInlineLayout = <
  Media extends MediaConstraint,
  Space extends SpaceConstraint
>({
  map,
  getSpace,
}: CreateInlineLayoutOptions<Media, Space>) => {
  const styles = createSpaceStyles<Media, Space>({
    map,
    getSpace,
  });

  const Wrapper = styled.div<InlineLayoutProps<Media, Space>>(
    {},
    styles.wrapper,
  );

  const Container = styled.div<InlineLayoutProps<Media, Space>>(
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
              alignItems: 'flex-start',
            };
          case 'center':
            return {
              alignItems: 'center',
            };
          case 'right':
            return {
              alignItems: 'flex-end',
            };
        }
      }),
    styles.container,
  );

  const Item = styled.div<InlineLayoutProps<Media, Space>>({}, ({space}) => {
    if (space === undefined) {
      return;
    }
    return map(space, (s) => {
      const value = getSpace(s);
      return {
        paddingTop: value,
        paddingLeft: value,
      };
    });
  });

  const InlineLayout: React.FC<InlineLayoutProps<Media, Space>> = ({
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
            <Item key={child.key || index} space={space}>
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
});
