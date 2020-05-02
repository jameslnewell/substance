import {
  DefaultTheme,
  MediaConstraint,
  MatchFunction,
  ResponsiveValueConstraint,
  ResponsiveValue,
  MapStyleFunction,
  PropsConstraint,
  DefaultProps,
  PropsWithTheme,
  ThemeConstraint,
  StyleObject,
} from './types';

/**
 *
 * Create a mixin that maps a value to styles for each media query
 *
 * @param options
 */
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
    valueOrValues: ResponsiveValue<Media, Value>,
    style: MapStyleFunction<Value, Props, Theme>,
  ) => {
    // TODO: for perf, nest and pass props only for style functions that take two params? (will require adjusting MapFunction typings to use overrides)
    return (
      props: PropsWithTheme<Props, Theme>,
    ): StyleObject | StyleObject[] => {
      if (typeof valueOrValues !== 'object') {
        return style(valueOrValues, props);
      }
      // TODO: consider ordering???
      const styles: StyleObject[] = [];
      for (const media of Object.keys(valueOrValues) as Media[]) {
        if (!Object.prototype.hasOwnProperty.call(valueOrValues, media)) {
          continue;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const stylesForValue = style(valueOrValues[media] as any, props); // FIXME:
        const stylesForMedia = match(media)(stylesForValue);

        styles.push(
          typeof stylesForMedia === 'function'
            ? stylesForMedia(props)
            : stylesForMedia,
        );
      }
      return styles;
    };
  };
};
