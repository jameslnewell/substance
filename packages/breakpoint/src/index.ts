import {css, SimpleInterpolation} from 'styled-components';
import {select} from '@substance/theme';

export type Breakpoint = string;
export type Value<T> = T;
export type BreakpointValueMap<T> = {[breakpoint: string]: Value<T> };

export function gte(breakpoint: Breakpoint) {
  return (strings: TemplateStringsArray, ...interpolations: SimpleInterpolation[]) => {
    return css`@media (min-width: ${select(({breakpoints = {}}) => breakpoints[breakpoint])}) {
      ${css(strings, ...interpolations)}
    }`;
  };
}

export function lte(breakpoint: Breakpoint) {
  return (strings: TemplateStringsArray, ...interpolations: SimpleInterpolation[]) => {
    return css`@media (max-width: ${select(({breakpoints = {}}) => breakpoints[breakpoint])}) {
      ${css(strings, ...interpolations)}
    }`;
  };
}

export function map<T>(values: Value<T> | BreakpointValueMap<T>, mapValueToCSS: (value?: Value<T>) => SimpleInterpolation) {
  if (typeof values !== 'object') {
    return mapValueToCSS(values);
  }
  return [
    // eslint-disable-next-line no-undefined
    mapValueToCSS(undefined), // set the default value
    ...Object.keys(values).map((breakpoint: string) => {
      const tag = gte(breakpoint);
      const val = values[breakpoint];
      const styles = tag([], [].concat(mapValueToCSS(val)));
      return styles;
    })
  ];
}