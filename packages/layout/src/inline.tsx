import React from 'react';
import flattenChildren from 'react-keyed-flatten-children';
import {
  map,
  ResponsiveValue,
  MediaConstraint,
  MapFunction,
  createProps,
  styled,
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
  Space extends SpaceConstraint
> {
  map: MapFunction<Media>;
  getSpace: GetSpaceFunction<Space> | ThemedGetSpaceFunction<Space>;
  paddingTop: SpaceMixinFunction<Media, Space>;
  paddingLeft: SpaceMixinFunction<Media, Space>;
}

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

  const Item = styled.div<InlineLayoutProps<Media, Space>>(
    {},
    createProps<{space: ResponsiveValue<Media, Space>}>({
      // FIXME: mixin should be allowed to be optional
      space: [paddingTop, paddingLeft],
    }),
  );

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
  paddingTop,
  paddingLeft,
});
