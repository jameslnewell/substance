import {DefaultTheme} from 'styled-components';
import { BreakpointMap } from './types';
import { defaults, DefaultBreakpointName } from './defaults';
import {createBreakpoint} from './createBreakpoint';

type DefaultThemeBreakpointName = DefaultTheme extends {breakpoints: BreakpointMap<infer BreakpointName>} ? BreakpointName : DefaultBreakpointName;

export const breakpoint = createBreakpoint<DefaultThemeBreakpointName, DefaultTheme>(theme => theme && (theme as any).breakpoints ? (theme as any).breakpoints : defaults);
