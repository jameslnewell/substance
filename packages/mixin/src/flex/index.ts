import {} from 'styled-components';
import {
  createMixin,
  StyleProperty,
  MediaConstraint,
  ValueConstraint,
  ThemeConstraint,
  DefaultTheme,
  MapFunction,
  StyleValue,
  map,
} from '@substance/style';

const factory = <Value extends ValueConstraint>(
  properties: StyleProperty[],
) => {
  return <
    Media extends MediaConstraint,
    Theme extends ThemeConstraint = DefaultTheme
  >({
    map,
  }: {
    map: MapFunction<Media, Theme>;
  }) => {
    return createMixin<Media, Value, Theme>({
      map: map,
      properties,
      transform: (value) => value,
    });
  };
};

export const createFlexBasis = factory<StyleValue<'flexBasis'>>(['flexBasis']);
export const createFlexDirection = factory<StyleValue<'flexDirection'>>([
  'flexDirection',
]);
export const createFlexGrow = factory<StyleValue<'flexGrow'>>(['flexGrow']);
export const createFlexShrink = factory<StyleValue<'flexShrink'>>([
  'flexShrink',
]);
export const createAlignItems = factory<StyleValue<'alignItems'>>([
  'alignItems',
]);
export const createJustifyContent = factory<StyleValue<'justifyContent'>>([
  'justifyContent',
]);

export const flexBasis = createFlexBasis({map});
export const flexDirection = createFlexBasis({map});
export const flexGrow = createFlexBasis({map});
export const flexShrink = createFlexBasis({map});
export const alignItems = createAlignItems({map});
export const justifyContent = createJustifyContent({map});
