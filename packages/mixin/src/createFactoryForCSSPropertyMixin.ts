import {} from 'styled-components';
import {
  createMixin,
  StyleProperty,
  MediaConstraint,
  MapFunction,
  StyleValue,
  CreateMixinTransformFunction,
} from '@substance/style';

export const createFactoryForCSSPropertyMixin = <
  Property extends StyleProperty
>(
  property: Property,
  transform: CreateMixinTransformFunction<StyleValue<Property>> = (value) =>
    value,
) => {
  return <Media extends MediaConstraint>({map}: {map: MapFunction<Media>}) => {
    return createMixin<Media, StyleValue<Property>>({
      map: map,
      properties: [property],
      transform,
    });
  };
};
