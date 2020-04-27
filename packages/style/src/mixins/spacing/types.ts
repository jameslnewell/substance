import {
  BreakpointNameConstraint,
  MapValueOrMap,
  Style,
  DefaultTheme,
} from '../../types';

export type SpacingNameConstraint = string | number;
export type SpacingMap<SpacingName extends SpacingNameConstraint> = {
  [name in SpacingName]: number | string;
};

export interface SpacingFunction<
  Breakpoint extends BreakpointNameConstraint,
  SpacingName extends SpacingNameConstraint,
  Props,
  Theme = DefaultTheme
> {
  (value: MapValueOrMap<Breakpoint, SpacingName>): Style<Props, Theme>;
}
