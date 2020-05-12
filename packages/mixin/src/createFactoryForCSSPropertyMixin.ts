import {} from 'styled-components';
import {
  createMixin,
  StyleProperty,
  MediaConstraint,
  MapFunction,
  StyleValue,
} from '@substance/style';

export const createFactoryForCSSPropertyMixin = <
  Property extends StyleProperty
>(
  property: Property,
) => {
  return <Media extends MediaConstraint, Props>({
    map,
  }: {
    map: MapFunction<Media>;
  }) => {
    return createMixin<Media, StyleValue<Property>, Props>({
      map: map,
      properties: [property],
      transform: (value) => value,
    });
  };
};
