import {
  DefaultTheme,
  BreakpointNameConstraint,
  MapFunction,
  BreakpointFunction,
} from './types';

export const createMap = <
  BreakpointName extends BreakpointNameConstraint,
  Props,
  Theme = DefaultTheme
>({
  breakpoint,
}: {
  breakpoint: BreakpointFunction<BreakpointName, Theme>;
}): MapFunction<BreakpointName, Props, Theme> => {
  return (values, style) => {
    return (props) => {
      if (typeof values !== 'object') {
        return style(values, props);
      }
      return (Object.keys(values) as BreakpointName[]).reduce(
        (styles, name) => {
          if (!Object.prototype.hasOwnProperty.call(values, name)) {
            return styles;
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const stylesForValue = style(values[name] as any, props); // FIXME:
          const stylesForBreakpoint = breakpoint(name)(stylesForValue);
          return {
            ...styles,
            ...(typeof stylesForBreakpoint === 'function'
              ? stylesForBreakpoint(props)
              : stylesForBreakpoint),
          };
        },
        {},
      );
    };
  };
};
