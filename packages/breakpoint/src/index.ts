import {css, SimpleInterpolation, ThemedCssFunction} from 'styled-components';
import {select} from '@substance/theme';

export type Breakpoint = string;
export type BreakpointValue<V> = V;
export type BreakpointValueMap<V> = {[breakpoint: string]: BreakpointValue<V> };
export type MapValueToStyleFunction<V> = (value?: BreakpointValue<V>) => any;

export function gte<T>(breakpoint: Breakpoint): ThemedCssFunction<T> {
  return (strings: TemplateStringsArray, ...interpolations: SimpleInterpolation[]) => {
    return css`@media (min-width: ${select(`breakpoints.${breakpoint}`)}) {
      ${css(strings, ...interpolations)}
    }`;
  };
}

export function lte<T>(breakpoint: Breakpoint): ThemedCssFunction<T> {
  return (strings, ...interpolations) => {
    return css`@media (max-width: ${select(`breakpoints.${breakpoint}`)}) {
      ${css(strings, ...interpolations)}
    }`;
  };
}

export function map<V>(values: BreakpointValue<V> | BreakpointValueMap<V>, mapValueToStyle: MapValueToStyleFunction<V>) {
  if (typeof values !== 'object') {
    return mapValueToStyle(values);
  }
  return Object.keys(values).reduce((accum, breakpoint) => {
    const template = gte(breakpoint);
    const value = values[breakpoint];
    const style = mapValueToStyle(value);
    return [].concat(accum, template([] as any, [].concat(style)));
  }, mapValueToStyle(undefined));
}

