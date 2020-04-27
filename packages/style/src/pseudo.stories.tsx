import * as React from 'react';
import styled from 'styled-components';
import {createBreakpoint} from './createBreakpoint';
import {defaultBreakpoints} from './defaultBreakpoints';
import {pseudo} from './pseudo';

export default {title: 'pseudo()'};

const breakpoint = createBreakpoint({breakpoints: defaultBreakpoints});

const Device = styled.div(
  {},
  pseudo(
    ':after',
    {
      padding: `1em`,
    },
    breakpoint('mobile')({
      content: '"📱"',
    }),
    breakpoint('tablet')({
      content: '"💻"',
    }),
    breakpoint('desktop')({
      content: '"🖥"',
    }),
  ),
);

export const Default: React.FC = () => <Device>Device: </Device>;
