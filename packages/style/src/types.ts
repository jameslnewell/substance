import {Properties, Pseudos} from 'csstype';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DefaultTheme {}

export type ThemeProps<Props extends {}, Theme> = Props & {
  theme?: Theme;
};

type CSSProperties = Properties<string | number>;
type CSSPeudoProperties = {[property in Pseudos]?: StyleObject};

export type StyleProperty = keyof CSSProperties;
export type StyleValue = CSSProperties[StyleProperty];
export interface StyleObject extends CSSProperties, CSSPeudoProperties {
  [key: string]: StyleObject | string | number | undefined;
}
export type StyleFunction<Props, Theme> = (
  props: ThemeProps<Props, Theme>,
) => StyleObject;
export type Style<Props, Theme> = StyleObject | StyleFunction<Props, Theme>;

// ========== MEDIA ==========

export type MediaNameConstraint = string | number;
export type MediaMap<MediaName extends MediaNameConstraint> = {
  [name in MediaName]: string;
};

export interface MediaFunction<MediaName extends MediaNameConstraint, Theme> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (name: MediaName): (style: StyleObject) => Style<any, Theme>;
}

export type MapValueConstraint = string | number | boolean;
export type MapValueMap<
  MediaName extends MediaNameConstraint,
  Value extends MapValueConstraint
> = {[name in MediaName]?: Value};

export type MapValueOrMap<
  MediaName extends MediaNameConstraint,
  Value extends MapValueConstraint
> = Value | MapValueMap<MediaName, Value>;

export interface MapFunction<
  MediaName extends MediaNameConstraint,
  Props,
  Theme = DefaultTheme
> {
  <Value extends MapValueConstraint>(
    values: Value | MapValueMap<MediaName, Value>,
    style: (value: Value, props: ThemeProps<Props, Theme>) => StyleObject,
  ): Style<Props, Theme>;
}
