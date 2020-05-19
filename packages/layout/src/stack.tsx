import React from 'react';
import styled, {css} from 'styled-components';
import flattenChildren from 'react-keyed-flatten-children';
import {
  createProps,
  ResponsiveValue,
  MediaConstraint,
  map,
} from '@substance/style';
import {
  marginBottom,
  SpaceConstraint,
  SpaceMixinFunction,
} from '@substance/mixin';

export type StackLayoutAlignment = 'left' | 'center' | 'right';

const alignment = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

export interface StackLayoutProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  space?: ResponsiveValue<Media, Space>;
  align?: ResponsiveValue<Media, StackLayoutAlignment>;
  className?: string;
}

export interface CreateStackLayoutOptions<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  marginBottom: SpaceMixinFunction<Media, Space>;
}

export const createStackLayout = <
  Media extends MediaConstraint,
  Space extends SpaceConstraint
>({
  marginBottom,
}: CreateStackLayoutOptions<Media, Space>) => {
  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    ${createProps({
      $align: (align: ResponsiveValue<Media, StackLayoutAlignment>) =>
        map(
          align,
          (a) => `
        align-items: ${alignment[a]};
      `,
        ),
    })}
  `;

  const Item = styled.div`
    :last-child {
      margin-bottom: 0;
    }
    ${createProps({
      $marginBottom: marginBottom,
    })}
  `;

  const StackLayout: React.FC<StackLayoutProps<Media, Space>> = ({
    align,
    space,
    children,
    ...otherProps
  }) => (
    <Wrapper {...otherProps} $align={align}>
      {flattenChildren(children).map((child, index) => {
        if (!React.isValidElement(child)) {
          return child;
        }
        return (
          <Item key={child.key || index} $marginBottom={space}>
            {child}
          </Item>
        );
      })}
    </Wrapper>
  );

  return StackLayout;
};

export const StackLayout = createStackLayout({marginBottom});
