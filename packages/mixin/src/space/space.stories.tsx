import * as React from 'react';
import styled from 'styled-components';
import {createProps} from '@substance/style';
import {square} from '@substance/style/src/__stories__';
import {padding, paddingX} from '.';

export default {title: 'mixin/themed spacing'};

const paddingProps = createProps({
  padding,
  paddingX,
});

const Square = styled.div(square, paddingProps);

export const Padding = () => <Square padding={{sm: 1, md: 2, lg: 3}} />;

export const PaddingX = () => <Square paddingX={{sm: 1, md: 2, lg: 3}} />;
