import {BreakpointNameConstraint, MapFunction, BreakpointFunction} from './types';

export const createMap = <BreakpointName extends BreakpointNameConstraint, Theme>(
  breakpoint: BreakpointFunction<BreakpointName, Theme>
): MapFunction<BreakpointName, Theme> => {
  return (values, style) => {
    return (props) => {
      if (typeof values !== 'object') {
        return style(values, props);
      }
      return (Object.keys(values) as BreakpointName[]).reduce((styles, name) => {
        if (!values.hasOwnProperty(name)) {
          return styles;
        }
        const stylesForValue = style(values[name] as any, props); // FIXME: 
        const stylesForBreakpoint = breakpoint(name)(stylesForValue);
        return ({
          ...styles,
          ...(typeof stylesForBreakpoint === 'function' ? stylesForBreakpoint(props) : stylesForBreakpoint)
        });
      }, {});
    };
  };
};
