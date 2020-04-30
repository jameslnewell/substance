import React from 'react';
import styled from 'styled-components';

// TODO: width prop can be static or fn to get width from theme
export const createContainer = ({width = 1200}: {width?: number} = {}) => {
  const Wrapper = styled.div({
    margin: 'auto',
    width: width,
    maxWidth: '100%',
  });
  const Container: React.FC = ({children}) => <Wrapper>{children}</Wrapper>;
  return Container;
};

export const Container = createContainer();
