import {BreakpointMap} from './types';

export type DefaultBreakpointName = 'mobile' | 'tablet' | 'desktop';

export const defaultBreakpoints: BreakpointMap<DefaultBreakpointName> = {
  mobile: 0,
  tablet: 737,
  desktop: 1025,
};
