import {} from 'styled-components';
import {
  createMixin,
  StyleProperty,
  MediaConstraint,
  ThemeConstraint,
  DefaultTheme,
  MapFunction,
  StyleValue,
  DefaultProps,
  PropsConstraint,
} from '@substance/style';

export const createMixinForCSSProperty = <Property extends StyleProperty>(
  property: Property,
) => {
  return <
    Media extends MediaConstraint,
    Theme extends ThemeConstraint = DefaultTheme,
    Props extends PropsConstraint = DefaultProps
  >({
    map,
  }: {
    map: MapFunction<Media, Theme>;
  }) => {
    return createMixin<Media, StyleValue<Property>, Theme, Props>({
      map: map,
      properties: [property],
      transform: (value) => value,
    });
  };
};
