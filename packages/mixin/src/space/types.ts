import {
  ResponsiveMixinFunction,
  MediaConstraint,
  ThemeConstraint,
  DefaultTheme,
  StyleValue,
} from '@substance/style';

export type SpaceConstraint = string | number;
export type Spaces<Space extends SpaceConstraint> = {
  [name in Space]: StyleValue<'marginTop'>;
};
export type SpaceMixinFunction<
  Media extends MediaConstraint,
  Space extends SpaceConstraint,
  Theme extends ThemeConstraint = DefaultTheme
> = ResponsiveMixinFunction<Media, Space, Theme>;
