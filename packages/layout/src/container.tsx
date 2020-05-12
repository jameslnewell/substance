import React from 'react';
import styled from 'styled-components';
import {StyleValue, Theme} from '@substance/style';

export interface GetContainerWidth<> {
  (theme: Theme): StyleValue<'width'>;
}

export function createContainerLayout({
  width,
}: {
  width: number | GetContainerWidth;
}) {
  const Wrapper = styled.div(
    {
      margin: 'auto',
      width: '100%',
    },
    typeof width === 'function'
      ? ({theme}) => ({maxWidth: width(theme)})
      : {maxWidth: width},
  );
  const ContainerLayout: React.FC = ({children, ...otherProps}) => (
    <Wrapper {...otherProps}>{children}</Wrapper>
  );
  return ContainerLayout;
}

export const ContainerLayout = createContainerLayout({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  width: (theme) => (theme && (theme as any)?.container?.width) || 1200,
});
