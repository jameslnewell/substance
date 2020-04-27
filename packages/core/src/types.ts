import {Properties, Pseudos} from 'csstype';
import {CSSObject} from 'styled-components'

export interface ThemeProps<Theme> {
  theme?: Theme;
}

type CSSProperties = Properties<string | number>;
type CSSPeudoProperties = { [property in Pseudos]?: StyleObject };

export type StyleProperty = keyof CSSProperties;
export type StyleValue = CSSProperties[StyleProperty];
export interface StyleObject extends CSSProperties, CSSPeudoProperties {
  [key: string]: StyleObject | string | number | undefined;
}
export type StyleFunction<Theme> = (props: ThemeProps<Theme>) => StyleObject;
export type Style<Theme> = StyleObject | StyleFunction<Theme>;

// ========== BREAKPOINTS ==========

export type BreakpointNameConstraint = string | number;
export type BreakpointMap<BreakpointName extends BreakpointNameConstraint> = {
  [name in BreakpointName]: number;
};

export interface BreakpointFunction<BreakpointName extends BreakpointNameConstraint, Theme> {
  (name: BreakpointName): (style: StyleObject) => Style<Theme>;
}

export type MapValueConstraint = string | number | boolean;
export type MapValueMap<BreakpointName extends BreakpointNameConstraint, Value extends MapValueConstraint> = {[name in BreakpointName]?: Value};
export type MapValueOrMap<BreakpointName extends BreakpointNameConstraint, Value extends MapValueConstraint> = Value | MapValueMap<BreakpointName, Value>; 

export interface MapFunction<BreakpointName extends BreakpointNameConstraint, Theme> {
  <Value extends MapValueConstraint>(
    values: Value | MapValueMap<BreakpointName, Value>, 
    style: (value: Value, props: ThemeProps<Theme>) => StyleObject
  ): Style<Theme>;
}

