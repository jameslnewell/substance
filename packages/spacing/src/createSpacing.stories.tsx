import * as React from 'react';
import styled from 'styled-components';
import {createProps} from '@substance/core';
import { defaults as breakpointDefaults, createBreakpoint, createMap } from '@substance/breakpoints';
import {createPadding, defaults as spacingDefaults} from '.';
import { createPaddingX } from './createSpacing';

export default { title: 'create spacing' };

const staticBreakpoint = createBreakpoint(breakpointDefaults);
// const themedBreakpoint = createBreakpoint((theme) => theme!.breakpoints);

const staticMap = createMap(staticBreakpoint);
// const themedMap = createMap(themedBreakpoint);

const staticPadding = createPadding(staticMap, spacingDefaults);
const staticPaddingX = createPaddingX(staticMap, spacingDefaults);
// const themedPadding = createPadding(themedMap, spacingDefaults);

const paddingProps = createProps({
  padding: staticPadding,
  paddingX: staticPaddingX
});

type PaddingProps = Parameters<typeof paddingProps>[0];

const square = {
  width: 100,
  height: 100,
  backgroundColor: 'grey'
};

const StaticSquare = styled.div<PaddingProps>(
  square,
  paddingProps
);

// const ThemedSquare = styled.div(
//   square,
//   themedBreakpoint('sm')({
//     backgroundColor: 'red'
//   }),
//   themedBreakpoint('md')({
//     backgroundColor: 'green'
//   }),
//   themedBreakpoint('lg')({
//     backgroundColor: 'blue'
//   })
// );

export const Static = () => <StaticSquare padding={{mobile: 'xs', tablet: 'md', desktop: 'lg'}}/>

// export const Themed = () => (
//   <ThemeProvider theme={{
//     breakpoints: {
//       sm: 0,
//       md: 757, 
//       lg: 1025
//     },
//     colors: {
//       red: 'pink',
//       green: 'lime',
//       blue: 'skyblue'
//     } 
//   }}>
//     <ThemedSquare/>
//   </ThemeProvider>
// );
