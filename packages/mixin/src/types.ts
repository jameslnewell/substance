import {
  MediaConstraint,
  ResponsiveMixinFunction,
  ResponsiveValue,
  StyleProperty,
  StyleValue,
} from '@substance/style';

export type MixinFunction<
  Media extends MediaConstraint,
  Property extends StyleProperty = StyleProperty
> = ResponsiveMixinFunction<Media, StyleValue<Property>>;

export type MixinFunctionValue<
  Media extends MediaConstraint,
  Property extends StyleProperty = StyleProperty
> = ResponsiveValue<Media, StyleValue<Property>>;
