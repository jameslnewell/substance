import {
  ResponsiveMixinFunction,
  MediaConstraint,
  StyleValue,
} from '@substance/style';

export type SpaceConstraint = string | number;
export type Spaces<Space extends SpaceConstraint> = {
  [name in Space]: StyleValue<'margin-top'>;
};
export type SpaceMixinFunction<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> = ResponsiveMixinFunction<Media, Space>;
