import {Interpolation} from './styled/types';
import {
  MediaConstraint,
  MatchFunction,
  ResponsiveValueConstraint,
  ResponsiveValue,
  MapFunctionFunction,
  MapFunction,
} from './types';

/**
 *
 * Create a mixin that maps a value to styles for each media query
 *
 * @param match
 */
export const createMap = <Media extends MediaConstraint>(
  match: MatchFunction<Media>,
): MapFunction<Media> => {
  return <Value extends ResponsiveValueConstraint, Props>(
    valueOrValues: ResponsiveValue<Media, Value>,
    fn: MapFunctionFunction<Value, Props>,
  ) => {
    // handle a singular value (non-responsive)
    if (typeof valueOrValues !== 'object') {
      return fn(valueOrValues);
    }

    // handle a map of values (responsive)
    const styles: Array<Interpolation<Props>> = [];
    for (const media of Object.keys(valueOrValues) as Media[]) {
      // ensure the property is not inherited
      if (!Object.prototype.hasOwnProperty.call(valueOrValues, media)) {
        continue;
      }
      const value = valueOrValues[media];
      // Casting `value` should be safe here because .hasOwnProperty should ensure
      // the value has been set and the types should ensure the value is not
      // undefined
      const style = fn(value as Value);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      styles.push(match(media)({}, style as any)); // FIXME: remove casting
    }
    return styles;
  };
};
