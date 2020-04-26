import * as React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {defaults, createBreakpoint, createMap} from '.';

export default { title: 'createMap()' };

const staticBreakpoint = createBreakpoint(defaults);
const themedBreakpoint = createBreakpoint((theme) => theme!.breakpoints);

const staticMap = createMap(staticBreakpoint);
const themedMap = createMap(themedBreakpoint);

const square = {
  width: 100,
  height: 100,
  backgroundColor: 'grey'
};

const StaticSquare = styled.div(
  square,
  staticMap({mobile: 'red', tablet: 'green', desktop: 'blue'}, value => ({backgroundColor: value}))
);

const ThemedSquare = styled.div(
  square,
  themedMap({sm: 'red', md: 'green', lg: 'blue'}, value => props => ({backgroundColor: props.theme.colors[value]}))
);

export const Static = () => <StaticSquare/>

export const Themed = () => (
  <ThemeProvider theme={{
    breakpoints: {
      sm: 0,
      md: 757, 
      lg: 1025
    },
    colors: {
      red: 'pink',
      green: 'lime',
      blue: 'skyblue'
    }  
  }}>
    <ThemedSquare/>
  </ThemeProvider>
);
