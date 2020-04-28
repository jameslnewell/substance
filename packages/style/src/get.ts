// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const get = <V, O extends {[segment: string]: any} = {}>(
  path: string,
  object: O,
): V | undefined => {
  if (Object.prototype.hasOwnProperty.call(object, path)) {
    return object[path];
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any = object;
  const segments = path.split('.');
  for (const segment of segments) {
    if (!Object.prototype.hasOwnProperty.call(result, segment)) {
      console.warn(`Path "${path}" not found on object`);
      return undefined;
    }
    result = result[segment];
  }
  return result;
};
