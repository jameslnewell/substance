import * as React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {createProps} from '../../createProps';
import {theme} from '../../story-theme';
import {color, backgroundColor} from '.';

export default {title: 'style/themed color'};

const paddingProps = createProps({
  color,
  backgroundColor,
});

const Box = styled.div({}, paddingProps);

export const Color = () => (
  <ThemeProvider theme={theme}>
    <Box color="green.light">Hello World!</Box>
  </ThemeProvider>
);

export const BackgroundColor = () => (
  <ThemeProvider theme={theme}>
    <Box backgroundColor="green.dark">Hello World!</Box>
  </ThemeProvider>
);
