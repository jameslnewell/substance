import {
  MediaConstraint,
  ResponsiveMixinFunction,
  ResponsiveValue,
  StyleProperty,
  StyleValue,
} from '@substance/style';

export type Mixin<
  Media extends MediaConstraint,
  Property extends StyleProperty = StyleProperty
> = ResponsiveMixinFunction<Media, StyleValue<Property>>;
export type MixinValue<
  Media extends MediaConstraint,
  Property extends StyleProperty = StyleProperty
> = ResponsiveValue<Media, StyleValue<Property>>;
