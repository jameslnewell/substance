import {
  MediaConstraint,
  MapFunction,
  StyleProperty,
  createMixin,
} from '@substance/style';
import {SpaceConstraint} from './types';
import {GetSpaceFunction, ThemedGetSpaceFunction} from './createGetSpace';

const createSpaceFactory = (properties: StyleProperty[]) => {
  return <Media extends MediaConstraint, Space extends SpaceConstraint>({
    map,
    getSpace,
  }: {
    map: MapFunction<Media>;
    getSpace: GetSpaceFunction<Space> | ThemedGetSpaceFunction<Space>;
  }) => {
    return createMixin<Media, Space>({
      map: map,
      properties,
      transform: getSpace,
    });
  };
};

export const createMargin = createSpaceFactory([
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
]);

export const createMarginX = createSpaceFactory([
  'margin-right',
  'margin-left',
]);

export const createMarginY = createSpaceFactory([
  'margin-top',
  'margin-bottom',
]);

export const createMarginTop = createSpaceFactory(['margin-top']);

export const createMarginRight = createSpaceFactory(['margin-right']);

export const createMarginBottom = createSpaceFactory(['margin-bottom']);

export const createMarginLeft = createSpaceFactory(['margin-left']);

export const createPadding = createSpaceFactory([
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
]);

export const createPaddingX = createSpaceFactory([
  'padding-right',
  'padding-left',
]);

export const createPaddingY = createSpaceFactory([
  'padding-top',
  'padding-bottom',
]);

export const createPaddingTop = createSpaceFactory(['padding-top']);

export const createPaddingRight = createSpaceFactory(['padding-right']);

export const createPaddingBottom = createSpaceFactory(['padding-bottom']);

export const createPaddingLeft = createSpaceFactory(['padding-left']);
