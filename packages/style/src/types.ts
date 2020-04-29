import {Properties, Pseudos} from 'csstype';

// ========== PROPS ==========

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type PropsConstraint = {};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DefaultProps {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ThemeConstraint = any;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DefaultTheme {}

export type ThemeProps<
  Props extends PropsConstraint,
  Theme extends ThemeConstraint
> = Props & {
  theme?: Theme;
};

// ========== STYLE ==========

type CSSProperties = Properties<string | number>;
type CSSPeudoProperties = {[property in Pseudos]?: StyleObject};

export type StyleProperty = keyof CSSProperties;
export type StyleValue = CSSProperties[StyleProperty];
export interface StyleObject extends CSSProperties, CSSPeudoProperties {
  [key: string]: StyleObject | string | number | undefined;
}
export type StyleFunction<Props, Theme extends ThemeConstraint> = (
  props: ThemeProps<Props, Theme>,
) => StyleObject;
export type Style<Props, Theme extends ThemeConstraint> =
  | StyleObject
  | StyleFunction<Props, Theme>;

// ========== MEDIA ==========

export type MediaConstraint = string | number;

export type MediaQueries<Media extends MediaConstraint> = {
  [name in Media]: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValueConstraint = any;
export type ResponsiveValueConstraint = string | number | boolean;
export type ResponsiveValues<
  Media extends MediaConstraint,
  Value extends ResponsiveValueConstraint
> = {[name in Media]?: Value};

// ========== MATCH MEDIA ==========

export interface MatchFunction<
  Media extends MediaConstraint,
  Theme extends ThemeConstraint
> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (media: Media): (style: StyleObject) => Style<{}, Theme>;
}

// ========== MAP MEDIA ==========

export interface MapStyleFunction<
  Value extends ResponsiveValueConstraint,
  Props extends PropsConstraint = DefaultProps,
  Theme extends ThemeConstraint = DefaultTheme
> {
  (value: Value, props: ThemeProps<Props, Theme>): StyleObject;
}

export interface MapFunction<
  Media extends MediaConstraint,
  Theme extends ThemeConstraint = DefaultTheme
> {
  <
    Value extends ResponsiveValueConstraint,
    Props extends PropsConstraint = DefaultProps
  >(
    values: Value | ResponsiveValues<Media, Value>,
    style: MapStyleFunction<Value, Props, Theme>,
  ): Style<Props, Theme>;
}

// ========== MIXIN ==========

export interface MixinFunction<Value extends ValueConstraint> {
  <
    Props extends PropsConstraint = DefaultProps,
    Theme extends ThemeConstraint = DefaultTheme
  >(
    value: Value,
  ): Style<Props, Theme>;
}

export interface ResponsiveMixinFunction<
  Media extends MediaConstraint,
  Value extends ResponsiveValueConstraint
> {
  <
    Props extends PropsConstraint = DefaultProps,
    Theme extends ThemeConstraint = DefaultTheme
  >(
    valueOrValues: Value | ResponsiveValues<Media, Value>,
  ): Style<Props, Theme>;
}
