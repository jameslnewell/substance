import {
  ResponsiveMixinFunction,
  MediaConstraint,
  ThemeConstraint,
  DefaultTheme,
} from '../../types';

export type SpaceConstraint = string | number;
export type Spaces<Space extends SpaceConstraint> = {
  [name in Space]: number | string;
};
export type SpaceMixinFunction<
  Media extends MediaConstraint,
  Space extends SpaceConstraint,
  Theme extends ThemeConstraint = DefaultTheme
> = ResponsiveMixinFunction<Media, Space, Theme>;
