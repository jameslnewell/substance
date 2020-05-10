import {
  ThemeConstraint,
  DefaultTheme,
  PropsConstraint,
  DefaultProps,
  PropsWithTheme,
  StyleValue,
  get,
} from '@substance/style';
import {Spaces, SpaceConstraint} from './types';

export interface GetSpacesFunction<
  Space extends SpaceConstraint,
  Theme extends ThemeConstraint = DefaultTheme
> {
  (theme: Theme | undefined): Spaces<Space>;
}

export interface GetSpaceFunction<Space extends SpaceConstraint> {
  (space: Space): StyleValue<'paddingTop'>;
}

export interface ThemedGetSpaceFunction<
  Space extends SpaceConstraint,
  Theme extends ThemeConstraint = DefaultTheme,
  Props extends PropsConstraint = DefaultProps
> {
  (space: Space): (
    props: PropsWithTheme<Props, Theme>,
  ) => StyleValue<'paddingTop'>;
}

export function createGetSpace<Space extends SpaceConstraint>(
  spaces: Spaces<Space>,
): GetSpaceFunction<Space>;
export function createGetSpace<
  Space extends SpaceConstraint,
  Theme extends ThemeConstraint = DefaultTheme,
  Props extends PropsConstraint = DefaultProps
>(
  getSpaces: GetSpacesFunction<Space, Theme>,
): ThemedGetSpaceFunction<Space, Theme, Props>;
export function createGetSpace<
  Space extends SpaceConstraint,
  Theme extends ThemeConstraint = DefaultTheme,
  Props extends PropsConstraint = DefaultProps
>(
  spacesOrGetSpaces: Spaces<Space> | GetSpacesFunction<Space, Theme>,
): GetSpaceFunction<Space> | ThemedGetSpaceFunction<Space, Theme, Props> {
  // TODO: warn about unknown spaces
  // TODO: support negative spacings
  if (typeof spacesOrGetSpaces === 'function') {
    return (value) => ({theme}): StyleValue<'paddingTop'> =>
      get(String(value), spacesOrGetSpaces(theme)) || value;
  } else {
    return (value): StyleValue<'paddingTop'> =>
      get(String(value), spacesOrGetSpaces) || value;
  }
}
