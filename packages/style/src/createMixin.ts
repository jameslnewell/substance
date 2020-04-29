import {
  DefaultTheme,
  ThemeProps,
  StyleProperty,
  StyleValue,
  StyleObject,
  MapFunction,
  MediaConstraint,
  ResponsiveValueConstraint,
  ResponsiveMixinFunction,
  PropsConstraint,
  ResponsiveValues,
  ThemeConstraint,
  DefaultProps,
  Style,
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
export interface CreateMixinTransformFunction<
  Value extends ResponsiveValueConstraint,
  Theme extends ThemeConstraint = DefaultTheme
> {
  <Props extends PropsConstraint = DefaultProps>(
    value: Value,
    props: ThemeProps<Props, Theme>,
  ): StyleValue;
}

/**
 * Creates a responsive mixin for a set of properties
 * @param properties The CSS property names
 * @param transform  The transformation function
 *
 * @example
 *  createMixin(['margin-left', 'margin-right'], value => `${value}px`)(0);
 *  createMixin(['margin-left', 'margin-right'], value => ({theme}) => `${theme.space[value]}px`)(0);
 *
 */
export const createMixin = <
  Media extends MediaConstraint,
  Value extends ResponsiveValueConstraint,
  Theme extends ThemeConstraint = DefaultTheme
>({
  map,
  properties,
  transform,
}: {
  map: MapFunction<Media, Theme>;
  properties: StyleProperty[];
  transform: CreateMixinTransformFunction<Value, Theme>;
}): ResponsiveMixinFunction<Media, Value> => {
  return <Props extends PropsConstraint = DefaultProps>(
    valueOrValues: Value | ResponsiveValues<Media, Value>,
  ): Style<Props, Theme> => {
    return map<Value, Props>(valueOrValues, (value, props) => {
      return createStylesFromTransformedValue(
        properties,
        transform(value, props),
      );
    });
  };
};
