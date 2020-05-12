import React from 'react';
import styled from 'styled-components';
import {
  StyleValue,
  Theme,
  MediaConstraint,
  ResponsiveValue,
} from '@substance/style';
import {SpaceMixinFunction, SpaceConstraint, paddingX} from '@substance/mixin';

export interface GetContainerWidth {
  (theme: Theme): StyleValue<'width'>;
}

export interface GetContainerSpace<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> {
  (theme: Theme): ResponsiveValue<Media, Space>;
}

export function createContainerLayout<
  Media extends MediaConstraint,
  Space extends SpaceConstraint,
  Props
>({
  width,
  space,
  paddingX,
}: {
  width: number | GetContainerWidth;
  space?: ResponsiveValue<Media, Space> | GetContainerSpace<Media, Space>;
  paddingX: SpaceMixinFunction<Media, Space, Props>;
}) {
  const Wrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    margin: auto;
    ${typeof width === 'function'
      ? ({theme}) => ({maxWidth: width(theme)})
      : {maxWidth: width}}
    ${typeof space === 'function'
      ? ({theme}) => paddingX(space(theme))
      : (space && paddingX(space)) || undefined}
  `;
  const ContainerLayout: React.FC = ({children, ...otherProps}) => (
    <Wrapper {...otherProps}>{children}</Wrapper>
  );
  return ContainerLayout;
}

export const ContainerLayout = createContainerLayout({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  width: (theme) => (theme && (theme as any)?.container?.width) || 1200,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  space: (theme) => theme && (theme as any)?.container?.space,
  paddingX,
});
