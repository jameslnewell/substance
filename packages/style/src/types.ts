import {Properties} from 'csstype';
import {CSSFunction, Interpolation} from './styled/types';

// ========== STYLE ==========

type CSSProperties = Properties<string | number>;

export type StyleProperty = keyof CSSProperties;
export type StyleValue<
  Property extends StyleProperty = StyleProperty
> = CSSProperties[Property];

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

export interface MatchFunction<Media extends MediaConstraint> {
  (media: Media): CSSFunction;
}

// ========== MAP MEDIA ==========

export interface MapFunctionFunction<
  Value extends ResponsiveValueConstraint,
  Props
> {
  (value: Value): Interpolation<Props>;
}

export interface MapFunction<Media extends MediaConstraint> {
  <Value extends ResponsiveValueConstraint, Props>(
    valueOrValues: ResponsiveValue<Media, Value>,
    fn: MapFunctionFunction<Value, Props>,
  ): Interpolation<Props>;
}

// ========== MIXIN ==========

export interface MixinFunction<Value extends ValueConstraint, Props> {
  (value: Value): Interpolation<Props>;
}

export interface ResponsiveMixinFunction<
  Media extends MediaConstraint,
  Value extends ResponsiveValueConstraint,
  Props
> {
  (valueOrValues: ResponsiveValue<Media, Value>): Interpolation<Props>;
}
