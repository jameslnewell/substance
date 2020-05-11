export type ColorConstraint = string;
export type Colors<Color extends ColorConstraint> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [name in Color]: any;
};
