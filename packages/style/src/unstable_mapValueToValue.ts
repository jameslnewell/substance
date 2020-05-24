import {
  ResponsiveValue,
  MediaConstraint,
  ResponsiveValueConstraint,
} from './types';

/**
 * Map a value to another value
 * @experimental
 * @param input
 * @param fn
 */
// eslint-disable-next-line @typescript-eslint/camelcase
export function unstable_mapValueToValue<
  Media extends MediaConstraint,
  InputValue extends ResponsiveValueConstraint,
  OutputValue extends ResponsiveValueConstraint
>(
  input: ResponsiveValue<Media, InputValue> | undefined,
  fn: (value: InputValue) => OutputValue,
): ResponsiveValue<Media, OutputValue> | undefined {
  if (input === undefined) {
    return undefined;
  }
  if (typeof input !== 'object') {
    return fn(input);
  }
  const result: ResponsiveValue<Media, OutputValue> = {};
  for (const media in input) {
    const value: InputValue | undefined = input[media];
    if (value !== undefined) {
      result[media] = fn(value);
    }
  }
  return result;
}
