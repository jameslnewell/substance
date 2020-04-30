import {DefaultTheme, Style, ThemeConstraint} from './types';

type MixinsConstraint = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: (value: any) => Style<any, any>;
};

type PropsConstraint<Mixins extends MixinsConstraint> = {
  [prop in keyof Mixins]?: Parameters<Mixins[prop]>[0];
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
  Mixins extends MixinsConstraint,
  Props extends PropsConstraint<Mixins>,
  Theme extends ThemeConstraint = DefaultTheme
>(
  mixins: Mixins,
) => {
  return (props: Props): Style<Props, Theme> => {
    const styles: Style<Props, Theme>[] = [];
    for (const name of Object.keys(props)) {
      if (
        !Object.prototype.hasOwnProperty.call(props, name) ||
        !Object.prototype.hasOwnProperty.call(mixins, name)
      ) {
        continue;
      }
      const mixin = mixins[name];
      const prop = props[name];
      const style = mixin(prop);
      styles.push(typeof style === 'function' ? style(props) : style);
    }
    return styles;
  };
};
