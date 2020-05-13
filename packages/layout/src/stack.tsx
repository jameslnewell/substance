import React from 'react';
import styled from 'styled-components';
import flattenChildren from 'react-keyed-flatten-children';
import {createProps, ResponsiveValue, MediaConstraint} from '@substance/style';
import {
  marginBottom,
  SpaceConstraint,
  SpaceMixinFunction,
} from '@substance/mixin';

export interface StackLayoutProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  space?: ResponsiveValue<Media, Space>;
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
  const Item = styled.div(
    {
      ':last-child': {
        marginBottom: 0,
      },
    },
    createProps({
      marginBottom,
    }),
  );

  const StackLayout: React.FC<StackLayoutProps<Media, Space>> = ({
    space,
    children,
    ...otherProps
  }) => (
    <div {...otherProps}>
      {flattenChildren(children).map((child, index) => {
        if (!React.isValidElement(child)) {
          return child;
        }
        return (
          <Item key={child.key || index} marginBottom={space}>
            {child}
          </Item>
        );
      })}
    </div>
  );

  return StackLayout;
};

export const StackLayout = createStackLayout({marginBottom});
