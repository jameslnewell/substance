import {MixinFunction} from '../../types';

export type SpaceConstraint = string | number;
export type Spaces<Space extends SpaceConstraint> = {
  [name in Space]: number | string;
};
export type SpaceFunction<Space extends SpaceConstraint> = MixinFunction<Space>;
