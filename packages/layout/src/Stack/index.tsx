import React from 'react';
import styled from 'styled-components';
import flattenChildren from 'react-keyed-flatten-children';
import {
  createProps,
  ResponsiveValue,
  MediaConstraint,
  map,
  StyleValue,
  ResponsiveMixinFunction,
} from '@substance/style';
import {
  marginBottom,
  SpaceConstraint,
  SpaceMixinFunction,
  display,
} from '@substance/mixin';
import {HiddenProps, Hidden} from '../Hidden';
import {mapProps} from '../utils';

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
  display: ResponsiveMixinFunction<Media, StyleValue<'display'>>;
  Hidden: React.ComponentType<HiddenProps<Media>>;
}

export const createStackLayout = <
  Media extends MediaConstraint,
  Space extends SpaceConstraint
>({
  marginBottom,
  display,
  Hidden,
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
    :last-of-type {
      margin-bottom: 0;
    }
    ${createProps({
      $display: display,
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

        if (process.env.NODE_ENV !== 'production') {
          if (child.type === Hidden && child.props.inline) {
            console.error(
              'Hidden cannot be "inline" when a direct child of Stack.',
            );
          }
        }
        const display =
          child.type === Hidden
            ? mapProps(child.props.hide, (hide) => (hide ? 'none' : 'block'))
            : undefined;

        return (
          <Item
            key={child.key || index}
            $display={display}
            $marginBottom={space}
          >
            {child}
          </Item>
        );
      })}
    </Wrapper>
  );

  return StackLayout;
};

export const StackLayout = createStackLayout({marginBottom, display, Hidden});
