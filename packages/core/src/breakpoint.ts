import {DefaultTheme} from 'styled-components';
import { BreakpointMap } from './types';
import { defaultBreakpoints, DefaultBreakpointName } from './defaultBreakpoints';
import {createBreakpoint} from './createBreakpoint';

type DefaultThemeBreakpointName = DefaultTheme extends {breakpoints: BreakpointMap<infer BreakpointName>} ? BreakpointName : DefaultBreakpointName;

export const breakpoint = createBreakpoint<DefaultThemeBreakpointName, DefaultTheme>({
  breakpoints: theme => {
    const breakoints = (theme as any)?.breakpoints
    if (breakoints) {
      return breakoints;
    }
    return defaultBreakpoints;
  }
});
