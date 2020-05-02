import {Style, StyleFunction} from './types';
import {combine} from './combine';

interface PropsConstraint {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;
}

export const pseudo = <Props extends PropsConstraint>(
  pseudo: string,
  ...styles: Style<Props>[]
): StyleFunction<Props> => {
  return (props: Props): Style<Props> => {
    let style = combine(...styles);
    if (typeof style === 'function') {
      style = style(props);
    }
    if (style === undefined) {
      return style;
    }
    return {
      [pseudo]: style,
    };
  };
};
