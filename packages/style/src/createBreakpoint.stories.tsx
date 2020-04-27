import * as React from 'react';
import styled from 'styled-components';
import {defaultBreakpoints} from './defaultBreakpoints';
import {createBreakpoint} from './createBreakpoint';
import {square} from './story-styles';

export default {title: 'createBreakpoint()'};

const breakpoint = createBreakpoint({breakpoints: defaultBreakpoints});

const Square = styled.div(
  square,
  breakpoint('mobile')({
    backgroundColor: 'red',
  }),
  breakpoint('tablet')({
    backgroundColor: 'green',
  }),
  breakpoint('desktop')({
    backgroundColor: 'blue',
  }),
);

export const Default = () => <Square />;
