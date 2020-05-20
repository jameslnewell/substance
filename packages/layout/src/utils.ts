import {
  ResponsiveValue,
  MediaConstraint,
  ResponsiveValueConstraint,
} from '@substance/style';

/**
 * Map a prop to another prop value
 * @param input
 * @param fn
 */
export function transformProps<
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
