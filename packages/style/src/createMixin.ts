import {
  DefaultTheme,
  ThemeProps,
  StyleProperty,
  StyleValue,
  StyleObject,
  Style,
  MapFunction,
  BreakpointNameConstraint,
  MapValueOrMap,
  MapValueConstraint,
} from './types';

const createStylesFromTransformedValue = (
  properties: StyleProperty[],
  value: StyleValue,
) => {
  const style: Partial<StyleObject> = {};
  for (const property of properties) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    style[property] = value as any;
  }
  return style;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface CreateMixinTransformFunction<Value extends any, Theme> {
  <Props>(value: Value, props: ThemeProps<Props, Theme>): StyleValue;
}

/**
 * Create a function for creating CSS declarations based on a list of CSS properties
 * @param properties The CSS property name
 * @param transform  The transformation function
 *
 * @example
 *  createMixin(['margin-left', 'margin-right'], value => `${value}px`)(0);
 *  createMixin(['margin-left', 'margin-right'], value => ({theme}) => `${theme.space[value]}px`)(0);
 *
 */
export const createMixin = <
  Breakpoint extends BreakpointNameConstraint,
  Value extends MapValueConstraint,
  Props,
  Theme = DefaultTheme
>({
  map,
  properties,
  transform,
}: {
  map: MapFunction<Breakpoint, Props, Theme>;
  properties: StyleProperty[];
  transform: CreateMixinTransformFunction<Value, Theme>;
}) => {
  return (value: MapValueOrMap<Breakpoint, Value>): Style<Props, Theme> => {
    return map(value, (v, props) => {
      return createStylesFromTransformedValue(properties, transform(v, props));
    });
  };
};
