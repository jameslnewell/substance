import * as React from 'react';
import styled from 'styled-components';
import {
  defaultBreakpoints,
  createBreakpoint,
  createMap,
  createProps,
} from '../..';
import {
  createColor,
  createBackgroundColor,
  createBorderColor,
} from './createColor';

export default {title: 'createColor'};

const colors = {
  green: {
    light: 'lightgreen',
    dark: 'darkgreen',
  },
};

const map = createMap({
  breakpoint: createBreakpoint({breakpoints: defaultBreakpoints}),
});
const color = createColor({map, colors});
const backgroundColor = createBackgroundColor({map, colors});
const borderColor = createBorderColor({map, colors});

const colorProps = createProps({
  _color_: color,
  backgroundColor,
  borderColor,
});

const Box = styled.div({borderWidth: 2, borderStyle: 'solid'}, colorProps);

export const Color = () => <Box _color_="green.dark">Hello World!</Box>;

export const ColorResponsive = () => (
  <Box _color_={{mobile: 'green.light', desktop: 'green.dark'}}>
    Hello World!
  </Box>
);

export const BackgroundColor = () => (
  <Box backgroundColor="green.dark">Hello World!</Box>
);

export const BackgroundColorResponsive = () => (
  <Box backgroundColor={{mobile: 'green.light', desktop: 'green.dark'}}>
    Hello World!
  </Box>
);

export const BorderColor = () => (
  <Box borderColor="green.dark">Hello World!</Box>
);

export const BorderColorResponsive = () => (
  <Box borderColor={{mobile: 'green.light', desktop: 'green.dark'}}>
    Hello World!
  </Box>
);
