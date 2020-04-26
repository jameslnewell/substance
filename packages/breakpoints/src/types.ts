import {CSSObject, DefaultTheme, ThemeProps} from 'styled-components';

interface ThemedStyleFunction<Theme = DefaultTheme> {
  (props: ThemeProps<Theme>): CSSObject;
}

type Style<Theme = DefaultTheme> = CSSObject | ThemedStyleFunction<Theme>;

export type BreakpointNameConstraint = string | number;
export type BreakpointMap<BreakpointName extends BreakpointNameConstraint> = {
  [name in BreakpointName]: number;
};

export type ResponsiveValueConstraint = string | number | boolean;
export type ResponsiveValueMap<BreakpointName extends BreakpointNameConstraint, Value extends ResponsiveValueConstraint> = {[name in BreakpointName]?: Value};
export type ResponsiveValueOrMap<BreakpointName extends BreakpointNameConstraint, Value extends ResponsiveValueConstraint> = Value | ResponsiveValueMap<BreakpointName, Value>; 

export interface BreakpointFunction<BreakpointName extends BreakpointNameConstraint, Theme = DefaultTheme> {
  (name: BreakpointName): (style: CSSObject) => Style<Theme>;
}

export interface MapFunction<BreakpointName extends BreakpointNameConstraint, Theme = DefaultTheme> {
  <Value extends ResponsiveValueConstraint>(values: Value | ResponsiveValueMap<BreakpointName, Value>, style: (value: Value) => Style<Theme>): Style<Theme>;
}
