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
  // eslint-disable-next-line @typescript-eslint/camelcase
  unstable_mapValueToValue,
} from '@substance/style';
import {
  marginBottom,
  SpaceConstraint,
  SpaceMixinFunction,
  display,
} from '@substance/mixin';
import {Hidden} from '../Hidden';

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
  mixins: {
    display: ResponsiveMixinFunction<Media, StyleValue<'display'>>;
    marginBottom: SpaceMixinFunction<Media, Space>;
  };
  getChildDisplayValue: (
    child: React.ReactElement,
  ) => ResponsiveValue<Media, 'block' | 'none'> | undefined;
}

export const createStackLayout = <
  Media extends MediaConstraint,
  Space extends SpaceConstraint
>({
  mixins: {display, marginBottom},
  getChildDisplayValue,
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
        return (
          <Item
            key={child.key || index}
            $display={getChildDisplayValue(child)}
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

function getChildDisplayValue<Media extends MediaConstraint>(
  child: React.ReactElement,
): ResponsiveValue<Media, 'block' | 'none'> | undefined {
  if (child.type === Hidden) {
    if (process.env.NODE_ENV !== 'production') {
      if (child.props.inline) {
        console.error(
          'Hidden cannot be "inline" when a direct child of Stack.',
        );
      }
    }
    // eslint-disble-next-line @typescript-eslint/camelcase
    return unstable_mapValueToValue<Media, boolean, 'block' | 'none'>(
      child.props.hide,
      (hide) => (hide ? 'none' : 'block'),
    );
  }
  return undefined;
}

export const StackLayout = createStackLayout({
  mixins: {
    marginBottom,
    display,
  },
  getChildDisplayValue,
});
