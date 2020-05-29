/* eslint-disable @typescript-eslint/camelcase */
import {ResponsiveValue, MediaConstraint} from '@substance/style';
import {SpaceConstraint} from '@substance/mixin';

export type SpaceX<Space extends SpaceConstraint> = Space;
export type SpaceY<Space extends SpaceConstraint> = Space;

export type ResponsiveSpaceX<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> = ResponsiveValue<Media, SpaceX<Space>>;

export type ResponsiveSpaceY<
  Media extends MediaConstraint,
  Space extends SpaceConstraint
> = ResponsiveValue<Media, SpaceY<Space>>;
