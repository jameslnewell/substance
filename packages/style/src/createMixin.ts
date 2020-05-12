import {CSSObject} from './styled/types';
import {
  StyleProperty,
  StyleValue,
  MapFunction,
  MediaConstraint,
  ResponsiveValueConstraint,
  ResponsiveMixinFunction,
} from './types';

const createStylesFromTransformedValue = (
  properties: StyleProperty[],
  value: StyleValue,
): CSSObject => {
  const style: Partial<CSSObject> = {};
  for (const property of properties) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    style[property] = value as any;
  }
  return style;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface CreateMixinTransformFunction<
  Value extends ResponsiveValueConstraint,
  Props
> {
  (value: Value): undefined | StyleValue | ((props: Props) => StyleValue);
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
  Props
>({
  map,
  properties,
  transform,
}: {
  map: MapFunction<Media>;
  properties: StyleProperty[];
  transform: CreateMixinTransformFunction<Value, Props>;
}): ResponsiveMixinFunction<Media, Value, Props> => {
  return (valueOrValues) => {
    return map<Value, Props>(valueOrValues, (value) => {
      const transformedValue = transform(value);
      if (typeof transformedValue === 'function') {
        return (props: Props) => {
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
