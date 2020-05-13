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
  return <Media extends MediaConstraint>({map}: {map: MapFunction<Media>}) => {
    return createMixin<Media, StyleValue<Property>>({
      map: map,
      properties: [property],
      transform: (value) => value,
    });
  };
};
