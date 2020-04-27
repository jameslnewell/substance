import {
  DefaultTheme,
  BreakpointNameConstraint,
  BreakpointMap,
  BreakpointFunction,
} from './types';

export interface GetBreakpointMapFunction<
  BreakpointName extends BreakpointNameConstraint,
  Theme = DefaultTheme
> {
  (theme: Theme | undefined): BreakpointMap<BreakpointName>;
}

export const createBreakpoint = <
  BreakpointName extends BreakpointNameConstraint,
  Theme = DefaultTheme
>({
  breakpoints: breakpointMapOrGetBreakpointMap,
}: {
  breakpoints:
    | BreakpointMap<BreakpointName>
    | GetBreakpointMapFunction<BreakpointName, Theme>;
}): BreakpointFunction<BreakpointName, Theme> => {
  if (typeof breakpointMapOrGetBreakpointMap === 'function') {
    return (name) => (style) => (props) => ({
      [`@media (min-width: ${
        breakpointMapOrGetBreakpointMap(props.theme)[name]
      }px)`]: style,
    });
  } else {
    return (name) => (style) => ({
      [`@media (min-width: ${breakpointMapOrGetBreakpointMap[name]}px)`]: style,
    });
  }
};
