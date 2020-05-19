import {Interpolation} from './styled';
import {PropsConstraint, DefaultProps} from './types';

type MixinPropsConstraint = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;
};

type MixinFunctions<MixinProps extends MixinPropsConstraint> = {
  [props in keyof MixinProps]:  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | ((value: MixinProps[props]) => Interpolation<any>)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | ((value: MixinProps[props]) => Interpolation<any>)[];
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
export const createProps = <MixinProps extends MixinPropsConstraint>(
  mixins: MixinFunctions<MixinProps>,
) => {
  return <Props extends PropsConstraint = DefaultProps>(
    props: Partial<MixinProps> & Props,
  ) => {
    const styles: Interpolation<Partial<MixinProps> & Props>[] = [];
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
