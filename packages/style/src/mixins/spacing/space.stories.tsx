import * as React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {createProps} from '../../createProps';
import {theme} from '../../story-theme';
import {square} from '../../story-styles';
import {padding, paddingX} from '.';

export default {title: 'style/themed spacing'};

const paddingProps = createProps({
  padding,
  paddingX,
});

const Square = styled.div(square, paddingProps);

export const Padding = () => (
  <ThemeProvider theme={theme}>
    <Square padding={{sm: 1, md: 2, lg: 3}} />
  </ThemeProvider>
);

export const PaddingX = () => (
  <ThemeProvider theme={theme}>
    <Square paddingX={{sm: 1, md: 2, lg: 3}} />
  </ThemeProvider>
);
