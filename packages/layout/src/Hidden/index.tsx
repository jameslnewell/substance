import React from 'react';
import styled from 'styled-components';
import {
  MediaConstraint,
  ResponsiveValue,
  ResponsiveMixinFunction,
  StyleValue,
  createProps,
  // eslint-disable-next-line @typescript-eslint/camelcase
  unstable_mapValueToValue,
} from '@substance/style';
import {display} from '@substance/mixin';

export interface HiddenProps<Media extends MediaConstraint> {
  hide?: ResponsiveValue<Media, boolean>;
  inline?: boolean;
}

export interface CreateHiddenOptions<Media extends MediaConstraint> {
  mixins: {
    display: ResponsiveMixinFunction<Media, StyleValue<'display'>>;
  };
}

export function createHidden<Media extends MediaConstraint>({
  mixins: {display},
}: CreateHiddenOptions<Media>) {
  const Wrapper = styled.div`
    ${createProps({$display: display})}
  `;

  const Hidden: React.FC<HiddenProps<Media>> = ({
    hide,
    inline,
    children,
    ...otherProps
  }) => (
    <Wrapper
      {...otherProps}
      // eslint-disable-next-line @typescript-eslint/camelcase
      $display={unstable_mapValueToValue(hide, (isHidden) =>
        isHidden ? 'none' : inline ? 'inline' : 'block',
      )}
      as={inline ? 'span' : 'div'}
    >
      {children}
    </Wrapper>
  );

  return Hidden;
}

export const Hidden = createHidden({mixins: {display}});
