import React from 'react';
import styled from 'styled-components';
import flattenChildren from 'react-keyed-flatten-children';
import {
  createProps,
  ResponsiveValues,
  MediaConstraint,
  ThemeConstraint,
  DefaultTheme,
} from '@substance/style';
import {
  marginBottom,
  SpaceConstraint,
  SpaceMixinFunction,
} from '@substance/style/mixins';

export interface StackLayoutProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  space?: Space | ResponsiveValues<Media, Space>;
}

export interface CreateStackLayoutOptions<
  Media extends MediaConstraint,
  Space extends SpaceConstraint,
  Theme extends ThemeConstraint = DefaultTheme
> {
  marginBottom: SpaceMixinFunction<Media, Space, Theme>;
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
  }) => (
    <div>
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
