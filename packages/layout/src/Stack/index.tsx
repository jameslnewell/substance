import React from 'react';
import styled from 'styled-components';
import flattenChildren from 'react-keyed-flatten-children';
import {
  createProps,
  ResponsiveValue,
  MediaConstraint,
  StyleValue,
  ResponsiveMixinFunction,
  // eslint-disable-next-line @typescript-eslint/camelcase
  unstable_mapValueToValue,
} from '@substance/style';
import {
  alignItems,
  marginBottom,
  SpaceConstraint,
  SpaceMixinFunction,
  display,
  MixinFunction,
} from '@substance/mixin';
import {Hidden} from '../Hidden';
import {ResponsiveAlignX, mapAlignX} from '../utils/alignment';

export interface StackLayoutProps<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  alignX?: ResponsiveAlignX<Media>;
  spaceY?: ResponsiveValue<Media, Space>;
  className?: string;
}

export interface CreateStackLayoutOptions<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  alignItems: MixinFunction<Media, 'align-items'>;
  display: ResponsiveMixinFunction<Media, StyleValue<'display'>>;
  marginBottom: SpaceMixinFunction<Media, Space>;
  getChildDisplayValue: (
    child: React.ReactElement,
  ) => ResponsiveValue<Media, 'block' | 'none'> | undefined;
}

export const createStackLayout = <
  Media extends MediaConstraint,
  Space extends SpaceConstraint
>({
  display,
  alignItems,
  marginBottom,
  getChildDisplayValue,
}: CreateStackLayoutOptions<Media, Space>) => {
  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    ${createProps({
      $alignItems: alignItems,
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
    alignX,
    spaceY,
    children,
    ...otherProps
  }) => (
    <Wrapper {...otherProps} $alignItems={mapAlignX(alignX)}>
      {flattenChildren(children).map((child, index) => {
        if (!React.isValidElement(child)) {
          return child;
        }
        return (
          <Item
            key={child.key || index}
            $display={getChildDisplayValue(child)}
            $marginBottom={spaceY}
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
  display,
  alignItems,
  marginBottom,
  getChildDisplayValue,
});
