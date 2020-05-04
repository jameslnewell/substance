import {Spaces} from './types';

export type DefaultSpace = 5 | 4 | 3 | 2 | 1 | 0;

export const defaultSpaces: Spaces<DefaultSpace> = {
  0: 0,
  1: '0.25em',
  2: '0.5em',
  3: '1em',
  4: '2em',
  5: '4em',
};
