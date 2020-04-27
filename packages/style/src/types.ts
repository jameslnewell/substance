import {Properties, Pseudos} from 'csstype';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DefaultTheme {}

export type ThemeProps<Props extends {}, Theme> = Props & {
  theme?: Theme;
};

type CSSProperties = Properties<string | number>;
type CSSPeudoProperties = {[property in Pseudos]?: StyleObject};

export type StyleProperty = keyof CSSProperties;
export type StyleValue = CSSProperties[StyleProperty];
export interface StyleObject extends CSSProperties, CSSPeudoProperties {
  [key: string]: StyleObject | string | number | undefined;
}
export type StyleFunction<Props, Theme> = (
  props: ThemeProps<Props, Theme>,
) => StyleObject;
export type Style<Props, Theme> = StyleObject | StyleFunction<Props, Theme>;

// ========== BREAKPOINTS ==========

export type BreakpointNameConstraint = string | number;
export type BreakpointMap<BreakpointName extends BreakpointNameConstraint> = {
  [name in BreakpointName]: number;
};

export interface BreakpointFunction<
  BreakpointName extends BreakpointNameConstraint,
  Theme
> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (name: BreakpointName): (style: StyleObject) => Style<any, Theme>;
}

export type MapValueConstraint = string | number | boolean;
export type MapValueMap<
  BreakpointName extends BreakpointNameConstraint,
  Value extends MapValueConstraint
> = {[name in BreakpointName]?: Value};
export type MapValueOrMap<
  BreakpointName extends BreakpointNameConstraint,
  Value extends MapValueConstraint
> = Value | MapValueMap<BreakpointName, Value>;

export interface MapFunction<
  BreakpointName extends BreakpointNameConstraint,
  Props,
  Theme = DefaultTheme
> {
  <Value extends MapValueConstraint>(
    values: Value | MapValueMap<BreakpointName, Value>,
    style: (value: Value, props: ThemeProps<Props, Theme>) => StyleObject,
  ): Style<Props, Theme>;
}
