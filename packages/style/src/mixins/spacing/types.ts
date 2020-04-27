import {
  MediaNameConstraint,
  MapValueOrMap,
  Style,
  DefaultTheme,
} from '../../types';

export type SpacingNameConstraint = string | number;
export type SpacingMap<SpacingName extends SpacingNameConstraint> = {
  [name in SpacingName]: number | string;
};

export interface SpacingFunction<
  MediaName extends MediaNameConstraint,
  SpacingName extends SpacingNameConstraint,
  Props,
  Theme = DefaultTheme
> {
  (value: MapValueOrMap<MediaName, SpacingName>): Style<Props, Theme>;
}
