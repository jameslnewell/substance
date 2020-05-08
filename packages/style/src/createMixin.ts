import {
  DefaultTheme,
  PropsWithTheme,
  StyleProperty,
  StyleValue,
  StyleObject,
  MapFunction,
  MediaConstraint,
  ResponsiveValueConstraint,
  PropsConstraint,
  ThemeConstraint,
  DefaultProps,
  ResponsiveMixinFunction,
} from './types';

const createStylesFromTransformedValue = (
  properties: StyleProperty[],
  value: StyleValue,
): StyleObject => {
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
  Theme extends ThemeConstraint = DefaultTheme,
  Props extends PropsConstraint = DefaultProps
> {
  (value: Value):
    | undefined
    | StyleValue
    | ((props: PropsWithTheme<Props, Theme>) => StyleValue);
}

/**
 * Creates a responsive mixin for a set of properties
 * @param properties The CSS property names
 * @param transform  The transformation function
 *
 * @example
 * const marginLeft = createMixin(['margin-left', 'margin-right'], value => `${value}px`)(0);
 * const marginLeft = createMixin(['margin-left', 'margin-right'], value => ({theme}) => `${theme.space[value]}px`)(0);
 * marginLeft(1);
 * marginLeft({mobile: 1, desktop: 2});
 *
 */
export const createMixin = <
  Media extends MediaConstraint,
  Value extends ResponsiveValueConstraint,
  Theme extends ThemeConstraint = DefaultTheme,
  Props extends PropsConstraint = DefaultProps
>({
  map,
  properties,
  transform,
}: {
  map: MapFunction<Media, Theme>;
  properties: StyleProperty[];
  transform: CreateMixinTransformFunction<Value, Theme, Props>;
}): ResponsiveMixinFunction<Media, Value, Theme, Props> => {
  return (valueOrValues) => {
    return map<Value, Props>(valueOrValues, (value) => {
      const transformedValue = transform(value);
      if (typeof transformedValue === 'function') {
        return (props) => {
          return createStylesFromTransformedValue(
            properties,
            transformedValue(props),
          );
        };
      }
      return createStylesFromTransformedValue(properties, transformedValue);
    });
  };
};
