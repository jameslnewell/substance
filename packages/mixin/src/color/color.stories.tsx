import * as React from 'react';
import styled from 'styled-components';
import {createProps} from '@substance/style';
import {color, backgroundColor} from '.';

export default {title: 'mixin/themed color'};

const paddingProps = createProps({
  color,
  backgroundColor,
});

const Box = styled.div({}, paddingProps);

export const Color = () => <Box color="green.light">Hello World!</Box>;

export const BackgroundColor = () => (
  <Box backgroundColor="green.dark">Hello World!</Box>
);
