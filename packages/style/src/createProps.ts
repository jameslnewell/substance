import {Interpolation} from './styled';
import {PropsConstraint} from './types';

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
  return <Props extends PropsConstraint>(
    props: Partial<MixinProps> & Props,
  ) => {
    const styles: Interpolation<Partial<MixinProps> & Props>[] = [];
    for (const name of Object.keys(props)) {
      if (
        !Object.prototype.hasOwnProperty.call(props, name) ||
        !Object.prototype.hasOwnProperty.call(mixins, name)
      ) {
        continue;
      }
      const mixin = mixins[name];
      const prop = props[name];
      if (Array.isArray(mixin)) {
        mixin.forEach((m) => {
          // we've already checked whether the value exists via .hasOwnProperty above
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const style = m(prop as any);
          styles.push(typeof style === 'function' ? style(props) : style);
        });
      } else {
        // we've already checked whether the value exists via .hasOwnProperty above
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const style = mixin(prop as any);
        styles.push(typeof style === 'function' ? style(props) : style);
      }
    }
    return styles;
  };
};
