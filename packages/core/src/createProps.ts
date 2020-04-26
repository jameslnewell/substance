import {ThemeProps, Style} from './types';
import {} from 'styled-components';

interface MixinMapConstraint<Theme> {
  [prop: string]: (value: any) => Style<Theme>
}

type MixinProps<Mixins extends MixinMapConstraint<any>> = {
  [name in keyof Mixins]?: Parameters<Mixins[name]>[0]
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
export const createProps = <MixinMap extends MixinMapConstraint<Theme>, Theme>(mixins: MixinMap) => {
  return (props: MixinProps<MixinMap> & ThemeProps<Theme>): Style<Theme> => {
    return Object.keys(mixins).reduce<Style<Theme>>((styles, name) => {
      const mixin = mixins[name];
      const prop = props[name];
      if (mixin === undefined || prop === undefined) {
        return styles;
      }
      const style = mixin(prop);
      return ({ 
        ...styles,
        ...(typeof style === 'function' ? style(props) : style)
      });
    }, {});
  };
}
