import {} from 'styled-components';
import {createMixin} from '../../createMixin';
import {
  StyleProperty,
  MediaConstraint,
  ValueConstraint,
  ThemeConstraint,
  DefaultTheme,
  MapFunction,
  StyleValue,
} from '../../types';
import {map} from '../../map';

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

export const createFlexBasis = factory<StyleValue>(['flexBasis']);
export const createFlexDirection = factory<StyleValue>(['flexDirection']);
export const createFlexGrow = factory<StyleValue>(['flexGrow']);
export const createFlexShrink = factory<StyleValue>(['flexShrink']);
export const createAlignItems = factory<StyleValue>(['alignItems']);
export const createJustifyContent = factory<StyleValue>(['justifyContent']);

export const flexBasis = createFlexBasis({map});
export const flexDirection = createFlexBasis({map});
export const flexGrow = createFlexBasis({map});
export const flexShrink = createFlexBasis({map});
export const alignItems = createAlignItems({map});
export const justifyContent = createJustifyContent({map});