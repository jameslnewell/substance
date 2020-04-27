import {DefaultTheme, Style} from './types';

type MixinsConstraint = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: (value: any) => Style<any, any>;
};

type PropsConstraint<Mixins extends MixinsConstraint> = {
  [prop in keyof Mixins]?: Parameters<Mixins[prop]>[0];
};

/**
 * Create a style function that maps each prop to a mixin
 * @param mixins A map of mixins
 * @returns A style function
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
  Mixins extends MixinsConstraint,
  Props extends PropsConstraint<Mixins>,
  Theme = DefaultTheme
>(
  mixins: Mixins,
) => {
  return (props: Props): Style<Props, Theme> => {
    return Object.keys(mixins).reduce<Style<Props, Theme>>((styles, name) => {
      const mixin = mixins[name];
      const prop = props[name];
      if (mixin === undefined || prop === undefined) {
        return styles;
      }
      const style = mixin(prop);
      return {
        ...styles,
        ...(typeof style === 'function' ? style(props) : style),
      };
    }, {});
  };
};
