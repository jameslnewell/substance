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

export interface GetSpaceFunction<
  Space extends SpaceConstraint,
  Theme extends ThemeConstraint = DefaultTheme,
  Props extends PropsConstraint = DefaultProps
> {
  (space: Space):
    | StyleValue<'paddingTop'>
    | ((props: PropsWithTheme<Props, Theme>) => StyleValue<'paddingTop'>);
}

// TODO: support negative spacings
export const createGetSpace = <
  Space extends SpaceConstraint,
  Theme extends ThemeConstraint = DefaultTheme,
  Props extends PropsConstraint = DefaultProps
>(
  spacesOrGetSpaces: Spaces<Space> | GetSpacesFunction<Space, Theme>,
): GetSpaceFunction<Space, Theme, Props> => {
  // TODO: warn about unknown spaces
  if (typeof spacesOrGetSpaces === 'function') {
    return (value) => ({theme}) =>
      get(String(value), spacesOrGetSpaces(theme)) || value;
  } else {
    return (value) => get(String(value), spacesOrGetSpaces) || value;
  }
};
