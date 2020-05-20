import {
  ResponsiveValue,
  MediaConstraint,
  ResponsiveValueConstraint,
} from '@substance/style';

export function mapProps<
  Media extends MediaConstraint,
  InputValue extends ResponsiveValueConstraint,
  OutputValue extends ResponsiveValueConstraint
>(
  input: ResponsiveValue<Media, InputValue>,
  fn: (value: InputValue) => OutputValue,
): ResponsiveValue<Media, OutputValue> {
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
