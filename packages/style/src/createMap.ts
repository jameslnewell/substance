import {
  DefaultTheme,
  MediaConstraint,
  MatchFunction,
  ResponsiveValueConstraint,
  ResponsiveValues,
  MapStyleFunction,
  PropsConstraint,
  DefaultProps,
  ThemeProps,
  ThemeConstraint,
  StyleObject,
} from './types';

export const createMap = <
  Media extends MediaConstraint,
  Theme extends ThemeConstraint = DefaultTheme
>({
  match,
}: {
  match: MatchFunction<Media, Theme>;
}) => {
  return <
    Value extends ResponsiveValueConstraint,
    Props extends PropsConstraint = DefaultProps
  >(
    valueOrValues: Value | ResponsiveValues<Media, Value>,
    style: MapStyleFunction<Value, Props, Theme>,
  ) => {
    // TODO: for perf, map props only for style functions that take two params? (will require adjusting MapFunction typings to use overrides)
    return (props: ThemeProps<Props, Theme>): StyleObject => {
      if (typeof valueOrValues !== 'object') {
        return style(valueOrValues, props);
      }
      // TODO: consider ordering???
      return (Object.keys(valueOrValues) as Media[]).reduce(
        (styles, mediaName) => {
          if (!Object.prototype.hasOwnProperty.call(valueOrValues, mediaName)) {
            return styles;
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const stylesForValue = style(valueOrValues[mediaName] as any, props); // FIXME:
          const stylesForMedia = match(mediaName)(stylesForValue);
          return {
            ...styles,
            ...(typeof stylesForMedia === 'function'
              ? stylesForMedia(props)
              : stylesForMedia),
          };
        },
        {},
      );
    };
  };
};
