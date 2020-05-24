import {Interpolation} from './framework/types';

type TypeOrTypeOfArray<A> = A extends Array<unknown> ? A[number] : A;

type FirstParameter<
  F extends (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    first: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
> = F extends (
  value: infer V,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
any
  ? V
  : never;

export type CreatePropsMixinFunctionsConstraint = {
  [
    props: string
  ]: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | ((value: any) => Interpolation<any>)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | ((value: any) => Interpolation<any>)[];
};

export type CreatePropsMixinProps<
  MixinFunctions extends CreatePropsMixinFunctionsConstraint
> = {
  [prop in keyof MixinFunctions]?: FirstParameter<
    TypeOrTypeOfArray<MixinFunctions[prop]>
  >;
};

/**
 * Create a mixin that maps props to mixins
 *
 * @param mixins The mixins
 * @returns A mixin
 *
 * @example
 * const Box = styled.div(
 *  createProps({
 *    paddingX,
 *    paddingY
 *  })
 * );
 */
export const createProps = <
  MixinFunctions extends CreatePropsMixinFunctionsConstraint
>(
  mixins: MixinFunctions,
) => {
  return <Props extends CreatePropsMixinProps<MixinFunctions>>(
    props: Props,
  ) => {
    const styles: Interpolation<Props>[] = [];
    for (const name of Object.keys(props)) {
      const mixin = mixins[name];
      const prop = props[name];
      if (mixin === undefined || prop === undefined) {
        continue;
      }
      if (Array.isArray(mixin)) {
        mixin.forEach((m) => styles.push(m(prop)));
      } else {
        styles.push(mixin(prop));
      }
    }
    return styles;
  };
};
