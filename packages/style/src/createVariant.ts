import {Interpolation} from './styled';
import {DefaultProps, PropsConstraint} from './types';

export type VariantConstraint = string | number;

/**
 * Create a mixin that returns styles for a specific selection.
 *
 * A variant may consist of responsive styles but it is not responsive itself
 * because emotion/styled-components would need to support nested media queries.
 * If you require a responsive variant, try rolling your own with a switch
 * statement in a map function.
 *
 * @param variants The style variants
 * @returns A mixin
 *
 * @example
 * const variant = createVariant({
 *   primary: {
 *     color: 'blue'
 *   },
 *   secondary: {
 *     color: 'black'
 *   },
 *   secondary: {
 *     color: 'grey'
 *   }
 * });
 * const Box = styled.div(
 *   {},
 *   variant('primary')
 * )
 *
 */
export const createVariant = <
  Variant extends VariantConstraint,
  Props extends PropsConstraint = DefaultProps
>(
  variants: {
    [variant in Variant]: Interpolation<Props>;
  },
) => {
  return (variant: Variant): Interpolation<Props> => {
    const style = variants[variant];
    if (process.env.NODE_ENV !== 'production') {
      if (!Object.prototype.hasOwnProperty.call(variants, variant)) {
        console.warn(`Variant "${variant}" was not found.`);
      }
    }
    return style;
  };
};
