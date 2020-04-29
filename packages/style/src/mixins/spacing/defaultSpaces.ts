import {Spaces} from './types';

export type DefaultSpace =
  | 0
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '-xs'
  | '-sm'
  | '-md'
  | '-lg'
  | '-xl';

export const defaultSpaces: Spaces<DefaultSpace> = {
  '-xl': '-4em',
  '-lg': '-2em',
  '-md': '-1em',
  '-sm': '-0.5em',
  '-xs': '-0.25em',
  0: 0,
  xs: '0.25em',
  sm: '0.5em',
  md: '1em',
  lg: '2em',
  xl: '4em',
};
