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

export type PropsWithTheme<
  Props extends PropsConstraint,
  Theme extends ThemeConstraint
> = Props & {
  theme: Theme;
};

// ========== STYLE ==========

type CSSProperties = Properties<string | number>;
type CSSPeudoProperties = {[property in Pseudos]?: StyleObject};

export type StyleProperty = keyof CSSProperties;
export type StyleValue<
  Property extends StyleProperty = StyleProperty
> = CSSProperties[Property];
export interface StyleObject extends CSSProperties, CSSPeudoProperties {
  [key: string]: StyleObject | string | number | undefined;
}

export type StyleFunction<Props extends PropsConstraint> = (
  props: Props,
) => Style<Props>;

export type Style<Props extends PropsConstraint> =
  | undefined
  | StyleObject
  | StyleFunction<Props>
  | Array<Style<Props>>;

// ========== FLAT STYLE =========

export type FlatStyleFunction<Props extends PropsConstraint> = (
  props: Props,
) => undefined | StyleObject;

export type FlatStyle<Props extends PropsConstraint> =
  | undefined
  | StyleObject
  | FlatStyleFunction<Props>;

// ========== MEDIA ==========

export type MediaConstraint = string | number;

export type MediaQueries<Media extends MediaConstraint> = {
  [name in Media]: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValueConstraint = any;
export type ResponsiveValueConstraint = string | number | boolean | undefined;
export type ResponsiveValue<
  Media extends MediaConstraint,
  Value extends ResponsiveValueConstraint
> = Value | {[name in Media]?: Value};

// ========== MATCH MEDIA ==========

export interface MatchFunction<
  Media extends MediaConstraint,
  Theme extends ThemeConstraint = DefaultTheme
> {
  <Props extends PropsConstraint = DefaultProps>(media: Media): (
    style: FlatStyle<PropsWithTheme<Props, Theme>>,
  ) => FlatStyle<PropsWithTheme<Props, Theme>>;
}

// ========== MAP MEDIA ==========

export interface MapFunctionFunction<
  Value extends ResponsiveValueConstraint,
  Theme extends ThemeConstraint = DefaultTheme,
  Props extends PropsConstraint = DefaultProps
> {
  (value: Value): FlatStyle<PropsWithTheme<Props, Theme>>;
}

type MapFunctionReturnValue<
  Theme extends ThemeConstraint = DefaultTheme,
  Props extends PropsConstraint = DefaultProps
> =
  | FlatStyle<PropsWithTheme<Props, Theme>>
  | ((
      props: PropsWithTheme<Props, Theme>,
    ) => FlatStyle<PropsWithTheme<Props, Theme>>[]);

export interface MapFunction<
  Media extends MediaConstraint,
  Theme extends ThemeConstraint = DefaultTheme
> {
  <
    Value extends ResponsiveValueConstraint,
    Props extends PropsConstraint = DefaultProps
  >(
    valueOrValues: ResponsiveValue<Media, Value>,
    fn: MapFunctionFunction<Value, Theme, Props>,
  ): MapFunctionReturnValue<Theme, Props>;
}

// ========== MIXIN ==========

export interface MixinFunction<Value extends ValueConstraint> {
  <Props extends PropsConstraint = DefaultProps>(value: Value): Style<Props>;
}

export interface ResponsiveMixinFunction<
  Media extends MediaConstraint,
  Value extends ResponsiveValueConstraint,
  Theme extends ThemeConstraint = DefaultTheme,
  Props extends PropsConstraint = DefaultProps
> {
  (valueOrValues: ResponsiveValue<Media, Value>): MapFunctionReturnValue<
    Theme,
    Props
  >;
}
