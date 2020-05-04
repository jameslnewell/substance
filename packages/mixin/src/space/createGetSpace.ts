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
  Theme extends ThemeConstraint = DefaultTheme
> {
  <Props extends PropsConstraint = DefaultProps>(
    space: Space,
    props: PropsWithTheme<Props, Theme>,
  ): StyleValue<'paddingTop'>;
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
    ): StyleValue<'paddingTop'> => get(String(value), spacesOrGetSpaces(theme));
  } else {
    return (value: Space): StyleValue<'paddingTop'> =>
      get(String(value), spacesOrGetSpaces);
  }
};
