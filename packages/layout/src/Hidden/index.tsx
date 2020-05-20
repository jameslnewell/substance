import React from 'react';
import styled from 'styled-components';
import {
  MediaConstraint,
  ResponsiveValue,
  MapFunction,
  map,
} from '@substance/style';

export interface HiddenProps<Media extends MediaConstraint> {
  hide?: ResponsiveValue<Media, boolean>;
  inline?: boolean;
}

interface WrapperProps<Media extends MediaConstraint> {
  $hide?: HiddenProps<Media>['hide'];
  $inline?: HiddenProps<Media>['inline'];
}

export interface CreateHiddenOptions<Media extends MediaConstraint> {
  map: MapFunction<Media>;
}

export function createHidden<Media extends MediaConstraint>({
  map,
}: CreateHiddenOptions<Media>) {
  // TODO: add support for $inline being responsive
  const Wrapper = styled.div<WrapperProps<Media>>`
    ${({$hide, $inline = false}) => {
      if ($hide === undefined) {
        return;
      }
      return map(
        $hide,
        (isHidden) =>
          `display: ${isHidden ? 'none' : $inline ? 'inline' : 'block'};`,
      );
    }}
  `;

  const Hidden: React.FC<HiddenProps<Media>> = ({
    hide,
    inline,
    children,
    ...otherProps
  }) => (
    <Wrapper
      {...otherProps}
      $hide={hide}
      $inline={inline}
      as={inline ? 'span' : 'div'}
    >
      {children}
    </Wrapper>
  );

  return Hidden;
}

export const Hidden = createHidden({map});
