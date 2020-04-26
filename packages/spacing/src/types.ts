import {BreakpointNameConstraint, ResponsiveValueOrMap} from '@substance/breakpoints';

export type SpacingNameConstraint = string | number;
export type SpacingMap<SpacingName extends SpacingNameConstraint> = {[name in SpacingName]: number | string};

export interface SpacingFunction<
  Breakpoint extends BreakpointNameConstraint, 
  SpacingName extends SpacingNameConstraint,
> {
  (value: ResponsiveValueOrMap<Breakpoint, SpacingName>): any; // FIXME: 
}
