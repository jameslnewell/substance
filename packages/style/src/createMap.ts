import {
  MediaConstraint,
  MatchFunction,
  ResponsiveValueConstraint,
  ResponsiveValue,
  MapFunctionFunction,
  PropsConstraint,
  ThemeConstraint,
  FlatStyle,
  PropsWithTheme,
  DefaultTheme,
  DefaultProps,
  MapFunction,
} from './types';

/**
 *
 * Create a mixin that maps a value to styles for each media query
 *
 * @param match
 */
export const createMap = <
  Media extends MediaConstraint,
  Theme extends ThemeConstraint = DefaultTheme
>(
  match: MatchFunction<Media>,
): MapFunction<Media, Theme> => {
  return <
    Value extends ResponsiveValueConstraint,
    Props extends PropsConstraint = DefaultProps
  >(
    valueOrValues: ResponsiveValue<Media, Value>,
    fn: MapFunctionFunction<Value, Theme, Props>,
  ) => {
    // handle a singular value (non-responsive)
    if (typeof valueOrValues !== 'object') {
      return fn(valueOrValues);
    }

    // handle a map of values (responsive)
    return (props: PropsWithTheme<Props, Theme>) => {
      const styles: Array<FlatStyle<PropsWithTheme<Props, Theme>>> = [];
      for (const media of Object.keys(valueOrValues) as Media[]) {
        // ensure the property is not inherited
        if (!Object.prototype.hasOwnProperty.call(valueOrValues, media)) {
          continue;
        }
        const value = valueOrValues[media];
        // Casting should be safe here because .hasOwnProperty should ensure
        // the value has been set and the types should ensure the value is not
        // undefined
        const style = fn(value as Value);
        if (typeof style === 'function') {
          const result = style(props);
          if (result) {
            styles.push(match(media)(result));
          }
        }
        if (typeof style === 'object') {
          styles.push(match(media)(style));
          continue;
        }
        continue;
      }
      return styles;
    };
  };
};
