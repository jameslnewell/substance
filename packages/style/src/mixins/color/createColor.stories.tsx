import * as React from 'react';
import styled from 'styled-components';
import {defaultMedia, createMatch, createMap, createProps} from '../..';
import {
  createColor,
  createBackgroundColor,
  createBorderColor,
} from './createColor';

export default {title: 'createColor'};

const defaultColor = {
  green: {
    light: 'lightgreen',
    dark: 'darkgreen',
  },
};

const map = createMap({
  match: createMatch({media: defaultMedia}),
});
const color = createColor({map, color: defaultColor});
const backgroundColor = createBackgroundColor({map, color: defaultColor});
const borderColor = createBorderColor({map, color: defaultColor});

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
