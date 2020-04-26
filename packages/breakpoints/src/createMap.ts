import {DefaultTheme} from 'styled-components';
import {BreakpointNameConstraint, MapFunction, BreakpointFunction} from './types';

export const createMap = <BreakpointName extends BreakpointNameConstraint, Theme = DefaultTheme>(
  breakpoint: BreakpointFunction<BreakpointName, Theme>
): MapFunction<BreakpointName, Theme> => {
  return (values, style) => {
    if (typeof values !== 'object') {
      const stylesForValue = style(values);
      if (typeof stylesForValue === 'function') {
        return (props) => stylesForValue(props);
      } else {
        return stylesForValue;
      }
    }
    // TODO: figure out how to avoid the extra wrapper fn for static greaterThan() and style() when a static fn is used - overloads?
    return (props) => {
      // TODO: consider a for loop to avoid copying previous styles into a new object
      return (Object.keys(values) as BreakpointName[]).reduce((styles, name) => {
        const stylesForValue = style(values[name]);
        const stylesForBreakpoint = breakpoint(name)(typeof stylesForValue === 'function' ? stylesForValue(props) : stylesForValue);
        return ({
          ...styles,
          ...(typeof stylesForBreakpoint === 'function' ? stylesForBreakpoint(props) : stylesForBreakpoint)
        });
      }, {});
    };
  };
};
