import {StyleValue, get, Theme, ThemeProps} from '@substance/style';
import {Spaces, SpaceConstraint} from './types';

type SpaceStyleValue = StyleValue<'padding-top'>;

export interface GetSpacesFunction<Space extends SpaceConstraint> {
  (theme: Theme | undefined): Spaces<Space>;
}

export interface GetSpaceFunction<Space extends SpaceConstraint> {
  (space: Space): SpaceStyleValue;
}

export interface ThemedGetSpaceFunction<Space extends SpaceConstraint> {
  (space: Space): (props: ThemeProps) => SpaceStyleValue;
}

export function createGetSpace<Space extends SpaceConstraint>(
  spaces: Spaces<Space>,
): GetSpaceFunction<Space>;
export function createGetSpace<Space extends SpaceConstraint>(
  getSpaces: GetSpacesFunction<Space>,
): ThemedGetSpaceFunction<Space>;
export function createGetSpace<Space extends SpaceConstraint>(
  spacesOrGetSpaces: Spaces<Space> | GetSpacesFunction<Space>,
): GetSpaceFunction<Space> | ThemedGetSpaceFunction<Space> {
  // TODO: warn about unknown spaces
  // TODO: support negative spacings
  if (typeof spacesOrGetSpaces === 'function') {
    return (value) => ({theme}) =>
      get(String(value), spacesOrGetSpaces(theme)) || value;
  } else {
    return (value): SpaceStyleValue =>
      get(String(value), spacesOrGetSpaces) || value;
  }
}
