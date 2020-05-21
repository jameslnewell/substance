import {css} from 'styled-components';
import {Interpolation} from './styled';
import {
  StyleProperty,
  MapFunction,
  MediaConstraint,
  ResponsiveValueConstraint,
  ResponsiveMixinFunction,
  ThemeProps,
  ResponsiveValue,
} from './types';

function createStylesFromTransformedValue<Props extends ThemeProps>(
  properties: StyleProperty[],
  value: Interpolation<Props>,
): Interpolation<Props>[] {
  const styles: Interpolation<Props>[] = [];
  for (const property of properties) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    styles.push(
      css`
        ${property}: ${value};
      `,
    );
  }
  return styles;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface CreateMixinTransformFunction<
  Value extends ResponsiveValueConstraint
> {
  (value: Value): Interpolation<ThemeProps>;
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
  Value extends ResponsiveValueConstraint
>({
  map,
  properties,
  transform,
}: {
  map: MapFunction<Media>;
  properties: StyleProperty[];
  transform: CreateMixinTransformFunction<Value>;
}): ResponsiveMixinFunction<Media, Value> => {
  return <Props extends ThemeProps>(
    valueOrValues: ResponsiveValue<Media, Value>,
  ) => {
    return map<Value, Props>(valueOrValues, (value) => {
      return createStylesFromTransformedValue(properties, transform(value));
    });
  };
};
