import * as React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {defaults, createBreakpoint} from '.';

export default { title: 'createGreaterThan()' };

const staticBreakpoint = createBreakpoint(defaults);
const themedBreakpoint = createBreakpoint((theme) => theme!.breakpoints);

const square = {
  width: 100,
  height: 100,
  backgroundColor: 'grey'
};

const StaticSquare = styled.div(
  square,
  staticBreakpoint('mobile')({
    backgroundColor: 'red'
  }),
  staticBreakpoint('tablet')({
    backgroundColor: 'green'
  }),
  staticBreakpoint('desktop')({
    backgroundColor: 'blue'
  })
);

const ThemedSquare = styled.div(
  square,
  themedBreakpoint('sm')({
    backgroundColor: 'red'
  }),
  themedBreakpoint('md')({
    backgroundColor: 'green'
  }),
  themedBreakpoint('lg')({
    backgroundColor: 'blue'
  })
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
