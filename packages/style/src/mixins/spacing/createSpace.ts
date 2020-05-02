import {
  MediaConstraint,
  MapFunction,
  StyleProperty,
  DefaultTheme,
  PropsWithTheme,
  ThemeConstraint,
  StyleValue,
  PropsConstraint,
  DefaultProps,
} from '../../types';
import {Spaces, SpaceConstraint} from './types';
import {createMixin} from '../../createMixin';

export interface GetSpacesFunction<
  Space extends SpaceConstraint,
  Theme extends ThemeConstraint = DefaultTheme
> {
  (theme: Theme | undefined): Spaces<Space>;
}

export interface GetSpaceFunction<
  Space extends SpaceConstraint,
  Theme extends ThemeConstraint = DefaultTheme
> {
  <Props extends PropsConstraint = DefaultProps>(
    space: Space,
    props: PropsWithTheme<Props, Theme>,
  ): StyleValue;
}

// TODO: support negative spacings
export const createGetSpace = <
  Space extends SpaceConstraint,
  Theme extends ThemeConstraint = DefaultTheme
>(
  spacesOrGetSpaces: Spaces<Space> | GetSpacesFunction<Space, Theme>,
) => {
  if (typeof spacesOrGetSpaces === 'function') {
    return <Props extends PropsConstraint = DefaultProps>(
      value: Space,
      {theme}: PropsWithTheme<Props, Theme>,
    ): StyleValue => spacesOrGetSpaces(theme)[value];
  } else {
    return (value: Space): StyleValue => spacesOrGetSpaces[value];
  }
};

const createSpaceFactory = (properties: StyleProperty[]) => {
  return <
    Media extends MediaConstraint,
    Space extends SpaceConstraint,
    Theme extends ThemeConstraint = DefaultTheme
  >({
    map,
    getSpace,
  }: {
    map: MapFunction<Media, Theme>;
    getSpace: GetSpaceFunction<Space, Theme>;
  }) => {
    return createMixin<Media, Space, Theme>({
      map: map,
      properties,
      transform: getSpace,
    });
  };
};

export const createMargin = createSpaceFactory([
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
]);

export const createMarginX = createSpaceFactory(['marginRight', 'marginLeft']);

export const createMarginY = createSpaceFactory(['marginTop', 'marginBottom']);

export const createMarginTop = createSpaceFactory(['marginTop']);

export const createMarginRight = createSpaceFactory(['marginRight']);

export const createMarginBottom = createSpaceFactory(['marginBottom']);

export const createMarginLeft = createSpaceFactory(['marginLeft']);

export const createPadding = createSpaceFactory([
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
]);

export const createPaddingX = createSpaceFactory([
  'paddingRight',
  'paddingLeft',
]);

export const createPaddingY = createSpaceFactory([
  'paddingTop',
  'paddingBottom',
]);

export const createPaddingTop = createSpaceFactory(['paddingTop']);

export const createPaddingRight = createSpaceFactory(['paddingRight']);

export const createPaddingBottom = createSpaceFactory(['paddingBottom']);

export const createPaddingLeft = createSpaceFactory(['paddingLeft']);
