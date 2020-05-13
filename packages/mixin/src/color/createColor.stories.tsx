import * as React from 'react';
import styled from 'styled-components';
import {queries, createMatch, createMap, createProps} from '@substance/style';
import {
  createColor,
  createBackgroundColor,
  createBorderColor,
  createGetColor,
} from '.';

export default {title: 'mixin/createColor'};

const defaultColors = {
  green: {
    light: 'lightgreen',
    dark: 'darkgreen',
  },
};

const map = createMap(createMatch(queries));
const getColor = createGetColor(defaultColors);
const color = createColor({map, getColor});
const backgroundColor = createBackgroundColor({map, getColor});
const borderColor = createBorderColor({map, getColor});

const colorProps = createProps({
  fg: color,
  bg: backgroundColor,
  borderColor,
});

const Box = styled.div({borderWidth: 2, borderStyle: 'solid'}, colorProps);

export const Color = () => <Box fg="green.dark">Hello World!</Box>;

export const ColorResponsive = () => (
  <Box fg={{mobile: 'green.light', desktop: 'green.dark'}}>Hello World!</Box>
);

export const BackgroundColor = () => <Box bg="green.dark">Hello World!</Box>;

export const BackgroundColorResponsive = () => (
  <Box fg={{mobile: 'green.light', desktop: 'green.dark'}}>Hello World!</Box>
);

export const BorderColor = () => (
  <Box borderColor="green.dark">Hello World!</Box>
);

export const BorderColorResponsive = () => (
  <Box borderColor={{mobile: 'green.light', desktop: 'green.dark'}}>
    Hello World!
  </Box>
);
