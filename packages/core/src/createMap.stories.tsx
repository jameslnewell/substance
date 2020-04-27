import * as React from 'react';
import styled from 'styled-components';
import {defaultBreakpoints} from './defaultBreakpoints';
import {createBreakpoint} from './createBreakpoint';
import {createMap} from './createMap';
import {square} from './story-styles';

export default { title: 'createMap()' };

const breakpoint = createBreakpoint({breakpoints: defaultBreakpoints});
const map = createMap(breakpoint);

const colors = {
  red: 'pink',
  green: 'lime',
  blue: 'skyblue'
};

const Square = styled.div(
  square,
  map(
    {
      mobile: 'red', 
      tablet: 'green', 
      desktop: 'blue'
    }, 
    value => ({backgroundColor: colors[value]})
  )
);

export const Default = () => <Square/>
