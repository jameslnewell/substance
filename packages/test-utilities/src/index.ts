// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function keysOf<O extends {[k in string | number | symbol]: any}>(
  object: O,
): Array<keyof O> {
  return Object.keys(object) as Array<keyof O>;
}
