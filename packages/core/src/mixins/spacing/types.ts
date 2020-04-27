import { BreakpointNameConstraint, MapValueOrMap, Style } from "../../types";

export type SpacingNameConstraint = string | number;
export type SpacingMap<SpacingName extends SpacingNameConstraint> = {[name in SpacingName]: number | string};

export interface SpacingFunction<
  Breakpoint extends BreakpointNameConstraint, 
  SpacingName extends SpacingNameConstraint,
  Theme
> {
  (value: MapValueOrMap<Breakpoint, SpacingName>): Style<Theme>;
}
